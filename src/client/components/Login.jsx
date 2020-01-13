import React, { Component } from "react";
import "../css-files/login-register-styles.css";
import "../css-files/button-styles.css";
import socket from "../../index";
import {store} from "react-notifications-component"
import "react-notifications-component/dist/theme.css";
import LOGIN_EVENTS from "../../events/login-events";
import {Redirect} from "react-router-dom";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.initServerListening();
        this.state = {
            redirectToChat: false
        }
    }

    initServerListening(){
        socket.on(LOGIN_EVENTS.LOGIN_DENIED, data => {
            store.addNotification(data.notification);
        })

        socket.on(LOGIN_EVENTS.LOGIN_SUCCESFUL, data => {
            // TODO: Make input fields readonly
            store.addNotification({
                ...data.notification,
                onRemoval: (id, removedBy) => {
                    this.setState({redirectToChat: true});
                }
            });
        })
    }

    handleLoginClicked = () => {
        let userName = document.getElementById("userNameInputField").value;
        let password = document.getElementById("passwordInputField").value;
        socket.emit(LOGIN_EVENTS.REQUEST_LOGIN, {
            userName: userName,
            password: password,
        });
    }

    render(){
        if(this.state.redirectToChat){
            return (
                <Redirect push to={{
                    pathname: "/chat",
                    state: {
                        //TODO: Insert initial state data in here
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
                    <input type="password" placeholder="Password" id="passwordInputField"></input>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <button class="generalButton" onClick={this.handleLoginClicked}>Login</button>
                </div>

                {/* Title Div */}
                <div id="titleDiv">
                    <h1>Chatter</h1>
                </div>

            </div>
        </div>);
    }
}