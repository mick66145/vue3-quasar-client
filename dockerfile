# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.19.6 as runtime-stage
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
ARG TAG_VERSION=latest
ENV VITE_APP_VERSION=$TAG_VERSION

#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
