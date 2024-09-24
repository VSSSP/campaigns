# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/index

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install nodemon and ts-node globally to use them for development
RUN npm install -g nodemon ts-node

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the app with nodemon
CMD ["nodemon", "--watch", ".", "--exec", "ts-node", "src/index.ts"]
