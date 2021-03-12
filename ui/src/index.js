import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import UserLayout from "layouts/User.js";
import StudioLayout from "layouts/Studio.js";
import ResellerLayout from "layouts/Reseller.js";

import AuthLayout from "layouts/Auth.js";
import TempLayout from "layouts/Temp.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/user" render={props => <UserLayout {...props} />} />
      <Route path="/studio" render={props => <StudioLayout {...props} />} />
      <Route path="/reseller" render={props => <ResellerLayout {...props} />} />
      <Route path="/temp" render={props => <TempLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      {/* <Redirect from="/" to="/admin/index" /> */}
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
