import React from "react";
import "./views-sub-components-css-files/communication-entity-action-bar-styles.css";
import USER_ACTION_EVENTS from "../../../../events/user-action-events";
export default function CommunicationEntityActionBar(props){
    const affirmativeActionClassName = props.isGroup ? "joinGroupButton":"addUserButton"

    const handleAffirmativeButtonClicked = () => {
        console.log(`${props.thisUser.name} is trying to add ${props.commEntity._id}`);
        props.thisUserSocket.emit(USER_ACTION_EVENTS.ADD_FRIEND, {
            addingUserID: props.thisUser.id,
            userToAddID: props.commEntity._id
        });
    }

    const handleSendMessageButtonClicked = () => {
        console.log(`${props.thisUser.name} is trying to send a message to ${props.commEntity._id}`);
    }

    const handleBlockButtonClicked = () => {
        console.log(`${props.thisUser.name} is trying to block ${props.commEntity._id}`);
    }

    return(
        <div className="actionBar">
            <button className={"actionButton " + affirmativeActionClassName} onClick={handleAffirmativeButtonClicked} />
            {!props.isGroup && <button className="actionButton sendMessageButton" onClick={handleSendMessageButtonClicked} />}
            <button className="actionButton blockButton" onClick={handleBlockButtonClicked} />
        </div>
    )
}