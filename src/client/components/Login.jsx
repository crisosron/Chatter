import React, { Component } from "react";
import "../css-files/login-register-styles.css";
import "../css-files/button-styles.css";
import socket from "../../index";
import LOGIN_EVENTS from "../../events/login-events";
import NotificationHandler from "../notification-handler";
import {Redirect} from "react-router-dom";
import axios from "axios";

import Logo from "../../res/images/logo-vertical-large.png"
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirectToChat: false,
        }
    }

    handleLoginClicked = e => {
        e.preventDefault();
        console.log("Login clicked");

        // Obtaining user provided credentials
        let userName = document.getElementById("userNameInputField").value;
        let password = document.getElementById("passwordInputFieldLogin").value;
        const loggingInUser = {
            userName: userName,
            password: password,
            clientSocketID: socket.id
        }

        // Sending a POST request to process the login with the user-provided credentials
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`, loggingInUser)
            .then(res => {

                // Showing notification that login attempt failed
                if(res.data.loginFailed){
                    NotificationHandler.createNotification("danger", "Login Denied", "Please check your login credentials");
                    return;
                }

                // If login succeeds, store thisUser into sessionStorage and redirect to home page of application
                sessionStorage.setItem("thisUser", JSON.stringify(res.data.thisUser));               
                sessionStorage.setItem("selectedNavOptionIndex", "0");
                
                // Handling of response by server with thisUser info and redirecting the client to the main application
                this.setState({
                    redirectToChat: true,
                });
            });
    }

    handleKeyPressed = e => {
        // Checks if enter key was pressed - If so, invoke click on login button
        if(e.keyCode === 13){
            document.getElementById("loginButton").click();
        }
    }

    componentWillUnmount(){
        // Removes some events from the sockets to make sure that the events are being received the correct number of times
        document.removeEventListener("keydown", this.handleKeyPressed);
    }

    render(){
        if(this.state.redirectToChat){
            return (
                <Redirect push to={{
                    pathname: "/home",
                }} />
            );
        }
        return(
            <div className="wrapper">
                <div className="centerWrapper direct-centered">
                    <div className="contentDiv" id="detailsInputDiv">
                        <h1>Login</h1>
                        <form class="inputForm" onSubmit={this.handleLoginClicked}>
                            <input className="contentDivInputField" id="userNameInputField" placeholder="Username" type="text" />
                            <input className="contentDivInputField" id="passwordInputFieldLogin" placeholder="Password" type="password"/>
                            <p className="loginRegisterUtilityLink" id="forgotPasswordLink"><a href="index.html">Forgot your username/password?</a></p> {/* TODO: Link to an actual 'forgot your password page' */}
                            <input type="submit" value="Login" id="loginButton" className="submitButton"/>
                            <div id="accountStatusLink">
                                <p className="loginRegisterUtilityLink"><a href="/register">Don't have an account?</a></p>
                            </div>
                        </form>
                    </div>
                    <div className="contentDiv" id="titleDiv">
                        <img id="logoImage" src={Logo} alt="Chatter Logo" />
                    </div>
                </div>
            </div>
        );

    }
}