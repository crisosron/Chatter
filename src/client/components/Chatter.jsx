import React, {useEffect} from 'react';
import Login from "./Login";
import Register from "./Register";
import HomeView from "./HomeView";
import CreateGroupView from "./CreateGroupView";
import GroupChatView from "./GroupChatView";
import IndividualChatView from "./IndividualChatView";
import ProfileView from "./ProfileView";
import SearchView from "./SearchView";
import ReactNotification from "react-notifications-component";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Chatter() {

  useEffect(() => {
    return () => {
      localStorage.clear(); // Clears localStorage on unmount of this component
    }
  }, []);

  return (
    <div>
      <ReactNotification/>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/home" exact component={HomeView} />
          <Route path="/create-group" exact component={CreateGroupView} />
          <Route path="/chat" exact component={IndividualChatView}/>
          <Route path="/group-chat" exact component={GroupChatView}/>
          <Route path="/profile" exact component={ProfileView} />
          <Route path="/search" exact component={SearchView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Chatter;
