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
      Id:0,
      PlanTypeId:0,
      UserType: "",
      PlanName: "",     
      StreamSize: "",
      PlanAmount: ""    
    }
  }
  
  componentDidMount()
  {
    let searchs=this.props.location.search;
    let queryparam=querystring.parse(searchs); 
    if(queryparam.id!=undefined)
    {
      this.setState({Id: queryparam.id});   
    let nextrequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: uid,PLAN_ID:queryparam.id })
    };
    let defdataapiUrl = apiURL() + "streamplanbyid";
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
          this.setState({ PlanTypeId: AfterapiData.PLAN_TYPE_ID });     
          this.setState({ UserType: AfterapiData.USER_TYPE_ID });
          this.setState({ PlanName: AfterapiData.PLAN_NAME_TX });
          this.setState({ PlanAmount: AfterapiData.AMOUNT });
          this.setState({ StreamSize: AfterapiData.STREAM_SIZE_NM });                  
        }
        else {
          alert(reqdata.statmsg);
        }
      });
    }

  }   

  doAddStreamPlan = () => {
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
          PLAN_ID:this.state.Id,PLAN_TYPE_ID:this.state.PlanTypeId,PLAN_NAME_TX:this.state.PlanName,AMOUNT:this.state.PlanAmount,
          STREAM_SIZE_NM:this.state.StreamSize,USER_TYPE_ID:this.state.UserType,
          CREATED_BY:localStorage.getItem("UID")
        })
      };
      const apiUrl = apiURL() + "addUpdateStreamPlan";
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((reqdata) => {
          if (reqdata.statcode === 200) {
            if(this.state.Id==0)
            {
             alert( "Plan created successfully");
            }
            else
            {
              alert( "Plan updated successfully");
            }
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
                      <h3 className="mb-0">Create Plan</h3>
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
                              htmlFor="input-Usertype"
                            >
                              Plan Type
                            </label>
                          <select className="input-group" style={DropDown} value={this.state.PlanTypeId} onChange={(e) => { this.setState({ PlanTypeId: e.target.value }) }}>
                            <option value="0">Select Plan Type</option>
                            <option value="1">Stream</option>
                            <option value="2">VOD</option>
                            <option value="3">Viewer</option>
                          </select>
                          </FormGroup>
                        </Col>
                        </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Usertype"
                            >
                              User Type
                            </label>
                          <select className="input-group" style={DropDown} value={this.state.UserType} onChange={(e) => { this.setState({ UserType: e.target.value }) }}>
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
                              htmlFor="input-gender"
                            >
                              Plan Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-time"
                              placeholder="Plan Name"
                              type="text"
                              value={this.state.PlanName}
                              onChange={(e) => { this.setState({ PlanName: e.target.value }) }}
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
                              Size
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-ipaddress"
                              placeholder="Size"
                              type="number"
                              value={this.state.StreamSize}
                              onChange={(e) => { this.setState({ StreamSize: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-app_pool"
                            >
                              Plan Amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-ipaddress"
                              placeholder="Plan Amount"
                              type="number"
                              value={this.state.PlanAmount}
                              onChange={(e) => { this.setState({ PlanAmount: e.target.value }) }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>                      
                    </div>
                  </Form>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <Button className="my-4" color="primary" type="button" onClick={() => this.doAddStreamPlan()} >
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
