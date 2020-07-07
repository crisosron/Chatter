import React from "react";
import {Link} from "react-router-dom";
import "../css-files/sidebar-option-styles.css";

function handleSidebarOptionClicked(index){
    sessionStorage.setItem("selectedNavOptionIndex", index.toString());
}

export default function SideBarOption(props){
    return(
        <Link to={props.linkPath} key={"sideBarOption: " + props.linkPath + props.index} className={"sideBarOption " + (props.isSelected ? "selectedSideBarOption" : "")} onClick={() => handleSidebarOptionClicked(props.index)}>
            <img className="sideBarOptionIcon" src={props.iconPath} alt="icon" />
            {props.children}
        </Link>
    );
}