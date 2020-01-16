import React, {useState} from "react"
import CommunicationEntity from "./CommunicationEntity"
import "./side-bar-sub-components-css-files/communication-entity-styles.css";
export default function CommunicationEntitiesBar(props){
    const [selectedCommEntityIndex, setSelectedCommEntityIndex] = useState(-1);

    function handleCommEntitySelected(selectedIndex){
        setSelectedCommEntityIndex(selectedIndex);
        console.log("A comm entity was selected: ", selectedIndex);
    }

    return(
        <div id={props.id}>
            {props.communicationEntities.map((value, index) => {
                return (
                    <CommunicationEntity
                    key={value.toLowerCase() + "CommunicationEntity"}
                    onClick={(selectedIndex) => handleCommEntitySelected(selectedIndex)}
                    index={index}
                    className={selectedCommEntityIndex === index ? "selectedCommunicationEntity" : ""}
                    >{value}</CommunicationEntity>
                );
            })}
        </div>
    );
}