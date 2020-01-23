import React from "react";
import "./side-bar-sub-components-css-files/search-results-bar-styles.css"
export default function SearchResultsBar(props){
    return(
        <div id="searchResultsBar">
            <div id="friendResultsDiv">
                <div className="resultsTitleDiv">
                    <h3>Users</h3>
                </div>
                {/* TODO: Render individual CommEntities here */}

            </div>
            <div id="groupResultsDiv">
                <div className="resultsTitleDiv">
                    <h3>Groups</h3>
                </div>

                {/* TODO: Render group CommEntities here */}
            </div>
        </div>
    );
}