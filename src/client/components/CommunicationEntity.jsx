import React from "react";
import "../css-files/communication-entity-styles.css"
import singleUserIconPath from "../../res/icons/ic_comm_entity_single_user_24px.svg";

// TODO: Do some processing of actual indicators at some point
import statusIndicatorIconPath from "../../res/images/indicators/status_online.svg"
import unreadMessageIndicatorPath from "../../res/images/indicators/unread_message_indicator.svg"

export default function CommunicationEntity(props){

    // Conditionally render the indicator (eg, don't render it if the user is viewing groups or if there isn't an unread message)
    let statusIndicator;
    let unreadMessageIndicator;

    // Determining if the status indicator needs to be rendered
    if(props.displayStatusIndicators) statusIndicator = <img className="statusIndicator" src={statusIndicatorIconPath} alt="status indicator" />;
    else statusIndicator = null;

    // Determining if the unread message indicator needs to be rendered
    // TODO: Get boolean 'hasUnreadMessage' from props. For now, its just a constant true
    // let hasUnreadMessage = true;
    unreadMessageIndicator = <img src={unreadMessageIndicatorPath} className="unreadMessageIndicator verticallyCenteredRelativeToParent" alt="unread message indicator" />;

    return(
        <div id={props.id} className={"communicationEntityDiv " + props.className} onClick={() => {props.onClick(props.index);}}>
            <div className="displayImageDiv verticallyCenteredRelativeToParent">
                <img className="displayImage" src={singleUserIconPath} alt="single user icon" />
                {statusIndicator}
            </div>
            <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
                <p id="userNameText">{props.children}</p>
                <p>TODO: Insert part of last message sent here</p>
            </div>

            {unreadMessageIndicator}

        </div>

    );
}