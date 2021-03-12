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
      showElement: false,
      Urltitle: "",
      Eventtitle: "",
      AdvTxt: "",
      EventDate: "",
      EventTime: "",
      Venue: "",
      TemplateDropDown: [],
      IPAddress: "",
      App_Pool_Id: "",
      Code: "",
      IsYoutubelink: false,
      Youtubelinktxt: "",
      Templateid: 0,
      IsVod: false,
      ChatCode: "",
      files1: "",
      files2: "",
      files3: "",
      filename1: "",
      filename2: "",
      filename3: "",
      Id:0
    }
  }
  componentDidMount()
  {
    let searchs=this.props.location.search;
    let queryparam=querystring.parse(searchs);       
    this.setState({Id: queryparam.id});   

    let nextrequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: uid,STREAM_ID:queryparam.id })
    };
    let defdataapiUrl = apiURL() + "streambyid";
    fetch(defdataapiUrl, nextrequestOptions)
      .then((response) => response.json())
      .then((reqdata) => {
        if (reqdata.statcode === 200) {
          let apiData = {
            data: JSON.stringify(reqdata.data),
            iv: def_Iv,
            key: def_Key
          }
          var AfterapiData2 = JSON.parse(dataDecrypt(apiData));
          var AfterapiData = AfterapiData2[0];
          
          this.setState({ Urltitle: AfterapiData.URL_TITLE_TX });
          this.setState({ Eventtitle: AfterapiData.EVENT_TITLE_TX });
          this.setState({ AdvTxt: AfterapiData.ADV_TEXT_TX });
          this.setState({ EventDate: AfterapiData.STREAM_DT });
          this.setState({ EventTime: AfterapiData.STREAM_TIME });
          this.setState({ Venue: AfterapiData.VENUE_TX });
          this.setState({ IPAddress: AfterapiData.IP_ADDRESS_TX });
          this.setState({ App_Pool_Id: AfterapiData.APPLICATION_POOL });
          this.setState({ Code: AfterapiData.CODE_TX });
          this.setState({ IsYoutubelink: AfterapiData.YOUTUBE_YN });          
          if (AfterapiData.YOUTUBE_YN == "1") {
            this.setState({ showElement: true })
          }
          else {
            this.setState({ showElement: false })
          }
          this.setState({ Youtubelinktxt: AfterapiData.YOUTUBE_LINK_TX });
          this.setState({ Templateid: AfterapiData.TEMPLATE_ID });
          this.setState({ IsVod: AfterapiData.VOD_YN });
          this.setState({ ChatCode: AfterapiData.CHAT_CODE_TX });          
        }
        else {
          alert(reqdata.statmsg);
        }
      });

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

  CheckYoutube = (value) => {
    this.setState({ IsYoutubelink: value });
    if (value == "1") {
      this.setState({ showElement: true })
    }
    else {
      this.setState({ showElement: false })
    }
  }

  CheckURLExists = (value) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: localStorage.getItem("UID"), URLTITLE: value })
    };
    let stateapiUrl = apiURL() + "CheckURL";
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
          let URLexists = AfterapiData[0].URLexists;
          if (URLexists == "1") {
            this.setState({ Urltitle: "" });
            alert("URL Title already exists, please check another URL Title");
          }
        }
        else {
          alert(reqdata.statmsg);
        }
      });

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
          URL_TITLE_TX: this.state.Urltitle, EVENT_TITLE_TX: this.state.Eventtitle,
          USER_REG_ID: localStorage.getItem("UID"), ADV_TEXT_TX: this.state.AdvTxt, STREAM_DATE_DT: this.state.EventDate,
          STREAM_TIME: this.state.EventTime, VENUE_TX: this.state.Venue, IP_ADDRESS_TX: this.state.IPAddress,
          APP_POOL: this.state.App_Pool_Id, CODE_TX: this.state.Code, YOUTUBE_YN: this.state.IsYoutubelink,
          TEMPLATE_ID: this.state.Templateid, VOD_YN: this.state.IsVod, CHAT_CODE_TX: this.state.ChatCode,
          IMAGE_NAME_TX: this.state.filename1, FULL_PATH_TX: "", STREAM_ID: this.state.Id, STREAM_IMAGE_BYT: this.state.files1,
          IMAGE_NAME2_TX: this.state.filename2, STREAM_IMAGE2_BYT: this.state.files2,
          IMAGE_NAME3_TX: this.state.filename3, STREAM_IMAGE3_BYT: this.state.files3
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
                      <h3 className="mb-0">Update Stream</h3>
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
                              htmlFor="input-gender"
                            >
                              URL Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-urltitle"
                              placeholder="Enter URL Title"
                              type="text"
                              onChange={(e) => { this.setState({ Urltitle: e.target.value }) }}
                              onBlur={(e) => { this.CheckURLExists(e.target.value) }}
                              value={this.state.Urltitle}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Event-Title"
                            >
                              Event Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-Event-Title"
                              placeholder="Enter Event Title"
                              type="text"
                              onChange={(e) => { this.setState({ Eventtitle: e.target.value }) }}
                              value={this.state.Eventtitle}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Advtext"
                            >
                              Adv Text
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-Advtext"
                              placeholder="Enter Adv Text"
                              type="text"
                              value={this.state.AdvTxt}
                              onChange={(e) => { this.setState({ AdvTxt: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
                              type="text"
                              onFocus={
                                (e)=>{e.currentTarget.type = "date";}
                              }
                              onBlur={
                                (e)=>{e.currentTarget.type = "text";e.currentTarget.placeholder = "dd/MM/yyyy";}
                              }
                              value={this.state.EventDate}
                              onChange={(e) => { this.setState({ EventDate: e.target.value }) }}
                              disabled
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
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-venue"
                            >
                              Venue
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-venue"
                              placeholder="Enter Venue"
                              type="text"
                              value={this.state.Venue}
                              onChange={(e) => { this.setState({ Venue: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
                              disabled
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
                            <select disabled className="input-group" value={this.state.App_Pool_Id} style={DropDown} onChange={(e) => { this.handleChangeAppPool(e.target.value) }}>
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
                            <Button className="my-4" color="basic" type="button" onClick={() => { navigator.clipboard.writeText(this.state.Code); }} >
                              Copy Code
                          </Button>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-vod"
                            >
                              Vod
                            </label>

                            <label style={{ paddingLeft: 40 }}>
                              <input type="radio" className="input-group" name="ISVOD" value="1" checked={this.state.IsVod!=null && this.state.IsVod==1} onChange={(e) => { this.setState({ IsVod: e.target.value }) }}></input>
                              <span>Yes</span>
                            </label>
                            <label style={{ paddingLeft: 20 }}>
                              <input type="radio" className="input-group" name="ISVOD" value="0" checked={this.state.IsVod==null || this.state.IsVod!=1} onChange={(e) => { this.setState({ IsVod: e.target.value }) }}></input>
                              <span>No</span>
                            </label>
                          </FormGroup>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-template"
                            >
                              Template
                            </label>
                            <select className="input-group" value={this.state.Templateid} style={DropDown} onChange={(e) => { this.setState({ Templateid: e.target.value }) }}>
                              <option value="0">Select Template</option>
                              <option value="1">Template 1</option>
                              <option value="2">Template 2</option>
                              <option value="3">Template 3</option>
                            </select>
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
