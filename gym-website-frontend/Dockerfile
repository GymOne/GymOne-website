FROM node:16-alpine as node
WORKDIR /app
COPY . .

FROM nginx:alpine
COPY --from=node /app/dist/gym-website-frontend /usr/share/nginx/html
COPY expose-env.sh /docker-entrypoint.d/40-expose-env.sh
RUN chmod 777 /docker-entrypoint.d/40-expose-env.sh