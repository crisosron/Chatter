import React, { Component } from "react";
import "../css-files/login-register-styles.css";
import "../css-files/button-styles.css";
import socket from "../../index";
import LOGIN_EVENTS from "../../events/login-events";
import NotificationHandler from "../notification-handler";
import {Redirect} from "react-router-dom";
import axios from "axios";
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
        let password = document.getElementById("passwordInputField").value;
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
        <div>
            <div id="centerWrapper">

                {/* Detail Input Div */}
                <div id="detailInputDiv">
                    <form onSubmit={this.handleLoginClicked}>
                        <h1>Login</h1>
                        <input type="text" placeholder="Username" id="userNameInputField"></input>
                        <input type="password" placeholder="Password" id="passwordInputField"></input>
                        <input type="submit" value="Login" id="loginButton"/>
                        <p><a href="/">Forgot Password</a></p>

                        <div id="accountStatusText">
                            <p>Don't have an account? <a href="/register">Register</a></p>
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