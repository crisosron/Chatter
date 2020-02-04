import React, {useState, useEffect} from "react"
import "./views-sub-components-css-files/chat-pane-styles.css";
export default function ChatPane(props){

    useEffect(() => {
        // TODO: Fetch past messages between thisUser and props.selectedCommEntity
    }, []);

    return(
        <div id="chatPaneWrapper">
            <div id="chatBar"></div>
            <div id="chatView">
                <div id="messagesDiv">

                </div>
                <div id="messageInputDiv">
                    <input type="text" id="messageInput" placeholder="Type your message here..." />
                    <button id="sendMessageButton">Send</button>
                </div>
            </div>
        </div>
    )
}