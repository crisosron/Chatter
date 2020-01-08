This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Chatter
This is a desktop chat application built using the [Electron](https://electronjs.org/) framework which serves as a wrapper for the application. [React](https://electronjs.org/) is used for building the front end, while [Socket.IO](https://socket.io/) is used to achieve communication between clients and the server.

# Development Notes 
## Running the application in a development context
To run the application, run the following commands in **exact order**
 1. cd src/server
 2. node server - This will run the server
 3. (In a new CLI tab) npm start - This will run the start script generated via create-react-app
 4. (In a new CLI Tab) npm run electron - This will run the electron component of the application


