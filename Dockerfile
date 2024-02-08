FROM node
WORKDIR /app
COPY . .
RUN npm install @angular/cli
RUN ng build podtape_front

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
EXPOSE 80