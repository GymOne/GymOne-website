FROM node:16-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

EXPOSE 8080
CMD [ "node","dist/main" ]
