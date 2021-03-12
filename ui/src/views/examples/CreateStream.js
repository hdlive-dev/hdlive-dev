import React from "react";
import { dataDecrypt, apiURL } from "util/Util.jsx";
import moment from "moment";
import FileBase64 from 'react-file-base64';

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
  Col,
  Radio
} from "reactstrap";
// core components
import UserHeader from "components/Headers/Header.js";
import querystring from 'query-string'


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
      EventDate: "",
      EventTime: "",     
      IPAddress: "",
      App_Pool_Id: "",
      Code: "",      
    }
  }
  getFiles1(files) {
    this.setState({ files1: files[0].base64 })
    this.setState({ filename1: files[0].name })
  }
  getFiles2(files) {
    this.setState({ files2: files[0].base64 })
    this.setState({ filename2: files[0].name })
  }
  getFiles3(files) {
    this.setState({ files3: files[0].base64 })
    this.setState({ filename3: files[0].name })
  }

  handleChangeAppPool = (value) => {
    this.setState({ App_Pool_Id: value });
    let stream_code = "";
    stream_code = value + "-" + localStorage.getItem("USER_NAME_TX") + "-" + moment().format("DDMMYYYY") + "-" + moment().format("hhmm");
    this.setState({ Code: stream_code });
  }

  doAddStream = () => {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.state.UserType == "0") {
      alert("Please select User Type.");
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
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          URL_TITLE_TX: "", EVENT_TITLE_TX: "",
          USER_REG_ID: localStorage.getItem("UID"), ADV_TEXT_TX: "", STREAM_DATE_DT: this.state.EventDate,
          STREAM_TIME: this.state.EventTime, VENUE_TX: "", IP_ADDRESS_TX: this.state.IPAddress,
          APP_POOL: this.state.App_Pool_Id, CODE_TX: this.state.Code, YOUTUBE_YN: 0,
          TEMPLATE_ID: 0, VOD_YN: 0, CHAT_CODE_TX: "",
          IMAGE_NAME_TX: "", FULL_PATH_TX: "", STREAM_ID: 0, STREAM_IMAGE_BYT: "",
          IMAGE_NAME2_TX: "", STREAM_IMAGE2_BYT: "",
          IMAGE_NAME3_TX: "", STREAM_IMAGE3_BYT: ""
        })
      };
      const apiUrl = apiURL() + "addUpdateStream";
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((reqdata) => {
          if (reqdata.statcode === 200) {
            alert( "Stream updated successfully");
          }
          else { console.log(reqdata.statmsg); }
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
            <Col className="order-xl-1" xl="10">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Create Stream</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-eventDate"
                            >
                              Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-Date"
                              placeholder="dd/MM/yyyy"
                              type="Date"
                              value={this.state.EventDate}
                              onChange={(e) => { this.setState({ EventDate: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-gender"
                            >
                              Time
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-time"
                              placeholder="hh:mm"
                              type="Time"
                              value={this.state.EventTime}
                              onChange={(e) => { this.setState({ EventTime: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">                     
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ipaddress"
                            >
                              Server Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-ipaddress"
                              placeholder="Server Address"
                              type="text"
                              value={this.state.IPAddress}
                              onChange={(e) => { this.setState({ IPAddress: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-app_pool"
                            >
                              Application Pool
                            </label>
                            <select className="input-group" value={this.state.App_Pool_Id} style={DropDown} onChange={(e) => { this.handleChangeAppPool(e.target.value) }}>
                              <option value="">Select Application Pool</option>
                              <option value="Live">Live</option>
                              <option value="UAT">UAT</option>
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Stream Code"
                              type="text"
                              value={this.state.Code}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Button className="my-4" color="basic" type="button" onClick={() => { navigator.clipboard.writeText(this.state.Code) }} >
                              Copy Code
                          </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
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
                      </Row> */}
                    </div>
                  </Form>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <Button className="my-4" color="primary" type="button" onClick={() => this.doAddStream()} >
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
