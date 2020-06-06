FROM mhart/alpine-node:8.11.4

RUN mkdir -p /tsseract


WORKDIR /tsseract

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 5000

CMD ["npm", "start"]
