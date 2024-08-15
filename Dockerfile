FROM node:20-alpine as build

WORKDIR /app

COPY . .

RUN npm install

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app .

CMD ["node", "server.js"]