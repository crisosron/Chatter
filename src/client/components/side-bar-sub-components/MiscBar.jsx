import React from "react";
import "./side-bar-sub-components-css-files/misc-bar-styles.css"
export default function MiscBar(props){
    const backSign = "<";
    const forwardSign = ">";
    return(
        <div id="miscBar">
            <button>{backSign}</button>
            <button>{forwardSign}</button>
            <button>Settings</button>
        </div>
    );
}