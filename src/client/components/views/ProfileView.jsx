import React from "react";
import "./views-css-files/profile-view-styles.css";
export default function ProfileView(props){
    return(
        <div id="profileViewWrapper">
            <div id="bannerDiv">
                <div id="profileImageDiv"></div>
                <div id="titleInfo"></div>
            </div>

            <div id="profileBodyWrapper">
                <div id="friendsAndGroupsWrapper">
                    <div id="friendsDiv"></div>
                    <div id="groupsDiv"></div>
                </div>

                <div id="accountInformationWrapper"></div>
                </div>
            </div>
    )
}