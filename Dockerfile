FROM node:6.11.2-alpine

WORKDIR /

COPY . /.

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 5000

CMD ["serve","./build"]
