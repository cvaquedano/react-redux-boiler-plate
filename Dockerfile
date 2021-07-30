FROM node:12-alpine3.14 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG REACT_APP_API
ENV REACT_APP_API=${REACT_APP_API}
RUN npm run build

FROM nginx:1.21.1-alpine as prod-stage
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
