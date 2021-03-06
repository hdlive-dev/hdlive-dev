import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import logo from "assets/img/brand/logo.png";

class Studio extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (localStorage.getItem("SESSION_KEY") == null ||
        localStorage.getItem("SESSION_KEY") == "") {
        this.props.history.push('/auth');
      }
      else if (prop.layout === "/studio") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.studioRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes.studioRoutes[i].layout + routes.studioRoutes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes.studioRoutes}
          logo={{
            innerLink: "/studio/index",
            imgSrc: logo,
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
          />
          <Switch>
            {this.getRoutes(routes.studioRoutes)}
            <Redirect from="*" to="/studio/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Studio;
