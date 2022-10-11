FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm build-backend

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start-backend"]
