# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the TypeScript source files
COPY . .

# Compile TypeScript files
RUN npm run build

# Stage 2: Create the final image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy compiled files from the build stage
COPY --from=builder /app/build /app/build
COPY --from=builder /app/src /app/src
COPY --from=builder /app/node_modules /app/node_modules

# Copy other necessary files (like .env, if required)
COPY .env .env

# Install Redis client library
RUN npm install redis

# Expose the application port
EXPOSE 5001

# Set environment variables
ENV NODE_ENV=production
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=root
ENV DB_NAME=secure_microservices_db
ENV JWT_SECRET=your_jwt_secret_key
ENV JWT_EXPIRATION=3600
ENV REDIS_HOST=redis

# Run the app
CMD ["npm", "start"]
