FROM node:14

WORKDIR /home/cnz-api

COPY package*.json ./

COPY . .