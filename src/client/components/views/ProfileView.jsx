import React, {useState, useEffect}from "react";
import "./views-css-files/profile-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
import UserInfoForm from "./views-sub-components/UserInfoForm"
import CommunicationEntityBar from "./views-sub-components/CommunicationEntityBar"
import socket from "../../../index";
import PROFILE_EVENTS from "../../../events/profile-events";
export default function ProfileView(props){

    // TODO: Set default comm entities for these arrays
    const [friendCommEntities, setFriendCommEntities] = useState([]);
    const [groupCommEntities, setGroupCommEntities] = useState([]);
    const [selectedSearchMode, setSelectedSearchMode] = useState("Friends");
    const [pendingFriendRequests, setPendingFriendRequests] = useState([]);

    const resetCommEntities = () => {
        setFriendCommEntities([]);
        setGroupCommEntities([]);
    }

    const updateFriendCommEntities = friendCommEntities => {
        console.log("Called updateFriendCommEntities");
        setFriendCommEntities(friendCommEntities);
    }

    const updateGroupCommEntities = groupCommEntities => {
        console.log("Called updateGroupCommEntities");
        setGroupCommEntities(groupCommEntities);
    }

    useEffect(() => {
        //TODO: Get pending friend requests and display them to notifications content
        socket.emit(PROFILE_EVENTS.GET_PENDING_FRIEND_REQUESTS, {
            id: props.thisUser.id
        });

        socket.on(PROFILE_EVENTS.DELIVER_PENDING_FRIEND_REQUEST, data => {
            console.log(`data.pendingFriendRequests.length: ${data.pendingFriendRequests.length}`);
        });
    }, [pendingFriendRequests]);


    return(
        <div id="profileViewWrapper">
            <div id="bannerDiv">
                <div id="profileImageDiv"></div>
                <div id="titleInfo"></div>
                <div id="notificationsWrapper">
                    <h1>Notifications</h1>
                    <div id="notificationsContentDiv">
                        {pendingFriendRequests.map((value, index) => {
                            return <div className="notification"></div>
                        })}
                    </div>
                </div>
            </div>

            <div id="profileBodyWrapper">
                <div id="friendsAndGroupsWrapper">
                    <div id= "searchToggleDiv">
                        <div id="searchFriendsToggleDiv" className={selectedSearchMode === "Friends" ? "selectedSearchOption" : ""} onClick={() => {setSelectedSearchMode("Friends")}}>Friends</div>
                        <div id="searchGroupsToggleDiv" className={selectedSearchMode !== "Friends" ? "selectedSearchOption" : ""} onClick={() => {setSelectedSearchMode("Groups")}}>Groups</div>
                        <div id="searchBarWrapper">
                            <SearchBar id="profileSearchBar" updateCommEntities={selectedSearchMode === "Friends" ? updateFriendCommEntities : updateGroupCommEntities} resetCommEntities={resetCommEntities} mode={selectedSearchMode}>{"Search " + selectedSearchMode}</SearchBar>
                        </div>
                    </div>
                    <CommunicationEntityBar mode={selectedSearchMode} communicationEntities={selectedSearchMode === "Friends" ? friendCommEntities : groupCommEntities}></CommunicationEntityBar>
                   
                </div>
                <UserInfoForm thisUser={props.thisUser}/>
            </div>
        </div>
    )
}