const mysql = require('mysql');
const config = {
	connectionLimit: 10,
    host: '143.110.181.220',
    user: 'hdlive',
    password: 'Saibaba@1',
    database: 'hdlivedev',
    // host: 'localhost',
    // user: 'root',
    // password: 'password',
    // database: 'employeedb',
    multipleStatements: true
};
module.exports = mysql.createPool(config);
