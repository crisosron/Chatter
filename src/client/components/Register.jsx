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
        this.initServerListening();
        this.state = {
            redirectToLogin: false
        }
    }

    initServerListening(){
        socket.on(REGISTER_EVENTS.REGISTRATION_DENIED, data => {
            NotificationHandler.createNotification("danger", "Registration Denied", data.reason);
        });

        socket.on(REGISTER_EVENTS.REGISTRATION_SUCCESSFUL, data => {
            NotificationHandler.createNotification("success", "Registration Successful", "Please wait to be redirected to login", 3000, (id, removedBy) => {
                this.setState({redirectToLogin: true});                
            });
        })
    }

    handleRegisterClicked = e => {
        e.preventDefault();
        let userName = document.getElementById("userNameInputField").value;
        let password = document.getElementById("passwordInputField").value;
        let email = document.getElementById("emailInputField").value
        const newUser = {
            userName: userName,
            password: password,
            email: email,
            clientSocketID: socket.id
        }

        // Posting to register-user route
        axios.post("http://localhost:8000/register", newUser)
            .then(res => console.log(res.data));
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
                    <form onSubmit={this.handleRegisterClicked}>
                        <h1>Register</h1>
                        <input type="text" placeholder="Username" id="userNameInputField"></input>
                        <input type="password" placeholder="Password (minimum 5 characters)" id="passwordInputField"></input>
                        <input type="text" placeholder="Email" id="emailInputField"></input>
                        {/* <button className="generalButton" onClick={this.handleRegisterClicked}>Register</button> */}
                        <input type="submit" value="Register" className="generalButton"/>
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