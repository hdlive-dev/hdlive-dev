const mySql = require("mysql");
const express = require("express");
const app = express();

//For Login
module.exports.loginUser = function (req, res) {
    if (req.body) {
        pool.query('SELECT * FROM USER_T WHERE LOGIN_ID=? and LOGIN_PWD_TX=? and USER_TYPE_ID=?', [req.body.loginid, req.body.userpassword, req.body.UserTypeId], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("loginUser");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    retObj.statcode = 200;
                    retObj.statmsg = "Success";
                    //console.log(JSON.stringify(result).toString());
                    const def_Iv = "H8Ctcauy/4DhnYyfksuWkw==";
                    const def_Key = "0e+B7xdXE4I5p8mqAK9r2ejoAGlVx6Mkb2EuHNOoxkg=";
                    var d = result[0];
                    d.SESSION_KEY = util.getDynamicKey();
                    d.UPDATED_DT = new Date();
                    const Iv = util.getDynamicIV();
                    d.USER_ID = Iv;
                    common.updateSession(d.LOGIN_ID, d.SESSION_KEY, d.UPDATED_DT, Iv);
                    retObj.data = util.dataEncrypt(JSON.stringify(d), def_Iv, def_Key);
                    res.send(retObj);
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

//For Register
module.exports.registerUser = function (req, res) {
    if (req.body) {
        let reg = req.body;
        var sql = "Set @NAME_TX=?;Set @EMAIL_ID_TX=?;Set @USER_TYPE_ID=?;Set @WHATSAPP_NO_TX=?;Set @PASSWORD_TX=?;Set @RESELLER_ID=?; CALL USP_UserRegisteration(@NAME_TX,@EMAIL_ID_TX,@USER_TYPE_ID,@WHATSAPP_NO_TX,@PASSWORD_TX,@RESELLER_ID)";
        pool.query(sql, [reg.NAME_TX, reg.EMAIL_ID_TX, reg.USER_TYPE_ID, reg.WHATSAPP_NO_TX, reg.PASSWORD_TX, reg.RESELLER_ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("registerUser");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    if (result[6][0].MSG === 1) {
                        retObj.statcode = 200;
                        retObj.statmsg = "Success";
                    }
                    else {
                        retObj.statcode = 102;
                        retObj.statmsg = "Already exists";
                    }
                    res.send(retObj);
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "Record not inserted";
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

//Change password
module.exports.changePassword = function (req, res) {
    if (req.body) {
        pool.query('UPDATE USER_T SET LOGIN_PWD_TX=?, UPDATED_DT=CURRENT_TIMESTAMP() WHERE ID=?', [req.body.userpassword, req.body.ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log("changePassword");
		        console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                retObj.statcode = 200;
                retObj.statmsg = "Success";
                res.send(retObj);
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
