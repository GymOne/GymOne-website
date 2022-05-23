FROM node:16-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
CMD [ "node","dist/main" ]
