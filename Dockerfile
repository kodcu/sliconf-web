FROM node:6.11.2-alpine

WORKDIR /

COPY . /.

RUN yarn install

RUN yarn global add serve

RUN yarn build

EXPOSE 5000

CMD ["serve","./build"]
