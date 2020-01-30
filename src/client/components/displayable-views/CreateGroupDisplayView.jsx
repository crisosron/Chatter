import React from "react";
import "./displayable-views-css-files/create-group-displayble-view-styles.css";
export default function CreateGroupDisplayView(props){
    return(
        <div id="createGroupDisplayView">
            <div id="createGroupDisplayViewContent">
                <h1>Create a Group</h1>
                <div id="groupDetailsInput">
                    <h2 className="groupDetailsInputLabel">Group Name</h2>
                    <input className="groupDetailsInputField" type="text"></input>

                    <h2 className="groupDetailsInputLabel">Group Description</h2>
                    <input className="groupDetailsInputField" type="text"></input>
                </div>
            </div>
        </div>
    )
}