# API Developer code test

## Prerequisites
This exercise requires you to have installed:
- [docker and docker-compose](https://www.docker.com/products/developer-tools)
- (Optional) A MongoDB client
  - [Robo3T](https://robomongo.org/download)
  - [Node.js mongodb driver](https://mongodb.github.io/node-mongodb-native/)
  - ...

## Assignment
Consider a MongoDB installation with a single collection, `sports-event`, with data provided by the data in the [`data`](data) directory. This data will look like (this is [json-schema](https://json-schema.org)):
```json
{
  "$schema": "http://json-schema.org/schema#",
  "type": "object",
  "properties": {
    "_id": { "type": "string" },
    "id": { "type": "string" },
    "sportId": { "type": "string" },
    "name": { "type": "string" },
    "eventType": { "type": "string" },
    "scheduleStatus": { "type": "string" },
    "resultStatus": { "type": "string" },
    "parentSportsEventIds": {
      "type": "array",
      "items": {"type": "string" }
    },
    "siblingOrder": { "type": "integer" },
    "directParentSportsEventId": { "type": "string" }
  },
  "required": [
    "_id",
    "id",
    "sportId",
    "name",
    "eventType",
    "scheduleStatus",
    "resultStatus",
    "parentSportsEventIds",
    "siblingOrder",
    "directParentSportsEventId"
  ]
}
```

We call a SportsEvent, `X`, a "child" of another event, `Y`, if it has the id for SportsEvent `Y` as `directParentSportsEventId`.

Please create a Node.js application that integrates with the Database described above and provides an HTTP endpoint which we can query with a single SportsEvent's ID and will return a hierarchy of SportsEvents containing all children of the Event, and those Events children, and onwards. That is, provided a query
```
GET /sportsevents/GN1234
```
it should yield a tree-like response detailing the parent-child hierarchy for all events "below" `GN1234`, its children, etc:
```json
{
  "id": "GN123",
  "name": "Some Event",
  "children": [
    {
      "id": "GN456",
      "name": "Some other Event",
      "children": [ ... ],
      ...
    },
    ...
  ],
  ...
}
```
(variations are allowed)

Additionally, consider extending the endpoint even further to add other filtering options (e.g. on scheduleStatus).

## Local stack
A local stack with some infrastructure for this code test can be started by running
```bash
docker-compose up --build
```
from inside this directory. This will:
- Boot up a local MongoDB (available on port 27017)
- Load the data into the MongoDB
- Boot up a local application connecting to the MongoDB

You can then connect to your MongoDB with username `user` and password `pass`, e.g. using the connection string 
```
mongodb://user:pass@mongodb:27017/gns-api?authMechanism=SCRAM-SHA-1&authSource=admin
```
as well as connect to the database from your local application (sources also provided in this repository).
