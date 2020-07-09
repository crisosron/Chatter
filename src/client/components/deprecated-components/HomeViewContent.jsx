// ################# DEPRECATED (SEE ISSUE #18) FOR DETAILS ################# //

import React from "react";
export default function HomeViewContent(props){
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const thisUser = JSON.parse(sessionStorage.getItem("thisUser"));

    return(
        <div id="defaultDisplayedView" style={styles}>
            <h1>HomeViewContent:{thisUser.name}</h1>
        </div>
    )
}