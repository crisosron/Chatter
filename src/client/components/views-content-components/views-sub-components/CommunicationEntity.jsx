import React from "react";
import "./views-sub-components-css-files/communication-entity-styles.css";
import singleUserIconPath from "../../../../res/icons/ic_comm_entity_single_user_24px.svg";

export default function CommunicationEntity(props){

    return(
        <div id={props.id} className={"communicationEntityDiv " + props.className} onClick={() => {props.onClick(props.index);}}>
            <img className="displayImage verticallyCenteredRelativeToParent" src={singleUserIconPath} alt="single user icon" />
            <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
                <p id="userNameText">{props.children}</p>
                <p>TODO: Insert part of last message sent here</p>
            </div>
        </div>

    );
}