FROM registry.access.redhat.com/ubi9/nodejs-18-minimal:latest
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]