import React, {useState, useEffect} from "react"
import "../css-files/view-styles.css";
import "../css-files/chat-pane-styles.css";
export default function ChatPane(props){

    useEffect(() => {
        const messageInputField = document.getElementById("messageInput");
        messageInputField.addEventListener('keydown', (e) => {
            if(e.keyCode === 13 && messageInputField.value !== ""){
                // TODO: Send message
            }
        });
        
        // TODO: Fetch past messages between thisUser and props.selectedCommEntity
    }, []);

    return(
        <div className="chatPane">
            <div id="topBar"></div>
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