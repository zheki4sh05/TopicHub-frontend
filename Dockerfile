FROM node:23-alpine3.20
WORKDIR /app
COPY . .
ENV PORT 5000
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
EXPOSE 5000
