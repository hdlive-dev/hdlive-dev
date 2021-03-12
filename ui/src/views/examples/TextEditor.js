import React, { Component } from 'react';
import GEditor from 'grapesjs-react';
//import 'grapesjs/dist/css/grapes.min.css';
import InnerHTML from 'dangerously-set-html-content';
//import React from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs/dist/grapes.min.js';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';


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
let uid = localStorage.getItem("UID");
let qid="0";
let queryparam =null;
const defdataapiUrl = apiURL() + "streambyid";
const defsaveapiUrl = apiURL() + "UpdateTemplateById";
const editor = () => grapesjs.init({
  container: '#gjs',
canvas: {},
allowScript: 1,
plugins: ['gjs-preset-webpage'],
storageManager: {
  type: 'remote',
  autoload: 1,
  urlLoad: defdataapiUrl,
  params: {
    
  },
  autoSave: 1,
  UrlStore: defsaveapiUrl,
  
  onResponse(text, clb) {
    let searchs = this.props.location.search;
    queryparam = querystring.parse(searchs);
    console.log("text");
    console.log(queryparam);
    const em = this.get('em');
    const complete = this.get('onComplete');
    const typeJson = this.get('contentTypeJson');
    const parsable = text && typeof text === 'string';
    //let restxt = typeJson && parsable ? JSON.parse(text) : text;
    let apiData = {
      data: JSON.stringify(text),
      iv: def_Iv,
      key: def_Key
    }
    var AfterapiData2 = JSON.parse(dataDecrypt(apiData));
    var AfterapiData = AfterapiData2[0];
    const res = { "edid":[typeJson && parsable ? JSON.parse(AfterapiData) : AfterapiData]};
    complete && complete(res);
    clb && clb(res);
    em && em.trigger('storage:response', res);
  }
}
});
class GEditorExample extends React.Component {
  constructor(props) {
    super(props); 
    let searchs = this.props.location.search;
    queryparam = querystring.parse(searchs);
    this.state = {
      Id: 0,
      Template_body: ""
    }
    this.setState({ Id: queryparam.id });
    qid=queryparam.id;
  }
  componentDidMount(){
    
    
    //console.log("qid" + qid);
    editor();
    //console.log(editor.storageManager);
  }
  componentWillUnmount() {
    editor('destroy');
  }

  onLoadHTML() {
    let nextrequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: uid, STREAM_ID: queryparam.id })
    };
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
          //this.GEditor.InnerHTML.html=this.state.Template_body;
        }
        else {
          alert(reqdata.statmsg);
        }
      });
  }
  doUpdateTemplate = () => {
    console.log(this.state.Template_body);
     const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         TEMPLATE_BODY_TX: this.state.Template_body.replace("'", "''"), ID: this.state.Id
       })
     };
     const apiUrl = apiURL() + "UpdateTemplateById";
     fetch(apiUrl, requestOptions)
       .then((response) => response.json())
       .then((reqdata) => {
         if (reqdata.statcode === 200) {
           alert("Template updated successfully");
         }
         else { console.log(reqdata.statmsg); }
    });
  };
  render() {    
    return (
      <Container>
        <GEditor id="gjs" blocks={[]} presetType="webpage" width="100%" height="600px" onChange={(e) => { this.setState({ Template_body: e.target.value }) }}>
          <iframe id="edid"></iframe>
          
        </GEditor>
        <Button className="my-4" color="primary" type="button" onClick={() => this.doUpdateTemplate()} >
          Update</Button>
      </Container>
    );
  }
}

export default GEditorExample;