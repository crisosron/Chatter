import React, { Component } from "react";
import "../css-files/login-register-styles.css"
export default class Register extends Component{
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
                    <h1>Register</h1>
                    <input type="text" placeholder="Username"></input>
                    <input type="password" placeholder="Password"></input>
                    <input type="text" placeholder="Email"></input>
                    <p>Already have an account? <a href="/">Login</a></p>
                    <button class="generalButton">Register</button>
                </div>

                {/* Title Div */}
                <div id="titleDiv">
                    <h1>Chatter</h1>
                </div>

            </div>
        </div>);
    }
}