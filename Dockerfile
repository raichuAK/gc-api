FROM node:12

COPY package.json /package.json
COPY package-lock.json /package-lock.json

RUN npm install

COPY app /app

CMD node /app/index.js
