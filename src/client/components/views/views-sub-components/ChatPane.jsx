import React, {useState, useEffect} from "react"
import "./views-sub-components-css-files/chat-pane-styles.css";
export default function ChatPane(props){
    return(
        <div id="chatPaneWrapper">
            <div id="chatBar"></div>
            <div id="chatView"></div>
        </div>
    )
}