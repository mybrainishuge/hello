FROM node
RUN mkdir /api
WORKDIR /api
RUN npm install -g nodal 
COPY . /api
RUN npm install
EXPOSE 3333
CMD ["nodal","s"]