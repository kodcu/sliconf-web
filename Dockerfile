FROM node:6.11.2-alpine

RUN npm install

RUN npm install -g serve

RUN npm build

EXPOSE 5000

CMD ["serve","./build"]
