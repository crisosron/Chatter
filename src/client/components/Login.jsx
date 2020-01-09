import React, { Component } from "react";
import "../css-files/login-register-styles.css";
import "../css-files/button-styles.css";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
        <div>
            <div id="centerWrapper">

                {/* Detail Input Div */}
                <div id="detailInputDiv">
                    <h1>Login</h1>
                    <input type="text" placeholder="Username"></input>
                    <input type="password" placeholder="Password"></input>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <button class="generalButton">Login</button>
                </div>

                {/* Title Div */}
                <div id="titleDiv">
                    <h1>Chatter</h1>
                </div>

            </div>
        </div>);
    }
}