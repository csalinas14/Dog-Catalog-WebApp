FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

#used for db migrations later
RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["npm", "run", "dev"]