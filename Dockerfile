FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-backend

RUN npm run build

EXPOSE 8080

CMD ["npm","run", "start-backend"]