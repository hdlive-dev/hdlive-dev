import React from "react";
import { genPassword, dataDecrypt, apiURL } from "util/Util.jsx";

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
import { isBlock } from "typescript";

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

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      UserType: "0",
      password_tx: "",
      Name: "",
      Email: "",
      WhatsappNumber: "",
      ResellerDropDown: [],
      showElement: false,
      ResellerId: "0"
    }
  }

  componentDidMount() {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: 0 })
    };
    let def_Iv = "H8Ctcauy/4DhnYyfksuWkw==";
    let def_Key = "0e+B7xdXE4I5p8mqAK9r2ejoAGlVx6Mkb2EuHNOoxkg=";
    let SlrapiUrl = apiURL() + "GetSeller";
    fetch(SlrapiUrl, requestOptions)
      .then((response) => response.json())
      .then((reqdata) => {
        if (reqdata.statcode === 200) {
          let apiData = {
            data: JSON.stringify(reqdata.data),
            iv: def_Iv,
            key: def_Key
          }

          var AfterapiData = JSON.parse(dataDecrypt(apiData));
          this.setState({ ResellerDropDown: AfterapiData });
        }
        else {
          alert(reqdata.statmsg);
        }
      });
  }

  handleChange = (value) => {
    this.setState({ UserType: value })
    if (value == 3)
      this.setState({ showElement: true })
    else
      this.setState({ showElement: false })
  }

  doRegister = () => {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.state.UserType == "0") {
      alert("Please select User Type.");
    }
    else if (this.state.Name == "") {
      alert("Please input Name.");
    }
    else if (this.state.Email == "") {
      alert("Please input Email id.");
    }
    else if (!regex.test(this.state.Email)) {
      alert("Please input valid Email id.");
    }
    else if (this.state.WhatsappNumber === "") {
      alert("Please input whatsapp number.");
    }
    else if (this.state.WhatsappNumber.length != 10) {
      alert("Please input correct whatsapp number.");
    }
    else if (this.state.password_tx == "") {
      alert("Please input password.");
    }
    else if (this.state.password_tx.length < 8) {
      alert("Password length should be more than 8");
    }
    else if (!this.state.password_tx.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      alert("Password must be contains lower, uppercase, number and two special characters!");
    }
    else if (!this.state.password_tx.match(/([0-9])/)) {
      alert("Password must be contains lower, uppercase, number and two special characters!");
    }

    else if (!this.state.password_tx.match(/(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/)) {
      alert("Password must be contains lower, uppercase, number and two special characters!");
    }
    else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ NAME_TX: this.state.Name, EMAIL_ID_TX: this.state.Email, USER_TYPE_ID: this.state.UserType, WHATSAPP_NO_TX: this.state.WhatsappNumber, PASSWORD_TX: genPassword(this.state.password_tx), RESELLER_ID: this.state.ResellerId })
      };
      const apiUrl = apiURL() +"register";
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((reqdata) => {
          if (reqdata.statcode === 200) {
            alert("Registerd successfully");
            this.props.history.push('/auth');
          }
          else { console.log(reqdata.statmsg); }
        });
    }
  };

  render() {
    let resellers = this.state.ResellerDropDown;
    let optionItems = resellers.map((Reseller) =>
      <option value={Reseller.ID}>{Reseller.NAME_TX}</option>
    );

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
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
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                Register
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup>
                    <select className="input-group" style={DropDown} onChange={(e) => { this.handleChange(e.target.value) }}>
                      <option value="0">Select User Type</option>
                      <option value="3">User</option>
                      <option value="2">Reseller</option>
                      <option value="4">Studio</option>
                    </select>
                  </InputGroup>
                </FormGroup>
                <FormGroup className={this.state.showElement ? "d-block" : "d-none"}>
                  <InputGroup>
                    <select className="input-group" style={DropDown} onChange={(e) => { this.setState({ ResellerId: e.target.value }) }}>
                      <option value="0">Select Reseller</option>
                      {optionItems}
                    </select>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" onChange={(e) => { this.setState({ Email: e.target.value }) }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Whatsapp Number" min="0" type="number" onChange={(e) => { this.setState({ WhatsappNumber: e.target.value }) }} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" onChange={(e) => { this.setState({ password_tx: e.target.value }) }} />
                  </InputGroup>
                </FormGroup>
                {/* <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div> */}
                {/* <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row> */}
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={() => this.doRegister()}>
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
