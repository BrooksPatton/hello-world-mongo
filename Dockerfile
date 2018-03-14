FROM node:latest
RUN useradd -mU web
USER web
WORKDIR /home/web
RUN git clone https://github.com/BrooksPatton/hello_world_node.git
WORKDIR /home/web/hello_world_node
RUN npm install
EXPOSE 3000
ENV DATABASE_URL=db
CMD ["npm", "start"]

