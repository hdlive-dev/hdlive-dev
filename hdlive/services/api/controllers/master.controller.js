const mySql = require("mysql");
const express = require("express");
const app = express();

//For Get ReSeller
module.exports.GetReseller = function (req, res) {
    if (req.body) {
        pool.query('SELECT ID,NAME_TX FROM USER_REGISTERATION_T WHERE USER_TYPE_ID=2 AND ACTIVE_YN=1;', [req.body.ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("GetReseller");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    retObj.statcode = 200;
                    retObj.statmsg = "Success";
                    if (req.body.ID == 0) {
                        const def_Iv = "H8Ctcauy/4DhnYyfksuWkw==";
                        const def_Key = "0e+B7xdXE4I5p8mqAK9r2ejoAGlVx6Mkb2EuHNOoxkg=";
                        retObj.data = util.dataEncrypt(JSON.stringify(result), def_Iv, def_Key);
                        res.send(retObj);
                    }
                    else {
                        common.validateSession(req, res, result);
                    }
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                    res.send(retObj);
                }
            }
        });
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get State
module.exports.GetState = function (req, res) {
    if (req.body) {
        pool.query('SELECT ID,STATE_NAME_TX FROM STATE_T WHERE ACTIVE_YN=1 AND COUNTRY_ID=93 ORDER BY STATE_NAME_TX;', (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("GetState");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    common.validateSession(req, res, result);
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                    res.send(retObj);
                }
            }
        });
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}


//For Get City by State
module.exports.GetCityByState = function (req, res) {
    if (req.body) {
        pool.query('SELECT ID,CITY_NAME_TX FROM CITY_T WHERE ACTIVE_YN=1 AND COUNTRY_ID=93 AND STATE_ID=? ORDER BY CITY_NAME_TX;', [req.body.STATE_ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("GetCityByState");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    common.validateSession(req, res, result);
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                    res.send(retObj);
                }
            }
        });
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get City
module.exports.GetCity = function (req, res) {
    if (req.body) {
        pool.query('SELECT ID,CITY_NAME_TX FROM CITY_T WHERE ACTIVE_YN=1 AND COUNTRY_ID=93  ORDER BY CITY_NAME_TX;', (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("GetCity");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    common.validateSession(req, res, result);
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                    res.send(retObj);
                }
            }
        });
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get Box
module.exports.GetBox = function (req, res) {
    if (req.body) {
        pool.query('SELECT ID,BOX_NAME_TX FROM BOX_T WHERE ACTIVE_YN=1 ORDER BY ID;', (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("GetBox");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    common.validateSession(req, res, result);
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                    res.send(retObj);
                }
            }
        });
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}