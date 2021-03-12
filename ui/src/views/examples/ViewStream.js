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
        let stateapiUrl = apiURL() + "GetStreamlist";
        fetch(stateapiUrl, requestOptions)
            .then((response) => response.json())
            .then((reqdata) => {
                if (reqdata.statcode === 200) {
                    let apiData = {
                        data: JSON.stringify(reqdata.data),
                        iv: def_Iv,
                        key: def_Key
                    }
                    console.log(apiData);
                    var AfterapiData = JSON.parse(dataDecrypt(apiData));
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
                <td>{States.ID}</td>
                <td>{States.EVENT_TITLE_TX}</td>
                <td>{States.STREAM_DT}</td>
                <td>{States.NAME_TX}</td>
                <td>{States.STUDIO_NAME_TX}</td>
                <td>{States.PHONE_TX}</td>
                <td>{States.STATUS_TX}</td>
                <td><Link to={'/admin/addstream?id=' + States.ID}>Edit</Link></td>
                <td><Link to={'/admin/TextEditor?id=' + States.ID}>Edit Template</Link></td>
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
                                    <h3 className="mb-0">View Stream</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Event Title</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Client</th>
                                            <th scope="col">Organization</th>
                                            <th scope="col">Phone number</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Edit Template</th>
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
