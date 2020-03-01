import React, {useState, useEffect} from "react"
import socket from "../../../../index";
import PROFILE_EVENTS from "../../../../events/profile-events";
import "./views-sub-components-css-files/user-info-form-styles.css";
export default function UserInfoForm(props){
    const thisUser = JSON.parse(localStorage.getItem("thisUser"));
    const [changesLocked, setChangesLocked] = useState(true);

    // accountInfoEditingEnabled will enable/disable input fields in accountInformationContentDiv
    const [accountInfoEditingEnabled, setAccountInfoEditingEnabled] = useState(false);
    const [originalUserInfo, setOriginalUserInfo] = useState({}); // TODO: Develop an undo changes in the form and use this state var in its implementation

    const [userNameInputValue, setUserNameInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [emailInputValue, setEmailInputValue] = useState("");

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

    }, []);

    // This useEffect is for performing the operations required when changesLocked mutates
    useEffect(() => {
        if(!changesLocked){
            enableChangesInputField.focus();
        }
    }, [changesLocked]);

    let enableChangesInputField = null;
    let enableChangesInputFieldPlaceholder = changesLocked ? "Click lock to make changes to your account" : "Enter your password"

    return(
        <div id="accountInformationWrapper">
            <div id="accountInformationTitleDiv">
                <h1>Your Information</h1>
                <div id="enableChangesDiv">
                    <input id="enableChangesInputField"
                    placeholder={enableChangesInputFieldPlaceholder}
                    type="password"
                    disabled={changesLocked}
                    ref={(inputField) => {enableChangesInputField = inputField}}
                    required
                    />
                    <div id="enableChangesIconDiv" className={changesLocked ? "lockedIconDiv" : "confirmPassword"} onClick={changesLocked ? handleEnableChangesIconClicked : handleConfirmPasswordClicked}>{!changesLocked ? "Confirm" : ""}</div>
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