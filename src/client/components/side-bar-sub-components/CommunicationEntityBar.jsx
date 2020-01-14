import React, {useState} from "react";
import "./side-bar-sub-components-css-files/communication-entity-bar-styles.css"
export default function CommunicationEntityBar(props){
    return(
        <div id={props.id} className="communicationEntityDiv">
            {/* TODO: Convert to use flexbox for beter resolution scaling? */}
            <div className="displayImageDiv verticallyCenteredRelativeToParent"></div>
            <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
            <h2>{props.children}</h2>
            </div>
        </div>
    );
}