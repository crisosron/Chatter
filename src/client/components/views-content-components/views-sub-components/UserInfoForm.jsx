import React, {useState, useEffect} from "react"
import socket from "../../../../index";
import PROFILE_EVENTS from "../../../../events/profile-events";
import NotificationHandler from "../../../notification-handler";
import "./views-sub-components-css-files/user-info-form-styles.css";
export default function UserInfoForm(props){
    const thisUser = JSON.parse(sessionStorage.getItem("thisUser"));
    const [enableChangesInputFieldLocked, setEnableChangesInputFieldLocked] = useState(true);

    // accountInfoEditingEnabled will enable/disable input fields in accountInformationContentDiv
    const [accountInfoEditingEnabled, setAccountInfoEditingEnabled] = useState(false);
    const [originalUserInfo, setOriginalUserInfo] = useState({}); // TODO: Develop an undo changes in the form and use this state var in its implementation

    const [userNameInputValue, setUserNameInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [emailInputValue, setEmailInputValue] = useState("");

    const handleEnableChangesIconClicked = () => {

        // If accountInfoEditing has already been enabled and the user then clicks the lock icon, it should disable account editing and also lock the enableChangesInputField (restore default state essentially)
        if(accountInfoEditingEnabled){
            document.getElementById("enableChangesInputField").value = "";
            setAccountInfoEditingEnabled(false);
            setEnableChangesInputFieldLocked(true);
        }else{
            setEnableChangesInputFieldLocked(false);
        }
    }

    const handleConfirmPasswordClicked = () => {

        // Sends a socket.io event to check the validity of the password and allow editing of account info if so
        // Note that the responses to this event is located in useEffect hook
        socket.emit(PROFILE_EVENTS.REQUEST_ENABLE_CHANGES, {
            enteredPassword: document.getElementById("enableChangesInputField").value,
            id: thisUser.id
        });        
    }

    const handleSaveChangesClicked = () => {
        console.log("TODO: Handle save changes");
    }

    // Handlers for onChange on each of the input fields
    const handleUserNameInputChanged = e => {
        setUserNameInputValue(e.target.value);
    }

    const handlePasswordInputChanged = e => {
        setPasswordInputValue(e.target.value);
    }

    const handleEmailInputChanged = e => {
        setEmailInputValue(e.target.value);
    }

    // This useEffect hook is designed to simulate componentDidMount. It will send a socket.io event to obtain user info
    // and then handle the server's response by calling the setter methods for the user's info and storing into originalUserInfo
    useEffect(() => {
        socket.emit(PROFILE_EVENTS.GET_USER_INFO, {id: thisUser.id});
        socket.on(PROFILE_EVENTS.DELIVER_USER_INFO, data => {
            setOriginalUserInfo({
                userName: data.userName,
                password: data.password,
                email: data.email
            });
            setUserNameInputValue(data.userName);
            setPasswordInputValue(data.password);
            setEmailInputValue(data.email);
        });

        // If the entered password to enable changes does not match the registered password of thisUser
        socket.on(PROFILE_EVENTS.DENY_ENABLE_CHANGES, () => {
            setAccountInfoEditingEnabled(false);
            NotificationHandler.createNotification("danger", "Incorrect Password", "Please try again");
        });

        // If the entered password to enable changes matches the registered password of thisUser - enable account info editing
        socket.on(PROFILE_EVENTS.CONFIRM_ENABLE_CHANGES, () => {
            setEnableChangesInputFieldLocked(true);
            setAccountInfoEditingEnabled(true);
        });

        return () => {
            socket.removeListener(PROFILE_EVENTS.DENY_ENABLE_CHANGES);
            socket.removeListener(PROFILE_EVENTS.CONFIRM_ENABLE_CHANGES);
            socket.removeListener(PROFILE_EVENTS.DELIVER_USER_INFO);
        }

    }, []);

    // This useEffect is for performing the operations required when changesLocked mutates
    useEffect(() => {
        if(!enableChangesInputFieldLocked){
            enableChangesInputField.focus();
        }
    }, [enableChangesInputFieldLocked]);

    let enableChangesInputField = null;
    let enableChangesInputFieldPlaceholder = enableChangesInputFieldLocked ? "Click lock to make changes to your account" : "Enter your password"

    return(
        <div id="accountInformationWrapper">
            <div id="accountInformationTitleDiv">
                <h1>Your Information</h1>
                <div id="enableChangesDiv">
                    <input id="enableChangesInputField"
                    placeholder={enableChangesInputFieldPlaceholder}
                    type="password"
                    disabled={enableChangesInputFieldLocked}
                    ref={(inputField) => {enableChangesInputField = inputField}}
                    required
                    />
                    <div id="enableChangesIconDiv" 
                    className={enableChangesInputFieldLocked ? "lockedIconDiv" : "confirmPassword"} 
                    onClick={enableChangesInputFieldLocked ? handleEnableChangesIconClicked : handleConfirmPasswordClicked}>
                        {!enableChangesInputFieldLocked ? "Confirm" : ""}
                    </div>
                </div>
            </div>
            <div id="accountInformationContentWrapper">

                {/* Fields to allow the user to make edits to their account information */}
                <div id="accountInformationContentDiv">
                    <form onSubmit={handleSaveChangesClicked}>
                        <label>
                            <h2>Username</h2>
                            <input type="text" disabled={!accountInfoEditingEnabled} value={userNameInputValue} onChange={handleUserNameInputChanged}/>
                        </label>

                        <label>
                            <h2>Password</h2>
                            <input type="password" disabled={!accountInfoEditingEnabled} value={passwordInputValue} onChange={handlePasswordInputChanged}/>
                        </label>

                        <label>
                            <h2>Email</h2>
                            <input type="text" disabled={!accountInfoEditingEnabled} value={emailInputValue} onChange={handleEmailInputChanged}/>
                        </label>
                        
                        <input type="submit" value="Save Changes" id="saveChangesButton" disabled={!accountInfoEditingEnabled} onChange={handleEmailInputChanged}/>
                    </form>
                </div>
            </div>
        </div>
    )
}