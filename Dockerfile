FROM node:18 AS build
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/package*.json /usr/src/app/

EXPOSE 3000
CMD ["node", "dist/app.js"]
