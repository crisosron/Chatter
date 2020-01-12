import React, { Component } from "react";
import "../css-files/login-register-styles.css"
import socket from "../../index"
import {store} from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import REGISTER_EVENTS from "../../events/register-events"
export default class Register extends Component{
    constructor(props){
        super(props);
        this.initServerListening();
        this.state = {
            redirectToChat: false
        }
    }

    initServerListening(){
        socket.on(REGISTER_EVENTS.REGISTRATION_DENIED, data => {
            // TODO: Find a better more reusable way of generating notifications - Generate them in the server then send them here?
            store.addNotification({
                title: "Registration Denied",
                message: data.message,
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                },
            });
        });

        socket.on(REGISTER_EVENTS.REGISTRATION_SUCCESSFUL, () => {
            store.addNotification({
                title: "Succesfuly Registered",
                message: "Please wait to be redirected",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                },
                onRemoval: (id, removedBy) => {
                    this.setState({redirectToChat: true});
                }
            });
        })
    }

    handleRegisterClicked = () => {
        let userName = document.getElementById("userNameInputField").value;
        let password = document.getElementById("passwordInputField").value;
        let email = document.getElementById("emailInputField").value
        socket.emit(REGISTER_EVENTS.REQUEST_REGISTRATION, {
            userName: userName,
            password: password,
            email: email
        });
    }

    render(){
        return(
        <div>
            <div id="centerWrapper">

                {/* Detail Input Div */}
                <div id="detailInputDiv">
                    <h1>Register</h1>
                    <input type="text" placeholder="Username" id="userNameInputField"></input>
                    <input type="password" placeholder="Password" id="passwordInputField"></input>
                    <input type="text" placeholder="Email" id="emailInputField"></input>
                    <p>Already have an account? <a href="/">Login</a></p>
                    <button class="generalButton" onClick={this.handleRegisterClicked}>Register</button>
                </div>

                {/* Title Div */}
                <div id="titleDiv">
                    <h1>Chatter</h1>
                </div>

            </div>
        </div>);
    }
}