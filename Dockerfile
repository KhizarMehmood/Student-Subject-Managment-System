# Use the official Node.js image as the base image
FROM node:18-alpine as base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for the final stage
FROM node:18-alpine as final

# Set the working directory inside the container
WORKDIR /app

# Set environment variables (including MongoDB URI)
ENV MONGODB_URI=mongodb://localhost:27017/Subject-Managment

# Copy the build output and node_modules from the previous stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./

# Expose the port that the Next.js app runs on
EXPOSE 3000

# Command to start the Next.js application
CMD ["npm", "start"]