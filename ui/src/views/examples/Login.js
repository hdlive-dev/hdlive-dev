import React from "react";
import { dataEncrypt, dataDecrypt, genPassword, apiURL } from "util/Util.jsx";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import github from "assets/img/icons/common/github.svg"
import google from "assets/img/icons/common/google.svg"

const DropDown = {
  "width": "100%",
  "padding": "10px 35px 5px 10px",
  "fontSize": "0.875rem",
  "border": "1px solid #ccc",
  "height": "calc(2.75rem + 2px)",
  "WebkitAppearance": "none",
  "MozAppearance": "none",
  "appearance": "none",
  "color": "#8898aa"
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      UserType: "0",
      username: "",
      pws: ""
    }
  }

  doLogin = () => {
    const def_Iv = "H8Ctcauy/4DhnYyfksuWkw==";
    const def_Key = "0e+B7xdXE4I5p8mqAK9r2ejoAGlVx6Mkb2EuHNOoxkg=";

    if (this.state.UserType == "0") {
      alert("Please select User Type.");
    }
    else if (this.state.username == "") {
      alert("Please input Username.");
    }
    else if (this.state.pws == "") {
      alert("Please input password.");
    }
    else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginid: this.state.username, userpassword: genPassword(this.state.pws), UserTypeId: this.state.UserType })
      };
      const apiUrl = apiURL() + "login";
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((reqdata) => {
          if (reqdata.statcode === 200) {
            let LoginData = {
              data: JSON.stringify(reqdata.data),
              iv: def_Iv,
              key: def_Key
            }
            //console.log(dataDecrypt(LoginData));
            var AfterLoginData = JSON.parse(dataDecrypt(LoginData));
            localStorage.setItem('USER_NAME_TX', AfterLoginData.USER_NAME_TX);
            localStorage.setItem('IVkey', AfterLoginData.USER_ID);
            localStorage.setItem('SESSION_KEY', AfterLoginData.SESSION_KEY);
            localStorage.setItem('USER_TYPE_ID', AfterLoginData.USER_TYPE_ID);
            localStorage.setItem('LOGIN_ID', AfterLoginData.LOGIN_ID);
            localStorage.setItem('UID', AfterLoginData.ID);
            if (AfterLoginData.USER_TYPE_ID === 1) {
              this.props.history.push('/admin');
            } else if (AfterLoginData.USER_TYPE_ID === 2) {
              this.props.history.push('/admin');
            } else if (AfterLoginData.USER_TYPE_ID === 3) {
              this.props.history.push('/user');
            } else if (AfterLoginData.USER_TYPE_ID === 4) {
              this.props.history.push('/studio');
            }

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
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      // src= {require("assets/img/icons/common/github.svg")}
                      src={github}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      // src={require("assets/img/icons/common/google.svg")}
                      src={google}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              {/* <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div> */}
              <Form role="form">
                <FormGroup>
                  <InputGroup>
                    <select className="input-group" style={DropDown} onChange={(e) => { this.setState({ UserType: e.target.value }) }}>
                      <option value="0">Select User Type</option>
                      <option value="1">Admin</option>
                      <option value="3">User</option>
                      <option value="2">Reseller</option>
                      <option value="4">Studio</option>
                    </select>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email"
                      onChange={(e) => { this.setState({ username: e.target.value }) }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password"
                      onChange={(e) => { this.setState({ pws: e.target.value }) }} />
                  </InputGroup>
                </FormGroup>
                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={() => this.doLogin()}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              {/* <a
                className="text-light"
                href="/auth/register"
              >
                <small>Create new account</small>
              </a>
               */}
              <Link className="text-light" to="/auth/register"><small>Create new account</small></Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
