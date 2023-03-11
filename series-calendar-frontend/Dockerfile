FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

#########################################

FROM nginx:stable as nginx

WORKDIR /app

COPY --from=build /app/dist /app/frontend