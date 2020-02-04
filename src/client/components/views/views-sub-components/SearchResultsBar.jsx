import React, {useState, useEffect} from "react";
import "./views-sub-components-css-files/search-results-bar-styles.css";
import CommunicationEntity from "./CommunicationEntity";
import COMM_ENTITY_ACTIONS from "../../../side-bar-sub-components/comm-entity-actions";
import socket from "../../../../../index";
import USER_ACTION_EVENTS from "../../../../../events/user-action-events";
import NotificationHandler from "../../../../notification-handler";
export default function SearchResultsBar(props){
    const [selectedUserCommEntityIndex, setSelectedUserCommEntityIndex] = useState(-1);
    const [selectedGroupCommEntityIndex, setSelectedGroupCommEntityIndex] = useState(-1);
    const [userCommEntityShowActionsIndex, setUserCommEntityShowActionsIndex] = useState(-1);
    const [groupCommEntityShowActionsIndex, setGroupCommEntityShowActionsIndex] = useState(-1);

    const userCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.ADD, className: "affirmative"},
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    const groupCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.JOIN, className: "affirmative"}, 
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    const deselectAll = () => {
        setSelectedUserCommEntityIndex(-1);
        setSelectedGroupCommEntityIndex(-1);
    }

    const deselectAllContext = () => {
        setGroupCommEntityShowActionsIndex(-1);
        setUserCommEntityShowActionsIndex(-1);
    }

    const handleUserCommEntitySelected = (index) => {
        setSelectedUserCommEntityIndex(index);
        setSelectedGroupCommEntityIndex(-1); // A -1 means deselection
        deselectAllContext();
        props.changeDisplayedView("communicationEntity");
    }

    const handleGroupCommEntitySelected = index => {
        setSelectedGroupCommEntityIndex(index);
        setSelectedUserCommEntityIndex(-1);
        props.changeDisplayedView("communicationEntity");
        deselectAllContext();
    }
    
    const handleUserOnContextMenu = (e, index) => {
        e.preventDefault();
        setUserCommEntityShowActionsIndex(index);
        setGroupCommEntityShowActionsIndex(-1);
        deselectAll();
    }

    const handleGroupOnContextMenu = (e, index) => {
        e.preventDefault();
        setGroupCommEntityShowActionsIndex(index);
        setUserCommEntityShowActionsIndex(-1);
        deselectAll();
    }

    const handleActionPressed = (action, commEntityID) => {
        console.log("Action Pressed");
        switch(action){
            case COMM_ENTITY_ACTIONS.ADD:
                socket.emit(USER_ACTION_EVENTS.ADD_FRIEND, {
                    addingUserID: props.thisUser.id,
                    userToAddID: commEntityID
                });
                deselectAllContext();
                break;
            case COMM_ENTITY_ACTIONS.DISMISS:
                deselectAll();
                deselectAllContext();
                break;
            default: 
                // TODO: Throw error
                console.log("No action recognized");
        }
    }

    useEffect(() => {
        socket.on(USER_ACTION_EVENTS.ADD_FRIEND_SENT, () => {
            NotificationHandler.createNotification("success", "Friend Request Sent", "A friend request has been succesfully sent to the user");
        });
    
        socket.on(USER_ACTION_EVENTS.ADD_FRIEND_DENIED, data => {
            NotificationHandler.createNotification("danger", "Cannot Send Friend Request", data.reason);
        });
    }, []);

    return(
        <div id="searchResultsBar">
            <div id="friendResultsDiv">
                <div className="resultsTitleDiv">
                    <h3>Users</h3>
                </div>
                {props.userCommunicationEntities.map((userCommEntity, index) => {
                    return (
                    <CommunicationEntity
                    key={userCommEntity._id}
                    onClick={(selectedIndex) => {handleUserCommEntitySelected(selectedIndex)}}
                    onContextMenu={(e, index) => {handleUserOnContextMenu(e, index)}}
                    index={index}
                    className={selectedUserCommEntityIndex === index ? "searchResultCommEntity selectedCommunicationEntity" : "searchResultCommEntity"}
                    actions={userCommEntityActions}
                    showActionMenu={userCommEntityShowActionsIndex === index}
                    handleActionPressed={handleActionPressed}
                    commEntityID={userCommEntity._id}
                    >{userCommEntity._name}</CommunicationEntity>
                    );
                })}

            </div>
            <div id="groupResultsDiv">
                <div className="resultsTitleDiv">
                    <h3>Groups</h3>
                </div>

                {props.groupCommunicationEntities.map((groupCommEntity, index) => {
                    return (
                        <CommunicationEntity
                        key={groupCommEntity._id}
                        onClick={(selectedIndex) => {handleGroupCommEntitySelected(selectedIndex)}}
                        onContextMenu={(e, index) => {handleGroupOnContextMenu(e, index)}}
                        index={index}
                        className={selectedGroupCommEntityIndex === index ? "searchResultCommEntity selectedCommunicationEntity" : "searchResultCommEntity"}
                        actions={groupCommEntityActions}
                        showActionMenu={groupCommEntityShowActionsIndex === index}
                        handleActionPressed={handleActionPressed}
                        commEntityID={groupCommEntity._id}
                        >{groupCommEntity._name}</CommunicationEntity>
                    );
                })}

            </div>
        </div>
    );
}