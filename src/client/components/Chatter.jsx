import React, {useEffect} from 'react';
import Login from "./Login";
import Register from "./Register";
import FriendsView from "./FriendsView";
import GroupsView from "./GroupsView"
import SearchView from "./SearchView";
import ReactNotification from "react-notifications-component";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Chatter() {
  return (
    <div>
      <ReactNotification/>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />

          {/* TODO: Update path names to better reflect the component name for FriendsView and GroupsView */}
          <Route path="/chat" exact component={FriendsView}/>
          <Route path="/group-chat" exact component={GroupsView}/>
          <Route path="/search" exact component={SearchView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Chatter;
