import React from 'react';
import Login from "./Login"
import Register from "./Register"
import Chat from "./Chat";
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
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Chatter;
