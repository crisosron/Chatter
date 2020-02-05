import React from "react"
import "./views-css-files/search-view-styles.css";
import SearchBar from "./views-sub-components/SearchBar";
export default function SearchView(props){

    const updateUserCommEntities = (userCommEntities) => {

    }

    const updateGroupCommEntities = (groupCommEntities) => {

    }

    const resetUserCommEntities = () => {

    }

    const resetGroupCommEntities = () => {

    }

    return(
        <div id="searchViewWrapper">
            <div id="userSearchWrapper">
                <div id="userSearchContent" className="content">
                    <div id="userSearchBar" className="searchBarDiv">
                        <h2>Users</h2>
                        <SearchBar mode="Friends" updateCommEntities={updateUserCommEntities} resetCommEntities={resetUserCommEntities}/>
                    </div>
                    <div id="userSearchResults" className="resultsDiv">

                    </div>
                </div>
            </div>

            <div id="groupSearchWrapper">
                <div id="groupSearchContent" className="content">
                    <div id="groupSearchBar" className="searchBarDiv">
                        <h2>Groups</h2>
                        <SearchBar mode="Groups" updateCommEntities={updateGroupCommEntities} resetCommEntities={resetGroupCommEntities}/>

                    </div>
                    <div id="groupSearchResults" className="resultsDiv">

                    </div>
                </div>

            </div>
        </div>
    )
}