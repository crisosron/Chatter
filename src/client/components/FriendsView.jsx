import React, {useState, useEffect} from "react";
import "../css-files/view-styles.css"
import SideBar from "./SideBar";
import CommunicationEntityBar from "./CommunicationEntityBar";
import socket from "../../index";
import ChatPane from "./ChatPane"

// Enums
import RENDER_EVENTS from "../../constants/events/render-events";

export default function FriendsView(props){
    const thisUser = JSON.parse(sessionStorage.getItem("thisUser"));
    const [commEntities, setCommEntities] = useState([]);

    useEffect(() => {
        
        // Obtaining existing friends from server
        socket.emit(RENDER_EVENTS.GET_FRIENDS);
        socket.on(RENDER_EVENTS.DELIVER_FRIENDS, friendCommEntities => {
            console.log("Received event DELIVER_FRIENDS");
            setCommEntities(friendCommEntities);
        });

        return function cleanup(){
            socket.removeEventListener(RENDER_EVENTS.DELIVER_FRIENDS);
        };

    });
    
    return(
        <div id="mainWrapper">

            {/* Sidebar is not contained within contentWrapper for grouping purposes. It is not expected to change across the different pages */}
            <SideBar />

            <div id="contentWrapper">
                {/* TODO: Determine appropriate props to pass to CommunicationEntityBar and ChatPane components */}
                <CommunicationEntityBar commEntities={commEntities}/>
                <ChatPane />
            </div>
        </div>
    );
}