# Use official Node.js image
 FROM node:18
 #Create and set the working directory inside the container
 WORKDIR /ap
 # Copy package.json and package-lock.json to install dependencies
 COPY package*.json ./
 # Install dependencies
 RUN npm install
 # Copy only the rest of the application code
 COPY . .
 # Expose the port your application will run on
 EXPOSE 3000

 CMD ["npm", "start"]