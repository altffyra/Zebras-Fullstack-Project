FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run build-backend

EXPOSE 8080

CMD ["npm","run", "start-backend"]