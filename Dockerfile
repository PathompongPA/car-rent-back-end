
FROM node:alpine

WORKDIR /usr/app/src

COPY ./src /usr/app/src

RUN npm install

CMD [ "npm","run","production" ]

EXPOSE 9000
