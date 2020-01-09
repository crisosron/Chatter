import React from 'react';
import LoginRegister from "./LoginRegister"
import Chat from "./Chat"
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Chatter() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginRegister}></Route>
          <Route path="/chat" exact component={Chat}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Chatter;
