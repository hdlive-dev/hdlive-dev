import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";



import routes from "routes.js";

class Auth extends React.Component { 
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/Temp") {
        localStorage.clear();         
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
  render() {
    return (
      <>
        <div>               
          {/* Page content */}
          <Container>
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/Temp/temp" />
              </Switch>
            </Row>
          </Container>
        </div>
       
      </>
    );
  }
}

export default Auth;
