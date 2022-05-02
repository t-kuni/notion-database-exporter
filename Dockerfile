FROM node:16.15-alpine3.14
COPY ./dist /app
WORKDIR /app