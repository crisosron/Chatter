import React, { Component } from "react";

export default class LoginRegister extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin: true
        }
    }

    render(){
        return(
        <div>
            <h1>Login/Register Page</h1>
        </div>);
    }
}