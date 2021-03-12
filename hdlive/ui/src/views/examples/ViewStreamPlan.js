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
    UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
let def_Iv = localStorage.getItem("IVkey");
let def_Key = localStorage.getItem("SESSION_KEY");

const uid = localStorage.getItem("UID");
class Tables extends React.Component {
    constructor() {
        super();
        this.state = {
            GridHeader: [],
            GridData: []
        }
    }

    componentDidMount() {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: uid })
        };
        let stateapiUrl = apiURL() + "GetStreamPlanlist";
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
                    console.log(AfterapiData);
                    this.setState({ GridData: AfterapiData });
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
                <td>{States.USER_TYPE_TX}</td>
                <td>{States.PLAN_NAME_TX}</td>
                <td>{States.STREAM_SIZE_NM}</td>
                <td>{States.AMOUNT}</td>  
                <td>{States.STATUS_TX}</td>                
                <td><Link to={"/admin/CreatestreamPlan?id="+States.ID}>Edit</Link></td>
                <td>Delete</td>
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
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">View Stream Plans</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Plan Type</th>
                                            <th scope="col">User Type</th>
                                            <th scope="col">Plan Name</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Plan Amount</th>
                                            <th scope="col">Status</th>                                            
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
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
