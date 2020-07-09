// ################# DEPRECATED (SEE ISSUE #18) FOR DETAILS ################# //

import React, {useState, useEffect} from "react"
import socket from "../../../index";
import PROFILE_EVENTS from "../../../events/profile-events";
import NotificationHandler from "../../notification-handler";
import "./views-sub-components-css-files/user-info-form-styles.css";
export default function UserInfoForm(props){
    const thisUser = JSON.parse(sessionStorage.getItem("thisUser"));
    const [originalUserInfo, setOriginalUserInfo] = useState({}); // TODO: Develop an undo changes in the form and use this state var in its implementation

    const [userNameInputValue, setUserNameInputValue] = useState("");
    const [newPasswordInputValue, setNewPasswordInputValue] = useState("");
    const [emailInputValue, setEmailInputValue] = useState("");
    const [currentPasswordInputValue, setCurrenPasswordInputValue] = useState("");
    const [changesMade, setChangesMade] = useState(false);

    const handleSaveChangesClicked = () => {
        console.log("TODO: Handle save changes");
        // Firstly, determine if the entered current password is correct
        // then, determine what input fields actually have new data in them
        // Once that is done, validate them
        // Then send the update query to server
    }

    // Handlers for onChange on each of the input fields
    const handleUserNameInputChanged = e => {
        setUserNameInputValue(e.target.value);
        setChangesMade(true);
    }

    const handleNewPasswordInputChanged = e => {
        setNewPasswordInputValue(e.target.value);
    }

    const handleEmailInputChanged = e => {
        setEmailInputValue(e.target.value);
        setChangesMade(true);
    }

    const handleCurrentPasswordInputChanged = e => {
        setCurrenPasswordInputValue(e.target.value);
        // Note: no setChangesMade call here
    }

    // This useEffect hook is designed to simulate componentDidMount. It will send a socket.io event to obtain user info
    // and then handle the server's response by calling the setter methods for the user's info and storing into originalUserInfo
    useEffect(() => {
        socket.emit(PROFILE_EVENTS.GET_USER_INFO, {id: thisUser.id});
        socket.on(PROFILE_EVENTS.DELIVER_USER_INFO, data => {
            setOriginalUserInfo({
                userName: data.userName,
                email: data.email
            });
            setUserNameInputValue(data.userName);
            setEmailInputValue(data.email);
        });

        return () => {
            socket.removeListener(PROFILE_EVENTS.DELIVER_USER_INFO);
        }

    }, []);

    return(
        <div id="accountInformationWrapper">
            <div id="accountInformationTitleDiv">
                <h1>Your Information</h1>
            </div>
            <div id="accountInformationContentWrapper">

                {/* Fields to allow the user to make edits to their account information */}
                <div id="accountInformationContentDiv">
                    <form onSubmit={handleSaveChangesClicked}>
                        <label>
                            <h2>Change Username</h2>
                            <input class="textualInput" type="text" value={userNameInputValue} onChange={handleUserNameInputChanged}/>
                        </label>

                        <label>
                            <h2>Change Email</h2>
                            <input class="textualInput" type="text" value={emailInputValue} onChange={handleEmailInputChanged}/>
                        </label>

                        <label>
                            <h2>Change Password</h2>
                            <input class="textualInput" type="password" value={newPasswordInputValue} onChange={handleNewPasswordInputChanged} placeholder="Enter your new password"/>
                        </label>
                        
                        <label>
                            <h2>Enter password to save changes</h2>
                            <input class="textualInput" type="password" value={currentPasswordInputValue} onChange={handleCurrentPasswordInputChanged} placeholder="Enter your current password"/>
                        </label>
                        <input type="submit" value="Save Changes" id="saveChangesButton" onChange={handleSaveChangesClicked}/>
                        {/* TODO: Implement reset  */}
                    </form>
                </div>
            </div>
        </div>
    )
}