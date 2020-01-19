import React, {useEffect, useState} from "react";
import "./side-bar-sub-components-css-files/communication-entity-styles.css";

export default function CommunicationEntity(props){
    const [showActionMenu, setShowActionMenu] = useState(false);

    function handleContextMenu(e){
        e.preventDefault(); // Hinders the default context menu from appearing
        setShowActionMenu(!showActionMenu); // Shows the custom action menu
    }

    function handleActionClicked(actionName){
        alert(`Handle action ${actionName}`);
        setShowActionMenu(!showActionMenu);
    }  

    if(!showActionMenu){
        return(
            <div id={props.id} className={"communicationEntityDiv " + props.className} onClick={() => {props.onClick(props.index);}} onContextMenu={handleContextMenu}>
                    <div className="displayImageDiv verticallyCenteredRelativeToParent"></div>
                    <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
                        <h2>{props.children}</h2>
                    </div>
            </div>

        );
    }

    return(
        <div id={props.id} className={"communicationEntityActionsDiv"}>
            {props.actions.map((value, index) => {
                return <div key={value.actionName + index} className={"actionDiv " + value.className} onClick={() => {handleActionClicked(value.actionName)}}>{value.actionName}</div>
            })}
        </div>
    ); 
}