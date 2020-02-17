import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chatter from './client/components/Chatter';
import * as serviceWorker from './serviceWorker';
import openSocket from "socket.io-client";
import 'dotenv/config'

// TODO: Determine why SERVER_PORT environment variable is undefined here
//console.log(process.env.SERVER_PORT);
//const socket = openSocket("http://localhost:" + process.env.SERVER_PORT);


// const socket = openSocket("http://localhost:8000");
// export default socket;

ReactDOM.render(<Chatter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
