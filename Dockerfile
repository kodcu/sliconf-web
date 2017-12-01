FROM node:8.9-alpine

RUN npm install

RUN npm install -g serve

RUN npm build

EXPOSE 5000

CMD ["serve","./build"]
