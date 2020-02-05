import React from "react"
import "./views-css-files/search-view-styles.css";
export default function SearchView(props){
    return(
        <div id="searchViewWrapper">
            <div id="userSearchWrapper">
                <div id="userSearchContent" className="content">
                    <div id="userSearchBar" className="searchBarDiv">

                    </div>
                    <div id="userSearchResults" className="resultsDiv">

                    </div>
                </div>
            </div>

            <div id="groupSearchWrapper">
                <div id="groupSearchContent" className="content">
                    <div id="groupSearchBar" className="searchBarDiv">

                    </div>
                    <div id="groupSearchResults" className="resultsDiv">

                    </div>
                </div>

            </div>
        </div>
    )
}