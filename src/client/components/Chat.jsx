import React, { Component } from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar"
import DefaultDisplayView from "./displayable-views/DefaultDisplayView";
import CommunicationEntityDisplayView from "./displayable-views/CommunicationEntityDisplayView";
import ProfileDisplayView from "./displayable-views/ProfileDisplayView";
import CreateGroupDisplayView from "./displayable-views/CreateGroupDisplayView";

export default class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    changeDisplayedView = (newDisplayedView) => {
        this.setState({displayedView: newDisplayedView});
    }

    render(){
        let displayedViewComponent;
        switch(this.state.displayedView){
            default: displayedViewComponent = <DefaultDisplayView />; break;
            case "communicationEntity": displayedViewComponent = <CommunicationEntityDisplayView thisUser={this.props.location.state.thisUser} />; break;
            case "profile": displayedViewComponent = displayedViewComponent = <ProfileDisplayView thisUser={this.props.location.state.thisUser} />; break;
            case "createGroup": displayedViewComponent = <CreateGroupDisplayView thisUser={this.props.location.state.thisUser} />; break;
        }

        return(
            <div id="mainWrapper">
                <SideBar thisUser={this.props.location.state.thisUser} changeDisplayedView={this.changeDisplayedView}/>
                <div id="mainView">
                    {displayedViewComponent}
                </div>
            </div>
        );
    }
}