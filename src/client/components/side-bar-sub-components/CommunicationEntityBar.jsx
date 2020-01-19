import React, {useState} from "react"
import CommunicationEntity from "./CommunicationEntity"
import "./side-bar-sub-components-css-files/communication-entity-styles.css";
export default function CommunicationEntitiesBar(props){
    const [selectedCommEntityIndex, setSelectedCommEntityIndex] = useState(-1);
    const friendModeCommEntityActions = [{actionName: "Add", className: "affirmative"}, {actionName: "Remove", className: "negative"}, {actionName: "Dismiss", className: "neutral"}];
    const groupModeCommEntityActions = [{actionName: "Join", className: "affirmative"}, {actionName: "Leave", className: "negative"}, {actionName: "Dismiss", className: "neutral"}];


    function handleCommEntitySelected(selectedIndex){
        setSelectedCommEntityIndex(selectedIndex);
        console.log("A comm entity was selected: ", selectedIndex);
    }

    return(
        <div id={props.id}>
            {props.communicationEntities.map((value, index) => {
                return (
                    <CommunicationEntity
                    key={"communicationEntity" + index}
                    id={"communicationEntity" + index}
                    onClick={(selectedIndex) => handleCommEntitySelected(selectedIndex)}
                    index={index}
                    className={selectedCommEntityIndex === index ? "selectedCommunicationEntity" : ""}
                    actions={props.mode === "Friends" ? friendModeCommEntityActions : groupModeCommEntityActions}
                    >{value}</CommunicationEntity>
                );
            })}
        </div>
    );
}