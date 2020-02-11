import React, {useState, useEffect}from "react";
import "./views-css-files/profile-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
import UserInfoForm from "./views-sub-components/UserInfoForm"
import PROFILE_EVENTS from "../../../events/profile-events";
import socket from "../../../index";
export default function ProfileView(props){

    // TODO: Set default comm entities for these arrays
    const [friendCommEntities, setFriendCommEntities] = useState([]);
    const [groupCommEntities, setGroupCommEntities] = useState([]);

    const resetFriendCommEntities = () => {
        setFriendCommEntities([]);
    }

    const resetGroupCommEntities = () => {
        setGroupCommEntities([]);
    }

    const updateFriendCommEntities = friendCommEntities => {
        setFriendCommEntities(friendCommEntities);
    }

    const updateGroupCommEntities = groupCommEntities => {
        setGroupCommEntities(groupCommEntities);
    }

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
                            <SearchBar id="userSearchBar" updateCommEntities={updateFriendCommEntities} resetCommEntities={resetFriendCommEntities} mode="Friends">Search Friends</SearchBar>
                        </div>
                    </div>
                    <div id="groupsDiv">
                        <div className="searchBarWrapper">
                            <SearchBar id="groupSearchBar" updateCommEntities={updateGroupCommEntities} resetCommEntites={resetGroupCommEntities} mode="Groups">Search Groups</SearchBar>
                        </div>
                    </div>
                </div>
                <UserInfoForm thisUser={props.thisUser}/>
            </div>
        </div>
    )
}