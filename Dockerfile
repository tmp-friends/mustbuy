FROM node:lts-buster-slim

WORKDIR /app

COPY ./src/package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
