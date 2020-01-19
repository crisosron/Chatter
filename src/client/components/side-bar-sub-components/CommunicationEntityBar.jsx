import React, {useState} from "react"
import CommunicationEntity from "./CommunicationEntity"
import "./side-bar-sub-components-css-files/communication-entity-styles.css";
export default function CommunicationEntitiesBar(props){
    const [selectedCommEntityIndex, setSelectedCommEntityIndex] = useState(-1);
    const [commEntityShowActionsIndex, setCommEntityShowActionsIndex] = useState(-1);
    const friendModeCommEntityActions = [{actionName: "Add", className: "affirmative"}, {actionName: "Remove", className: "negative"}, {actionName: "Dismiss", className: "neutral"}];
    const groupModeCommEntityActions = [{actionName: "Join", className: "affirmative"}, {actionName: "Leave", className: "negative"}, {actionName: "Dismiss", className: "neutral"}];

    function handleCommEntitySelected(selectedIndex){
        setSelectedCommEntityIndex(selectedIndex);
        setCommEntityShowActionsIndex(-1);
        console.log("A comm entity was selected: ", selectedIndex);
    }

    function handleContextMenu(e, index){
        e.preventDefault();
        setSelectedCommEntityIndex(-1);
        setCommEntityShowActionsIndex(index);
    }


    return(
        <div id={props.id}>
            {props.communicationEntities.map((value, index) => {
                return (
                    <CommunicationEntity
                    key={"communicationEntity" + index}
                    id={"communicationEntity" + index}
                    onClick={(selectedIndex) => handleCommEntitySelected(selectedIndex)}
                    onContextMenu={(e, index) => {handleContextMenu(e,index)}}
                    index={index}
                    className={selectedCommEntityIndex === index ? "selectedCommunicationEntity" : ""}
                    actions={props.mode === "Friends" ? friendModeCommEntityActions : groupModeCommEntityActions}
                    showActionMenu={commEntityShowActionsIndex === index}
                    >{value}</CommunicationEntity>
                );
            })}
        </div>
    );
}