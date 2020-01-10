This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Chatter
This is a desktop chat application built using the [Electron](https://electronjs.org/) framework which serves as a wrapper for the application. [React](https://electronjs.org/) is used for building the front end, while [Socket.IO](https://socket.io/) is used to achieve realtime communication between clients and the server, while also enabling the event-based nature of the application. [MongoDB](https://www.mongodb.com/) is also used as the database platform to manage some of the information related to the application, such as registered users and groups.

# Development Notes
## Setting up Electron with React
To make Electron and React work in tandem, follow these steps:
 1. Create the project using [create-react-app](https://github.com/facebook/create-react-app).
 2. cd into the project and install electron via the command **npm install --save-dev electron**
 3. In the **src** directory, **create a file: main.js**. This file will contain Electron boilerplate code from [electron-quick-start](https://github.com/electron/electron-quick-start)
 4. Copy and paste the code from **main.js** in the [electron-quick-start](https://github.com/electron/electron-quick-start) github repository into your own main.js file
 5. Inside your main.js file, **replace line 20 with the following:** `mainWindow.loadURL('http://localhost:3000');` - This will load the react component of the application to the electron `BrowserWindow`

Performing these steps should enable proper interaction between Electron and React for development.
## React Router
React router is used to enable the application to be a multi-page application within the same window. To install: **npm install react-router-dom**

## Running the application in a development context
To run the application, run the following commands in **exact order**
 1. `npm run server` - This will start the server, as well as the connection to the MongoDB database
 2. (In a new CLI tab) `npm start` - This will run the start script generated via create-react-app
 3. (In a new CLI Tab) `npm run electron` - This will run the electron component of the application


