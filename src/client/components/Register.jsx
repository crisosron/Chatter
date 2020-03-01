import React, { Component } from "react";
import "../css-files/login-register-styles.css"
import socket from "../../index"
import {Redirect} from "react-router-dom";
import NotificationHandler from "../notification-handler";
import REGISTER_EVENTS from "../../events/register-events"
import axios from "axios";
export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirectToLogin: false
        }
    }

    handleRegisterPressed = e => {
        e.preventDefault();

        // Obtaining user-entered info from input fields
        let userName = document.getElementById("userNameInputField").value;
        let password = document.getElementById("passwordInputField").value;
        let email = document.getElementById("emailInputField").value

        // Checking that the password exceeds the minlen of 5 charactesr
        if(password.length < 5){
            NotificationHandler.createNotification("danger", "Registration Denied", "Your password must be at least 5 characters in length");
            return;
        }

        const newUser = {
            userName: userName,
            password: password,
            email: email,
            clientSocketID: socket.id
        }

        // Posting to register-user route to register the user
        axios.post(`http://localhost:${process.env.REACT_APP_EXPRESS_SERVER_PORT}/register`, newUser)
            .then(res => { // Handling response from server (res.send() in login-register-routes.js in /register route)
                this.setState({
                    redirectToLogin: true
                });
            });
    }

    handleKeyPress = e => {
        // Checks if enter was pressed, if so, invoke click on registerButton
        if(e.keyCode === 13){
            document.getElementById("registerButton").click();
        }
    }

    componentDidMount(){
        socket.on(REGISTER_EVENTS.REGISTRATION_DENIED, data => {
            NotificationHandler.createNotification("danger", "Registration Denied", data.reason);
        });

        // This notification should be shown when the user has already been redirected to the login page as a response from the POST request in handleRegisterPressed
        socket.on(REGISTER_EVENTS.REGISTRATION_SUCCESSFUL, data => {
            NotificationHandler.createNotification("success", "Registration Successful", "Please enter your login credentials");
        });

        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount(){
        socket.removeEventListener(REGISTER_EVENTS.REGISTRATION_DENIED);
        socket.removeEventListener(REGISTER_EVENTS.REGISTRATION_SUCCESSFUL);
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    render(){
        if(this.state.redirectToLogin){
            return (
                <Redirect push to={{
                    pathname: "/",
                }} />
            );
        }
        return(
        <div>
            <div id="centerWrapper">

                {/* Detail Input Div */}
                <div id="detailInputDiv">
                    <form onSubmit={this.handleRegisterPressed}>
                        <h1>Register</h1>
                        <input type="text" placeholder="Username" id="userNameInputField"></input>
                        <input type="password" placeholder="Password (minimum 5 characters)" id="passwordInputField"></input>
                        <input type="text" placeholder="Email" id="emailInputField"></input>
                        <input type="submit" id="registerButton" value="Register" className="generalButton"/>
                        <div id="accountStatusText">
                            <p>Already have an account? <a href="/">Login</a></p>
                        </div>
                    </form>
                </div>

                {/* Title Div */}
                <div id="titleDiv">
                    <h1>Chatter</h1>
                </div>

            </div>
        </div>);
    }
}