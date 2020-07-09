import React, {useState} from "react"
import CommunicationEntity from "./CommunicationEntity"
import "../css-files/view-styles.css";

const COMM_ENTITY_ACTIONS = {
    ADD: "Add",
    REMOVE: "Remove",
    JOIN: "Join",
    LEAVE: "Leave",
    DISMISS: "Dismiss"
}

export default function CommunicationEntitiesBar(props){
    const [selectedCommEntityIndex, setSelectedCommEntityIndex] = useState(-1);
    const [commEntityShowActionsIndex, setCommEntityShowActionsIndex] = useState(-1);

    const friendModeCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.REMOVE, className: "negative"}, 
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    const groupModeCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.LEAVE, className: "negative"}, 
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    function handleCommEntitySelected(selectedIndex, selectedCommEntity){
        setSelectedCommEntityIndex(selectedIndex);
        setCommEntityShowActionsIndex(-1);

        if(!props.changeChatPane) // Using falsy
            return;
        
        changeChatPane(selectedCommEntity);
    }

    function changeChatPane(commEntity){
        props.changeChatPane(commEntity)
    }

    function handleContextMenu(e, index){
        e.preventDefault();
        setSelectedCommEntityIndex(-1);
        setCommEntityShowActionsIndex(index);
    }

    function handleActionClicked(action, commEntityID){
        switch(action){
            case COMM_ENTITY_ACTIONS.DISMISS:
                setSelectedCommEntityIndex(-1);
                setCommEntityShowActionsIndex(-1);
                break;
            case COMM_ENTITY_ACTIONS.REMOVE:
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
        <div id={props.id} className="communicationEntitiesBar">
            {/* {props.communicationEntities.map((value, index) => {
                return (
                    <CommunicationEntity
                    key={"communicationEntity" + value._id}
                    onClick={(selectedIndex) => handleCommEntitySelected(selectedIndex, value)}
                    onContextMenu={(e, index) => {handleContextMenu(e,index)}}
                    index={index}
                    commEntityID={value._id}
                    className={selectedCommEntityIndex === index ? "selectedCommunicationEntity" : ""}
                    actions={props.mode === "Friends" || props.mode === "Users" ? friendModeCommEntityActions : groupModeCommEntityActions}
                    showActionMenu={commEntityShowActionsIndex === index}
                    handleActionClicked={handleActionClicked}
                    displayStatusIndicators={props.mode === "Friends"}
                    >{value._name}</CommunicationEntity>
                );
            })} */}
        </div>
    );
}