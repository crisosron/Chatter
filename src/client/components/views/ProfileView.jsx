import React, {useState, useEffect}from "react";
import "./views-css-files/profile-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
export default function ProfileView(props){
    const [changesLocked, setChangesLocked] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(false);
    let enableChangesInputField = null;
    let enableChangesInputFieldPlaceholder = changesLocked ? "Click lock to make changes to your account" : "Enter your password"

    const handleEnableChangesIconClicked = () => {
        setChangesLocked(false);
    }

    const handleConfirmPasswordClicked = () => {
        console.log("TODO: Handle confirmation of password and enable editing for all input fields in accountInformationContent");
        setChangesLocked(true);
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
                    <div id="accountInformationContent">

                    </div>
                </div>
            </div>
        </div>
    )
}