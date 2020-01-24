import React from "react";
import "./side-bar-sub-components-css-files/search-results-bar-styles.css"
import CommunicationEntity from "./CommunicationEntity";
export default function SearchResultsBar(props){
    return(
        <div id="searchResultsBar">
            <div id="friendResultsDiv">
                <div className="resultsTitleDiv">
                    <h3>Users</h3>
                </div>
                {props.userCommunicationEntities.map((userCommEntity, index) => {
                    return (
                    <CommunicationEntity
                    key={userCommEntity._id}

                    >{userCommEntity.name}</CommunicationEntity>
                    );
                })}

            </div>
            <div id="groupResultsDiv">
                <div className="resultsTitleDiv">
                    <h3>Groups</h3>
                </div>

                {props.groupCommunicationEntities.map((groupCommEntity, index) => {
                    return<CommunicationEntity key={groupCommEntity._id}>{groupCommEntity.name}</CommunicationEntity>
                })}

            </div>
        </div>
    );
}