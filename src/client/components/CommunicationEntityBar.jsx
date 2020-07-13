import React, {useState, useEffect} from "react"
import CommunicationEntity from "./CommunicationEntity"
import "../css-files/view-styles.css";
import "../css-files/communication-entity-styles.css"
import SearchBar from "./SearchBar";
import socket from "../../index";
import RENDER_EVENT from "../../constants/events/render-events";

// TODO: Assess the neccesity of this
const COMM_ENTITY_ACTIONS = {
    ADD: "Add",
    REMOVE: "Remove",
    JOIN: "Join",
    LEAVE: "Leave",
    DISMISS: "Dismiss"
}

export default function CommunicationEntitiesBar(props){
    const [commEntities, setCommEntities] = useState([]);
    const [selectedCommEntityIndex, setSelectedCommEntityIndex] = useState(-1);
    const [commEntityShowActionsIndex, setCommEntityShowActionsIndex] = useState(-1);

    function handleCommEntitySelected(selectedIndex, selectedCommEntity){
        setSelectedCommEntityIndex(selectedIndex);
        setCommEntityShowActionsIndex(-1);

        if(!props.changeChatPane) // Using falsy
            return;
        
        changeChatPane(selectedCommEntity);
    }

    function updateCommEntities(commEntities){
        setCommEntities(commEntities);
    }

    function changeChatPane(commEntity){
        props.changeChatPane(commEntity)
    }

    useEffect(() => {
        console.log("Called useEffect");
        socket.addEventListener(RENDER_EVENT.DELIVER_FRIENDS);

    }, []);

    return(
        <div id={props.id} className="communicationEntitiesBar">
            <div className="searchBarWrapper">
                <SearchBar updateCommEntities={updateCommEntities}/>
            </div>

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