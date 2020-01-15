import React from "react";
import "./side-bar-sub-components-css-files/communication-entity-styles.css"
export default function CommunicationEntity(props){
    return(
        <div id={props.id} className={"communicationEntityDiv " + props.className} onClick={() => {props.onClick(props.index);}}>
            <div className="displayImageDiv verticallyCenteredRelativeToParent"></div>
            <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
}