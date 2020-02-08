import React, {useState}from "react";
import "./views-css-files/profile-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
export default function ProfileView(props){
    const [changesLocked, setChangesLocked] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(false);
    let changesLockInputFieldPlaceholder = changesLocked ? "Click lock to make changes to your account information" : "Enter your password"

    return(
        <div id="profileViewWrapper">
            <div id="bannerDiv">
                <div id="profileImageDiv"></div>
                <div id="titleInfo"></div>
            </div>

            <div id="profileBodyWrapper">
                <div id="friendsAndGroupsWrapper">
                    <div id="friendsDiv">
                        <div class="searchBarWrapper">
                            <SearchBar id="userSearchBar" mode="Friends"></SearchBar>
                        </div>
                    </div>
                    <div id="groupsDiv">
                        <div class="searchBarWrapper">
                            <SearchBar id="groupSearchBar" mode="Groups"></SearchBar>
                        </div>
                    </div>
                </div>

                <div id="accountInformationWrapper">
                    <div id="accountInformationTitleDiv">
                        <h1>Your Information</h1>
                        <div id="lockChangesDiv">
                            <input id="changesLockInputField"
                            placeholder={changesLockInputFieldPlaceholder}
                            type="password"
                            disabled
                            />
                            <div id="lockIcon"></div>
                        </div>
                    </div>
                    <div id="accountInformationContent">

                    </div>
                </div>
            </div>
        </div>
    )
}