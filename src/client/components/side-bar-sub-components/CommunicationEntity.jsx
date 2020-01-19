import React, {useEffect, useState} from "react";
import "./side-bar-sub-components-css-files/communication-entity-styles.css";

export default function CommunicationEntity(props){
    const [showActionMenu, setShowActionMenu] = useState(false);

    function handleMenuItemContextMenu(e){
        e.preventDefault();
        setShowActionMenu(!showActionMenu);
    }

    if(!showActionMenu){
        return(
            <div id={props.id} className={"communicationEntityDiv " + props.className} onClick={() => {props.onClick(props.index);}} onContextMenu={handleMenuItemContextMenu}>
                    <div className="displayImageDiv verticallyCenteredRelativeToParent"></div>
                    <div className="communicationEntityContentDiv verticallyCenteredRelativeToParent">
                        <h2>{props.children}</h2>
                    </div>
            </div>

        );
    }

    return(
        <div id={props.id} className={"communicationEntityActionsDiv"} onContextMenu={handleMenuItemContextMenu}>
            {props.actions.map((value, index) => {
                return <div className={"actionDiv " + value.className}>{value.actionName}</div>
            })}
        </div>
    ); 
}