import React, {useState, useEffect}from "react";
import "./views-css-files/profile-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
export default function ProfileView(props){
    const [changesLocked, setChangesLocked] = useState(true);

    // accountInfoEditingEnabled will enable/disable input fields in accountInformationContentDiv
    const [accountInfoEditingEnabled, setAccountInfoEditingEnabled] = useState(false);

    let enableChangesInputField = null;
    let enableChangesInputFieldPlaceholder = changesLocked ? "Click lock to make changes to your account" : "Enter your password"

    const handleEnableChangesIconClicked = () => {
        setChangesLocked(false);
        setAccountInfoEditingEnabled(false);
    }

    const handleConfirmPasswordClicked = () => {
        console.log("TODO: Handle confirmation of password and enable editing for all input fields in accountInformationContent");
        setChangesLocked(true);
        setAccountInfoEditingEnabled(true);
    }

    const handleSaveChangesClicked = () => {
        console.log("TODO: Handle save changes");
    }

    useEffect(() => {
        if(!changesLocked){
            enableChangesInputField.focus();
        }
    }, [changesLocked]);

    return(
        <div id="profileViewWrapper">
            <div id="bannerDiv">
                <div id="profileImageDiv"></div>
                <div id="titleInfo"></div>
            </div>

            <div id="profileBodyWrapper">
                <div id="friendsAndGroupsWrapper">
                    <div id="friendsDiv">
                        <div className="searchBarWrapper">
                            <SearchBar id="userSearchBar" mode="Friends"></SearchBar>
                        </div>
                    </div>
                    <div id="groupsDiv">
                        <div className="searchBarWrapper">
                            <SearchBar id="groupSearchBar" mode="Groups"></SearchBar>
                        </div>
                    </div>
                </div>

                <div id="accountInformationWrapper">
                    <div id="accountInformationTitleDiv">
                        <h1>Your Information</h1>
                        <div id="enableChangesDiv">
                            <input id="enableChangesInputField"
                            placeholder={enableChangesInputFieldPlaceholder}
                            type="password"
                            disabled={changesLocked}
                            ref={(inputField) => {enableChangesInputField = inputField}}
                            />
                            <div id="enableChangesIconDiv" className={changesLocked ? "lockedIconDiv" : "confirmPassword"} onClick={changesLocked ? handleEnableChangesIconClicked : handleConfirmPasswordClicked}>{!changesLocked ? "Confirm" : ""}</div>
                        </div>
                    </div>
                    <div id="accountInformationContentWrapper">

                        {/* Fields to allow the user to make edits to their account information */}
                        <div id="accountInformationContentDiv">
                            {/* TODO: On useEffect, obtain thisUser info from database and preload them in here as values */}
                            <h2>Username</h2>
                            <input type="text" disabled={!accountInfoEditingEnabled}/>
                            <h2>Password</h2>
                            <input type="password" disabled={!accountInfoEditingEnabled}/>
                            <h2>Email</h2>
                            <input type="text" disabled={!accountInfoEditingEnabled}/>
                            <button id="saveChangesButton" disabled={!accountInfoEditingEnabled} onClick={handleSaveChangesClicked}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}