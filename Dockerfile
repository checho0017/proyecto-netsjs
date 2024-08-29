FROM node:18.16.0 as final
WORKDIR /app
COPY . .
EXPOSE 80
RUN npm install --only=production --legacy-peer-deps
CMD ["node","dist/main"]