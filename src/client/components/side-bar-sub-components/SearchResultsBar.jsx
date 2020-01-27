import React, {useState} from "react";
import "./side-bar-sub-components-css-files/search-results-bar-styles.css"
import CommunicationEntity from "./CommunicationEntity";
import COMM_ENTITY_ACTIONS from "./comm-entity-actions";
export default function SearchResultsBar(props){
    const [selectedUserCommEntityIndex, setSelectedUserCommEntityIndex] = useState(-1);
    const [selectedGroupCommEntityIndex, setSelectedGroupCommEntityIndex] = useState(-1);
    const [userCommEntityShowActionsIndex, setUserCommEntityShowActionsIndex] = useState(-1);
    const [groupCommEntityShowActionsIndex, setGroupCommEntityShowActionsIndex] = useState(-1);

    const userCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.ADD, className: "affirmative"},
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    const groupCommEntityActions = [
        {actionName: COMM_ENTITY_ACTIONS.JOIN, className: "affirmative"}, 
        {actionName: COMM_ENTITY_ACTIONS.DISMISS, className: "neutral"}
    ];

    const handleUserCommEntitySelected = (index) => {
        setSelectedUserCommEntityIndex(index);
        setSelectedGroupCommEntityIndex(-1); // A -1 means deselection
        setGroupCommEntityShowActionsIndex(-1);
        setUserCommEntityShowActionsIndex(-1);
    }

    const handleGroupCommEntitySelected = index => {
        setSelectedGroupCommEntityIndex(index);
        setSelectedUserCommEntityIndex(-1);
        setGroupCommEntityShowActionsIndex(-1);
        setUserCommEntityShowActionsIndex(-1);
    }
    
    const handleUserOnContextMenu = (e, index) => {
        e.preventDefault();
        setUserCommEntityShowActionsIndex(index);
        setGroupCommEntityShowActionsIndex(-1);
        setSelectedUserCommEntityIndex(-1);
        setSelectedGroupCommEntityIndex(-1);
    }

    const handleGroupOnContextMenu = (e, index) => {
        e.preventDefault();
        setUserCommEntityShowActionsIndex(index);
        setGroupCommEntityShowActionsIndex(-1);
        setSelectedUserCommEntityIndex(-1);
        setSelectedGroupCommEntityIndex(-1);
    }

    const handleActionClicked = (action, index) => {

    }

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
                    onClick={(selectedIndex) => {handleUserCommEntitySelected(selectedIndex)}}
                    onContextMenu={(e, index) => {handleUserOnContextMenu(e, index)}}
                    index={index}
                    className={selectedUserCommEntityIndex === index ? "searchResultCommEntity selectedCommunicationEntity" : "searchResultCommEntity"}
                    actions={userCommEntityActions}
                    showActionMenu={userCommEntityShowActionsIndex === index}
                    handleActionPressed={handleActionClicked}
                    >{userCommEntity._name}</CommunicationEntity>
                    );
                })}

            </div>
            <div id="groupResultsDiv">
                <div className="resultsTitleDiv">
                    <h3>Groups</h3>
                </div>

                {props.groupCommunicationEntities.map((groupCommEntity, index) => {
                    return (
                        <CommunicationEntity
                        key={groupCommEntity._id}
                        onClick={(selectedIndex) => {handleGroupCommEntitySelected(selectedIndex)}}
                        onContextMenu={(e, index) => {handleGroupOnContextMenu(e, index)}}
                        index={index}
                        className={selectedGroupCommEntityIndex === index ? "searchResultCommEntity selectedCommunicationEntity" : "searchResultCommEntity"}
                        actions={groupCommEntityActions}
                        showActionMenu={groupCommEntityShowActionsIndex === index}
                        handleActionPressed={handleActionClicked}
                        >{groupCommEntity._name}</CommunicationEntity>
                        );
                })}

            </div>
        </div>
    );
}