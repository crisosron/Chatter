import React from "react";
export default function DefaultDisplayedView(){
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return(
        <div id="defaultDisplayedView" style={styles}>
            <h1>Search a user to get started</h1>
        </div>
    )
}