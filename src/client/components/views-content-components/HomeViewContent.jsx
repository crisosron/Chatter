import React from "react";
export default function HomeViewContent(props){
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return(
        <div id="defaultDisplayedView" style={styles}>
            <h1>HomeViewContent:{props.thisUser.name}</h1>
        </div>
    )
}