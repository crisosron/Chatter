import React, {useState, useEffect} from "react";
import "../css-files/view-styles.css"
import SideBar from "./SideBar";
import CommunicationEntityBar from "./CommunicationEntityBar";
import ChatPane from "./ChatPane"
import socket from "../../index";

// Enums
import RENDER_EVENTS from "../../constants/events/render-events";

// TODO: Explore react component inheritance - This is essentially the same as FriendsView - There is some potential to improve code reuse here
export default function FriendsView(props){
    
    const [commEntities, setCommEntities] = useState([]);

    useEffect(() => {
        
        // Obtaining groups thisUser is associated with
        socket.emit(RENDER_EVENTS.GET_GROUPS);
        socket.on(RENDER_EVENTS.DELIVER_GROUPS, groupCommEntities => {
            console.log("Received event DELIVER_GROUPS");
            setCommEntities(groupCommEntities);
        });

        return function cleanup(){
            socket.removeEventListener(RENDER_EVENTS.DELIVER_GROUPS);
        };

    });

    return(
        <div id="mainWrapper">

            {/* Sidebar is not contained within contentWrapper for grouping purposes. It is not expected to change across the different pages */}
            <SideBar />

            <div id="contentWrapper">
                {/* TODO: Determine appropriate props to pass to CommunicationEntityBar and ChatPane components */}
                <CommunicationEntityBar/>
                <ChatPane />
            </div>
        </div>
    );
}