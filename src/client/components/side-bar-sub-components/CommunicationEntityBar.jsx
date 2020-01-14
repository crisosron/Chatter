import React, {useState} from "react";
import "./side-bar-sub-components-css-files/communication-entity-bar-styles.css"
export default function CommunicationEntityBar(props){
    return(
        <div id={props.id} className="communicationEntityDiv">
            <div className="displayImageDiv verticallyCenteredRelativeToParent"></div>
            <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
                <h3>Test Title</h3>
                <h4>Test Subtitle</h4>
            </div>
        </div>
    );
}