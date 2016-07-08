FROM node
RUN mkdir /app
WORKDIR /app
COPY /config /app/config
COPY /src /app/src
COPY /typings /app/typings
COPY package.json /app
COPY /tsconfig.json /app
COPY /tslint.json /app
COPY /typedoc.json /app
COPY /webpack.config.js /app
RUN npm install
COPY /servers/static /app/server
RUN npm run build:prod
CMD ["npm", "run", "image"]