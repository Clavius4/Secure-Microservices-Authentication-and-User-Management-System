# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the source files
COPY tsconfig.json ./
COPY src ./src
COPY models ./models
COPY scripts ./scripts

# Build the TypeScript application
RUN yarn build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy production dependencies
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY package.json ./

# Install Redis client library
RUN npm install redis

# Set environment variables
ENV NODE_ENV=production
ENV REDIS_HOST=redis

# Expose the port
EXPOSE 3000

# Command to run the app
CMD ["node", "build/app.js"]
