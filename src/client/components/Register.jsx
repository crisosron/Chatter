import React, { Component } from "react";
import "../css-files/login-register-styles.css"
import socket from "../../index"
export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    handleRegisterClicked = () => {
        let userName = document.getElementById("userNameInputField").value;
        let password = document.getElementById("passwordInputField").value;
        let email = document.getElementById("emailInputField").value
        socket.emit("register-user", {
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