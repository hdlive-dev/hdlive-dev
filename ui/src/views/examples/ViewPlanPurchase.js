import React from "react";
import { dataDecrypt, apiURL } from "util/Util.jsx";
import { Link } from "react-router-dom";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    Col,
    FormGroup,    
    UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
let def_Iv = localStorage.getItem("IVkey");
let def_Key = localStorage.getItem("SESSION_KEY");

const uid = localStorage.getItem("UID");

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

class Tables extends React.Component {
    constructor() {
        super();
        this.state = {
            PlanTypeId:0,
            GridHeader: [],
            GridData: []
        }
    }

    componentDidMount() {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: uid, PLAN_TYPE_ID:this.state.PlanTypeId })
        };
        let stateapiUrl = apiURL() + "GetPurchasePlanlist";
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
                    //console.log(AfterapiData[0]);
                    this.setState({ GridData: AfterapiData[0] });
                }
                else {
                    alert(reqdata.statmsg);
                }
            });

    }

    handleChangePlanType = (value) => {
        this.setState({ PlanTypeId: value });
        let requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: uid, PLAN_TYPE_ID:value })
        };        
        let stateapiUrl1 = apiURL() + "GetPurchasePlanlist";
        fetch(stateapiUrl1, requestOptions1)
            .then((response) => response.json())
            .then((reqdata) => {
                if (reqdata.statcode === 200) {
                    this.setState({ GridData:[] });
                    let apiData = {
                        data: JSON.stringify(reqdata.data),
                        iv: def_Iv,
                        key: def_Key
                    }
                    
                    var AfterapiData = JSON.parse(dataDecrypt(apiData));
                    //console.log(AfterapiData);
                    this.setState({ GridData: AfterapiData[0] });
                }
                else {
                    alert(reqdata.statmsg);
                }
            });
      }

    render() {
        let staetsss = this.state.GridData;
        //console.log(staetsss); 
      
        let trdata = staetsss.map((States) =>
       
            <tr>  
                <td>{States.PLAN_TYPE_NAME_TX}</td>                              
                <td>{States.PLAN_NAME_TX}</td>
                <td>{States.STREAM_SIZE_NM}</td>
                <td>{States.AMOUNT}</td>                                 
                <td><Link to={"/admin/PurchasePlan?id="+States.ID}>Clich Here To Purchase</Link></td>                
            </tr>
        );
        //console.log(trdata); 
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Usertype"
                            >
                              Plan Type
                            </label>
                          <select className="input-group" style={DropDown} value={this.state.PlanTypeId} onChange={(e) => { this.handleChangePlanType(e.target.value) }}>
                            <option value="0">Select Plan Type</option>
                            <option value="1">Stream</option>
                            <option value="2">VOD</option>
                            <option value="3">Viewer</option>
                          </select>
                          </FormGroup>
                        </Col>
                        </Row>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">View Plans To Purchase</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Plan Type</th>                                            
                                            <th scope="col">Plan Name</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Plan Amount</th>                                                                                      
                                            <th scope="col">Purchase</th>                                            
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {trdata}
                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Tables;
