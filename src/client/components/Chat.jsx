import React, { Component } from "react";
import "../css-files/chat-divs.css"
export default class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
        <div id="mainWrapper">
            <div id="sideBar">
            </div>
            <div id="chatPane">
            </div>
        </div>
        );
    }
}