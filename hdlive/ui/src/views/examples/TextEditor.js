import React, { Component } from 'react';
import GEditor from 'grapesjs-react';
import 'grapesjs/dist/css/grapes.min.css';
import InnerHTML from 'dangerously-set-html-content';
import querystring from 'query-string';
import { apiURL, dataDecrypt } from "util/Util.jsx";

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


// GEditor.defaultProps = {
//   presetType: 'webpage',
//   plugins: [],
//   blocks: [],
//   blockManager: {},
//   storageManager: {},
//   styleManager: {},
//   width: 'auto',
//   height: '100vh',
//   components: [],
// };

let def_Iv = localStorage.getItem("IVkey");
let def_Key = localStorage.getItem("SESSION_KEY");
const uid = localStorage.getItem("UID");

class GEditorExample extends Component {
  constructor() {
    super();

    this.state = {
      Id: 0,
      Template_body: ""
    }
  }
  componentDidMount() {
    let searchs = this.props.location.search;
    let queryparam = querystring.parse(searchs);
    this.setState({ Id: queryparam.id });

    let nextrequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: uid, STREAM_ID: queryparam.id })
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
          //alert(AfterapiData.TEMPLATE_BODY_TX);
          this.setState({ Template_body: AfterapiData.TEMPLATE_BODY_TX });
          this.GEditor.InnerHTML.html=this.state.Template_body;
        }
        else {
          alert(reqdata.statmsg);
        }
      });
  }
  doUpdateTemplate = () => {
    //console.log(this.state.Template_body);
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     TEMPLATE_BODY_TX: this.state.Template_body.replace("'", "''"), ID: this.state.Id
    //   })
    // };
    // const apiUrl = apiURL() + "UpdateTemplateById";
    // fetch(apiUrl, requestOptions)
    //   .then((response) => response.json())
    //   .then((reqdata) => {
    //     if (reqdata.statcode === 200) {
    //       alert("Template updated successfully");
    //     }
    //     else { console.log(reqdata.statmsg); }
    //   });
  };
  render() {    
    return (
      <Container>
        <GEditor id="geditor" blocks={[]} presetType="webpage" width="100%" height="600px" onChange={(e) => { this.setState({ Template_body: e.target.value }) }}>
          <InnerHTML html={this.state.Template_body} />
        </GEditor>
        <Button className="my-4" color="primary" type="button" onClick={() => this.doUpdateTemplate()} >
          Update</Button>
      </Container>
    );
  }
}

export default GEditorExample;