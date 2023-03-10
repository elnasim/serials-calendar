FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]