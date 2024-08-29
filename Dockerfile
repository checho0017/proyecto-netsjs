# Stage 1: Build the application
FROM node:18-alpine AS builder
 
WORKDIR /src/app
 
COPY package*.json ./
RUN npm install
 
COPY . .
RUN npm run build
 
# Verificar la existencia del directorio /dist
RUN echo "Listado del directorio /src/app/dist:" && ls -la /src/app/dist
 
# Stage 2: Run the application
FROM node:18-alpine
 
WORKDIR /app
 
COPY --from=builder /src/app/dist ./dist
COPY --from=builder /src/app/package*.json ./
 
RUN echo "Listado del directorio /app:" && ls -la /app
 
RUN npm install --only=production
 
CMD ["node", "dist/main"]