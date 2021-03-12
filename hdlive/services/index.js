
// new code ---------------------------------------
const express = require("express");
const app = express();
var cors = require('cors');

const bodyParser = require("body-parser");
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var routes = require("./api/routes/route");
global.pool = require("./api/config/config");

const util = require('./api/util/Util');
global.util = util;

const common = require("./api/controllers/common.controller");
global.common = common;

app.use(cors()).use("/api", routes);
app.listen(3020, () => console.log("Server is running on port number 3020"));

//const mySql=require("mysql");
// var mySqlConnection = mySql.createConnection({
//     host: 'localhost',
//     //host:'143.110.181.220',
//    // port:'8080',
//     ////user:'hdlive',
//     //password:'Saibaba@1',
//     user: 'root',
//     password: 'password',
//     database: 'employeedb',
//     //database: 'hdlive',
//     multipleStatements: true
// });

// mySqlConnection.connect((err) => {
//     if (!err)
//         console.log('DB Connection successed');
//     else
//         console.log('DB Connection failed \n error' + JSON.stringify(err, undefined, 2));
// });

// app.listen(3000, () => console.log("Server is running on port number 3000"));

// //First load page
// app.get("/", (req, res) => {
//     res.send("First load page");
// });

// //Get all employees
// app.get("/employees", (req, res) => {
//     mySqlConnection.query("select * from USER_T", (err, data, fields) => {
//         if (err) throw err;
//         res.send(data);
//     });
// });

// //Get an employee
// app.get("/employees/:id", (req, res) => {
//     mySqlConnection.query("select * from employee where EmpID=?", [req.params.id], (err, data, fields) => {
//         if (err) throw err;
//         res.send(data);
//     });
// });

// //Delete an employee
// app.delete("/employees/:id", (req, res) => {
//     mySqlConnection.query("Delete from employee where EmpID=?", [req.params.id], (err, data, fields) => {
//         if (err) throw err;
//         res.send("Data Deleted");
//     });
// });

// //Insert an employee
// app.post("/employees", (req, res) => {
//     let emp = req.body;
//     var sql = "Set @EmpID=?;Set @Name=?;Set @EmpCode=?;Set @Salary=?;\
//     CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary)";
//     mySqlConnection.query(sql, [emp.EmpId, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
//         if (err) throw err;
//         res.send("Record Inserted");
//     });
// });

// //Update an employee
// app.put("/employees", (req, res) => {
//     let emp = req.body;
//     var sql = "Set @EmpID=?;Set @Name=?;Set @EmpCode=?;Set @Salary=?;\
//     CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary)";
//     mySqlConnection.query(sql, [emp.EmpId, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
//         if (err) throw err;
//         res.send("Record Updated");
//     });
// });

// //Update an employee
// app.post("/users", (req, res) => {
//     // let emp = req.body;
//     // var sql = "Set @EmpID=?;Set @Name=?;Set @EmpCode=?;Set @Salary=?;\
//     // CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary)";
//     mySqlConnection.query("UPDATE USER_T SET UPDATED_DT=CURRENT_TIMESTAMP() WHERE ID = 1", (err, rows, fields) => {
//         if (err) throw err;
//         res.send("Record Updated");
//     });
// });
