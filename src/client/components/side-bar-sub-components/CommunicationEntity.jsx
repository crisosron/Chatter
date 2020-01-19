import React, {useEffect, useState} from "react";
import "./side-bar-sub-components-css-files/communication-entity-styles.css";

export default function CommunicationEntity(props){
    function handleActionClicked(actionName){
        alert(`Handle action ${actionName}`);        
    }  

    if(!props.showActionMenu){
        return(
            <div id={props.id} className={"communicationEntityDiv " + props.className} onClick={() => {props.onClick(props.index);}} onContextMenu={(e) => {props.onContextMenu(e, props.index)}}>
                    <div className="displayImageDiv verticallyCenteredRelativeToParent"></div>
                    <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
                        <h2>{props.children}</h2>
                    </div>
            </div>

        );
    }

    return(
        <div id={props.id + "actionDiv"} className={"communicationEntityActionsDiv"}>
            {props.actions.map((value, index) => {
                return <div 
                key={value.actionName + index} 
                className={"actionDiv " + value.className} 
                onClick={() => {handleActionClicked(value.actionName)}}>{value.actionName}</div>
            })}
        </div>
    ); 
}