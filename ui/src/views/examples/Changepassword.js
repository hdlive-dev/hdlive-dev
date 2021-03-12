import React from "react";
import { dataEncrypt, dataDecrypt, genPassword, apiURL } from "util/Util.jsx";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/Header.js";

class Changepassword extends React.Component {

  constructor() {
    super();
    this.state = {
      oldpws: "",
      newpws: "",
      confirmpws: ""
    }
  }

  doChangepassword = () => {
    console.log("called");
    const def_Iv = "H8Ctcauy/4DhnYyfksuWkw==";
    const def_Key = "0e+B7xdXE4I5p8mqAK9r2ejoAGlVx6Mkb2EuHNOoxkg=";

    if (this.state.oldpws == "") {
      alert("Please input old password");
    }
    else if (this.state.newpws == "") {
      alert("Please input new password");
    }
    else if (this.state.oldpws == this.state.newpws) {
      alert("Old and New passwords are same, please use different new password.");
    }
    else if (this.state.newpws.length < 8) {
      alert("Password length should be more than 8");
    }
    else if (!this.state.newpws.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      alert("Password must be contains lower, uppercase, number and two special characters!");
    }
    else if (!this.state.newpws.match(/([0-9])/)) {
      alert("Password must be contains lower, uppercase, number and two special characters!");
    }
    else if (!this.state.newpws.match(/(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/)) {
      alert("Password must be contains lower, uppercase, number and two special characters!");
    }
    else if (this.state.confirmpws == "") {
      alert("Please input confirm password");
    }
    else if (this.state.newpws != this.state.confirmpws) {
      alert("Please check your new password as confirm password is not matched.");
    }
    else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: localStorage.getItem("UID"), userpassword: genPassword(this.state.newpws) })
      };
      const apiUrl = apiURL() + "changePassword";
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((reqdata) => {
          if (reqdata.statcode === 200) {
            alert("Password has been changed");
            localStorage.clear();
            this.props.history.push('/auth');
          }
          else {
            //console.log(reqdata.statmsg); 
            alert(reqdata.statmsg);
          }
        });
    }
  };


  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>

            <Col className="order-xl-1" xl="9">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">Change Password</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-oldpassword"
                            >
                              Old Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-oldpwd"
                              placeholder="Old Password"
                              type="password"
                              onChange={(e) => { this.setState({ oldpws: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-newpassword"
                            >
                              New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-newpwd"
                              placeholder="New Password"
                              type="password"
                              onChange={(e) => { this.setState({ newpws: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-confirmpassword"
                            >
                              Confirm Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-conpwd"
                              placeholder="Confirm Password"
                              type="password"
                              onChange={(e) => { this.setState({ confirmpws: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <Button className="my-4" color="primary" type="button" onClick={() => this.doChangepassword()} >
                              Change Password
                   </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Changepassword;
