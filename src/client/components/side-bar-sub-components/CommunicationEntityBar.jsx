import React, {useState} from "react"
import CommunicationEntity from "./CommunicationEntity"
import "./side-bar-sub-components-css-files/communication-entity-styles.css";
export default function CommunicationEntitiesBar(props){
    const COMM_ENTITY_ACTIONS = {
        ADD: "Add",
        REMOVE: "Remove",
        JOIN: "Join",
        LEAVE: "Leave",
        DISMISS: "Dismiss"
    }

    const [selectedCommEntityIndex, setSelectedCommEntityIndex] = useState(-1);
    const [commEntityShowActionsIndex, setCommEntityShowActionsIndex] = useState(-1);

    // TODO: Need a way of filtering out some of these actions! Eg - cannot remove a user who is not your friend! Can't leave a group we are not in!
    // TODO: Cannot add someone already added! Cannot join a group already joined (Introduce a search mode/boolean so we can easily differentiate between
    // known comm entities and unknown comm entities?)
    const friendModeCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.REMOVE, className: "negative"}, 
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    const groupModeCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.LEAVE, className: "negative"}, 
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    function handleCommEntitySelected(selectedIndex){
        setSelectedCommEntityIndex(selectedIndex);
        setCommEntityShowActionsIndex(-1);
    }

    function handleContextMenu(e, index){
        e.preventDefault();
        setSelectedCommEntityIndex(-1);
        setCommEntityShowActionsIndex(index);
    }

    function handleActionPressed(action, index){
        switch(action){
            case COMM_ENTITY_ACTIONS.DISMISS:
                setSelectedCommEntityIndex(-1);
                setCommEntityShowActionsIndex(-1);
                break;
            case COMM_ENTITY_ACTIONS.ADD:
                alert("HANDLE Add")
                break;
            case COMM_ENTITY_ACTIONS.REMOVE:
                alert("HANDLE Remove");
                break;
            case COMM_ENTITY_ACTIONS.JOIN:
                alert("HANDLE Remove");
                break;
            case COMM_ENTITY_ACTIONS.LEAVE:
                alert("HANDLE Leave");
                break;
            default:
                // TODO: Throw error
                console.log("No action recognized")
        }
    }

    return(
        <div id={props.id}>
            {props.communicationEntities.map((value, index) => {
                return (
                    <CommunicationEntity
                    key={"communicationEntity" + value._id}
                    onClick={(selectedIndex) => handleCommEntitySelected(selectedIndex)}
                    onContextMenu={(e, index) => {handleContextMenu(e,index)}}
                    index={index}
                    className={selectedCommEntityIndex === index ? "selectedCommunicationEntity" : ""}
                    actions={props.mode === "Friends" ? friendModeCommEntityActions : groupModeCommEntityActions}
                    showActionMenu={commEntityShowActionsIndex === index}
                    handleActionPressed={handleActionPressed}
                    >{value._name}</CommunicationEntity>
                );
            })}
        </div>
    );
}