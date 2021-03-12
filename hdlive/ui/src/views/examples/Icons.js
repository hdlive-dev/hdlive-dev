import React from "react";
import { dataDecrypt, apiURL } from "util/Util.jsx";

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
let def_Iv = localStorage.getItem("IVkey");
let def_Key = localStorage.getItem("SESSION_KEY");

const uid = localStorage.getItem("UID");
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      StateDropDown: [],
      CityDropDown: [],
      Name_Tx: "",
      Email: "",
      UserTypeId: 0,
      Whatsapp: "",
      Age: 0,
      Gender: 0,
      Address: "",
      State_Id: 0,
      City_Id: 0,
      PinCode: "",
      Studio: "",
      ResellerDropDown: [],
      BoxDropDown: [],
      Box_Id: 0,
      Reseller_Id: 0,
      Website: "",
      IPAddress: "",
      Code: "",
      Amount: 0,
      ChatCode: ""
    }
  }
  componentDidMount() {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: uid })
    };
    let stateapiUrl = apiURL() + "GetState";
    fetch(stateapiUrl, requestOptions)
      .then((response) => response.json())
      .then((reqdata) => {
        if (reqdata.statcode === 200) {
          let apiData = {
            data: JSON.stringify(reqdata.data),
            iv: def_Iv,
            key: def_Key
          }
          var AfterapiData = JSON.parse(dataDecrypt(apiData));
          this.setState({ StateDropDown: AfterapiData });
        }
        else {
          alert(reqdata.statmsg);
        }
      });

    let citymasterapiUrl = apiURL() + "GetCity";
    fetch(citymasterapiUrl, requestOptions)
      .then((response) => response.json())
      .then((reqdata) => {
        if (reqdata.statcode === 200) {
          let apiData = {
            data: JSON.stringify(reqdata.data),
            iv: def_Iv,
            key: def_Key
          }
          var AfterapiData = JSON.parse(dataDecrypt(apiData));
          this.setState({ CityDropDown: AfterapiData });
        }
        else {
          alert(reqdata.statmsg);
        }
      });

    let boxmasterapiUrl = apiURL() + "GetBox";
    fetch(boxmasterapiUrl, requestOptions)
      .then((response) => response.json())
      .then((reqdata) => {
        if (reqdata.statcode === 200) {
          let apiData = {
            data: JSON.stringify(reqdata.data),
            iv: def_Iv,
            key: def_Key
          }
          var AfterapiData = JSON.parse(dataDecrypt(apiData));
          this.setState({ BoxDropDown: AfterapiData });
        }
        else {
          alert(reqdata.statmsg);
        }
      });

    let resellerapiUrl = apiURL() + "GetSeller";
    fetch(resellerapiUrl, requestOptions)
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

    // let nextrequestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ID: uid })
    // };
    // let defdataapiUrl = 'http://localhost:3020/api/reguserbyid';
    // fetch(defdataapiUrl, nextrequestOptions)
    //   .then((response) => response.json())
    //   .then((reqdata) => {
    //     if (reqdata.statcode === 200) {
    //       let apiData = {
    //         data: JSON.stringify(reqdata.data),
    //         iv: def_Iv,
    //         key: def_Key
    //       }
    //       var AfterapiData2 = JSON.parse(dataDecrypt(apiData));
    //       var AfterapiData = AfterapiData2[0];
    //       this.setState({ Name_Tx: AfterapiData.NAME_TX });
    //       this.setState({ Email: AfterapiData.EMAIL_ID_TX });
    //       this.setState({ Whatsapp: AfterapiData.WHATSAPP_NO_TX });
    //       this.setState({ Age: AfterapiData.AGE_NM });
    //       this.setState({ Gender: AfterapiData.GENDER_NM });
    //       this.setState({ Address: AfterapiData.ADDRESS_TX });
    //       this.setState({ State_Id: AfterapiData.STATE_ID });
    //       this.setState({ City_Id: AfterapiData.CITY_ID });
    //       this.setState({ PinCode: AfterapiData.POSTAL_CODE_TX });
    //       this.setState({ Studio: AfterapiData.STUDIO_NAME_TX });
    //       this.setState({ ResellerName: AfterapiData.RESELLER_NAME_TX });
    //     }
    //     else {
    //       alert(reqdata.statmsg);
    //     }
    //   });
  }

  handleChangeStates = (value) => {
    this.setState({ State_Id: value })
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ STATE_ID: value, ID: uid })
    };
    let stateapiUrl = apiURL() + "GetCityByState";
    fetch(stateapiUrl, requestOptions)
      .then((response) => response.json())
      .then((reqdata) => {
        if (reqdata.statcode === 200) {
          let apiData = {
            data: JSON.stringify(reqdata.data),
            iv: def_Iv,
            key: def_Key
          }
          var AfterapiData = JSON.parse(dataDecrypt(apiData));
          this.setState({ CityDropDown: AfterapiData });
        }
        else {
          alert(reqdata.statmsg);
        }
      });
  }

  doAddReseller = () => {
    if (this.state.Name_Tx == "") {
      alert("Please input Name");
    }
    // else if (this.state.Name == "") {
    //   alert("Please input Name.");
    // }
    // else if (this.state.Email == "") {
    //   alert("Please input Email id.");
    // }
    // else if (!regex.test(this.state.Email)) {
    //   alert("Please input valid Email id.");
    // }
    // else if (this.state.WhatsappNumber === "") {
    //   alert("Please input whatsapp number.");
    // }
    // else if (this.state.WhatsappNumber.length != 10) {
    //   alert("Please input correct whatsapp number.");
    // }
    // else if (this.state.password_tx == "") {
    //   alert("Please input password.");
    // }
    // else if (this.state.password_tx.length < 8) {
    //   alert("Password length should be more than 8");
    // }
    // else if (!this.state.password_tx.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    //   alert("Password must be contains lower, uppercase, number and two special characters!");
    // }
    // else if (!this.state.password_tx.match(/([0-9])/)) {
    //   alert("Password must be contains lower, uppercase, number and two special characters!");
    // }

    // else if (!this.state.password_tx.match(/(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/)) {
    //   alert("Password must be contains lower, uppercase, number and two special characters!");
    // }
    else {
      const updterequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NAME_TX: this.state.Name_Tx, STUDIO_NAME_TX: this.state.Studio, EMAIL_ID_TX: this.state.Email,
          USER_TYPE_ID: this.state.UserTypeId, WHATSAPP_NO_TX: this.state.Whatsapp, RESELLER_ID: this.state.Reseller_Id,
          GENDER_NM: this.state.Gender, AGE_NM: this.state.Age, ADDRESS_TX: this.state.Address,
          STATE_ID: this.state.State_Id, CITY_ID: this.state.City_Id, POSTAL_CODE_TX: this.state.PinCode,
          PASSWORD_TX: 'fa83b5cfd0546a3a9ef7ca06ec73c78d', WEBSITE_TX: this.state.Website,
          IP_ADDRESS_TX: this.state.IPAddress, CODE_TX: this.state.Code, AMOUNT: this.state.Amount,
          BOX_NM: this.state.Box_Id, CHAT_CODE_TX: this.state.ChatCode
        })
      };
      const updateapiUrl = apiURL() + "addReseller";
      fetch(updateapiUrl, updterequestOptions)
        .then((response) => response.json())
        .then((reqdata) => {
          if (reqdata.statcode === 200) {
            alert("Inserted successfully");
          }
          else { console.log(reqdata.statmsg); }
        });
    }
  };


  render() {
    let staetsss = this.state.StateDropDown;
    let optionStateItems = staetsss.map((States) =>
      <option value={States.ID}>{States.STATE_NAME_TX}</option>
    );
    let citiesss = this.state.CityDropDown;
    let optionCityItems = citiesss.map((City) =>
      <option value={City.ID}>{City.CITY_NAME_TX}</option>
    );
    let Boxess = this.state.BoxDropDown;
    let optionBoxItems = Boxess.map((box) =>
      <option value={box.ID}>{box.BOX_NAME_TX}</option>
    );
    let Resellers = this.state.ResellerDropDown;
    let optionResellerItems = Resellers.map((reseller) =>
      <option value={reseller.ID}>{reseller.NAME_TX}</option>
    );

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="10">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add Reseller / User</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-gender"
                            >
                              User Type
                            </label>
                            <select className="input-group" style={DropDown} onChange={(e) => { this.setState({ UserTypeId: e.target.value }) }}>
                              <option value="0">Select User Type</option>
                              <option value="3">User</option>
                              <option value="2">Reseller</option>
                              <option value="4">Studio</option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              placeholder="Name: john Doe"
                              type="text"
                              onChange={(e) => { this.setState({ Name_Tx: e.target.value }) }}
                              value={this.state.Name_Tx}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Whatsapp No.
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="9999999999"
                              type="number"
                              value={this.state.Whatsapp}
                              onChange={(e) => { this.setState({ Whatsapp: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Age
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="30"
                              type="number"
                              value={this.state.Age}
                              onChange={(e) => { this.setState({ Age: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-gender"
                            >
                              Gender
                            </label>
                            <select className="input-group" value={this.state.Gender} style={DropDown} onChange={(e) => { this.setState({ Gender: e.target.value }) }}>
                              <option value="0">Select Gender</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                              <option value="3">Transgender</option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Email Id
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Email Id: john@gmail.com"
                              type="text"
                              value={this.state.Email}
                              onChange={(e) => { this.setState({ Email: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              value={this.state.Address}
                              onChange={(e) => { this.setState({ Address: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="India"
                              id="input-country"
                              placeholder="Country"
                              type="text" disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              State
                            </label>
                            <select className="input-group" value={this.state.State_Id} style={DropDown} onChange={(e) => { this.handleChangeStates(e.target.value) }}>
                              <option value="0">Select State</option>
                              {optionStateItems}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              City
                            </label>
                            <select className="input-group" value={this.state.City_Id} style={DropDown} onChange={(e) => { this.setState({ City_Id: e.target.value }) }}>
                              <option value="0">Select City</option>
                              {optionCityItems}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                              value={this.state.PinCode}
                              onChange={(e) => { this.setState({ PinCode: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Official Information</h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Studio Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-studio-name"
                              placeholder="Studio Name: john Studio"
                              type="text"
                              value={this.state.Studio}
                              onChange={(e) => { this.setState({ Studio: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-reseller-name"
                            >
                              Reseller
                            </label>
                            <select className="input-group" value={this.state.Reseller_Id} style={DropDown} onChange={(e) => { this.setState({ Reseller_Id: e.target.value }) }}>
                              <option value="0">Select Reseller</option>
                              {optionResellerItems}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Website
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-website-name"
                              placeholder="Website: www.google.com"
                              type="text"
                              value={this.state.Website}
                              onChange={(e) => { this.setState({ Website: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Other information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-gender"
                            >
                              IP Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-IP-Address"
                              placeholder="IP Address: 192.168.1.1"
                              type="text"
                              onChange={(e) => { this.setState({ IPAddress: e.target.value }) }}
                              value={this.state.IPAddress}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-code"
                              placeholder="Code: john Doe"
                              type="text"
                              onChange={(e) => { this.setState({ Code: e.target.value }) }}
                              value={this.state.Code}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-amount"
                              placeholder="Amount: 50000.00"
                              type="number"
                              value={this.state.Amount}
                              onChange={(e) => { this.setState({ Amount: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Box
                            </label>
                            <select className="input-group" value={this.state.Box_Id} style={DropDown} onChange={(e) => { this.setState({ Box_Id: e.target.value }) }}>
                              <option value="0">Select Box</option>
                              {optionBoxItems}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Chat code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-chat-code"
                              placeholder="Chat Code"
                              type="textarea" rows="5"
                              value={this.state.ChatCode}
                              onChange={(e) => { this.setState({ ChatCode: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <Button className="my-4" color="primary" type="button" onClick={() => this.doAddReseller()} >
                          Add
                   </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
