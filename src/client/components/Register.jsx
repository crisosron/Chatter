import React, { Component } from "react";
import "../css-files/login-register-styles.css"
import socket from "../../index"
import {Redirect} from "react-router-dom";
import NotificationHandler from "../notification-handler";
import axios from "axios";

import Logo from "../../res/images/logo-vertical-large.png"

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
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/register`, newUser)
            .then(res => { // Handling response from server (res.send() in login-register-routes.js in /register route)
                
                // Handling failed registration
                if(res.data.registrationFailed){
                    NotificationHandler.createNotification("danger", "Registration Denied", res.data.reason);
                    return;
                }

                // If registraation is succesful, show notification and redirect to login page
                NotificationHandler.createNotification("success", "Registration Successful", "Please enter your login credentials");
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
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount(){
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
            <div className="wrapper">
                <div className="centerWrapper direct-centered">

                    {/* Detail Input Div */}
                    <div className="contentDiv" id="detailsInputDiv">
                        <form class="inputForm" onSubmit={this.handleRegisterPressed}>
                            <h1>Register</h1>
                            <input type="text" className="contentDivInputField" placeholder="Username" id="userNameInputField"></input>
                            <input type="password" className="contentDivInputField" placeholder="Password (minimum 5 characters)" id="passwordInputField"></input>
                            <input type="text" className="contentDivInputField" placeholder="Email" id="emailInputField"></input>
                            <input type="submit" id="registerButton" value="Register" className="submitButton"/>
                            <div id="accountStatusLink">
                                <p className="loginRegisterUtilityLink"><a href="/">Already have an account?</a></p>
                            </div>
                        </form>
                    </div>

                    {/* Title Div */}
                    <div className="contentDiv" id="titleDiv">
                        <img id="logoImage" src={Logo} alt="Chatter Logo" />
                    </div>

                </div>
            </div>
        );
    }
}