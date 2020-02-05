import React, { Component } from "react";
import "../css-files/chat-divs.css"
import SideBar from "./SideBar"
import DefaultView from "./views/DefaultView";
import ProfileView from "./views/ProfileView";
import CreateGroupView from "./views/CreateGroupView";
import IndividualChatView from "./views/IndividualChatView";
import GroupChatView from "./views/GroupChatView";
import SearchView from "./views/SearchView";

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
            default: displayedViewComponent = <DefaultView />; break;
            case "profile": displayedViewComponent = displayedViewComponent = <ProfileView thisUser={this.props.location.state.thisUser} />; break;
            case "createGroup": displayedViewComponent = <CreateGroupView thisUser={this.props.location.state.thisUser} />; break;
            case "individualChat": displayedViewComponent = <IndividualChatView thisUser={this.props.location.state.thisUser} />; break;
            case "groupChat": displayedViewComponent = <GroupChatView thisUser={this.props.location.state.thisUser} />; break;
            case "search": displayedViewComponent = <SearchView thisUser={this.props.location.state.thisUser}/>; break;
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