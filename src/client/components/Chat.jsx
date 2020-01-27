import React, { Component } from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar"
export default class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
        <div id="mainWrapper">
            <SideBar thisUser={this.props.location.state.thisUser}/>
            <div id="chatPane">
            </div>
        </div>
        );
    }
}