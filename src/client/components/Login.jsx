import React, { Component } from "react";
import "../css-files/login-register-styles.css";
import "../css-files/button-styles.css";
import socket from "../../index";
import LOGIN_EVENTS from "../../events/login-events";
import NotificationHandler from "../notification-handler";
import {Redirect} from "react-router-dom";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirectToChat: false
        }
    }

    handleLoginClicked = () => {
        let userName = document.getElementById("userNameInputField").value;
        let password = document.getElementById("passwordInputField").value;
        socket.emit(LOGIN_EVENTS.REQUEST_LOGIN, {
            userName: userName,
            password: password,
        });
    }

    componentDidMount(){
        socket.on(LOGIN_EVENTS.LOGIN_DENIED, () => {
            NotificationHandler.createNotification("danger", "Login Denied", "Please check your login credentials");
        })

        socket.on(LOGIN_EVENTS.LOGIN_SUCCESFUL, data => {
            NotificationHandler.createNotification("success", "Login Successful", "Please wait to be redirected", 3000, (id, removedBy) => {
                this.setState({
                    redirectToChat: true,
                    thisUser: data.thisUser
                });
            });
            // TODO: Make input fields readonly
        })
    }

    componentWillUnmount(){
        // Removes some events from the sockets to make sure that the events are being received the correct number of times
        socket.removeEventListener(LOGIN_EVENTS.LOGIN_DENIED)
        socket.removeEventListener(LOGIN_EVENTS.LOGIN_SUCCESFUL)
    }

    render(){
        if(this.state.redirectToChat){
            return (
                <Redirect push to={{
                    pathname: "/chat",
                    state: {
                        thisUser: this.state.thisUser
                    }
                }} />
            );
        }
        return(
        <div>
            <div id="centerWrapper">

                {/* Detail Input Div */}
                <div id="detailInputDiv">
                    <h1>Login</h1>
                    <input type="text" placeholder="Username" id="userNameInputField"></input>
                    <input type="password" placeholder="Password (minimum 5 characters)" id="passwordInputField"></input>
                    <button class="generalButton" onClick={this.handleLoginClicked}>Login</button>
                    <p><a href="/">Forgot Password</a></p>

                    <div id="accountStatusText">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                    
                </div>

                {/* Title Div */}
                <div id="titleDiv">
                    <h1>Chatter</h1>
                </div>

            </div>
        </div>);
    }
}