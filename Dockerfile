# Use Node 20 base image (recommended for Nuxt 3)
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Nuxt 3 app (Server-side rendered with Nitro)
RUN npm run build

# Set environment variable to production
ENV NODE_ENV=production

# Expose the port used by Nitro
EXPOSE 3000

# Start the Nuxt app (Nitro handles the server)
CMD ["npm", "run", "start"]