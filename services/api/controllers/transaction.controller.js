const mySql = require("mysql");
const express = require("express");
const app = express();

//For Get Registered User by ID
module.exports.GetRegUserById = function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT *,(SELECT NAME_TX FROM USER_REGISTERATION_T WHERE ACTIVE_YN=1 AND ID=A.RESELLER_ID) AS RESELLER_NAME_TX FROM USER_REGISTERATION_T AS A WHERE A.USER_ID=? AND A.ACTIVE_YN=1', [req.body.ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("GetRegUserById");
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
	}catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For update profile by ID
module.exports.UpdateUserById = function (req, res) {
    if (req.body) {
	    try{
        pool.query('UPDATE USER_REGISTERATION_T SET NAME_TX=?,STUDIO_NAME_TX=?,WHATSAPP_NO_TX=?,GENDER_NM=?,AGE_NM=?,ADDRESS_TX=?,STATE_ID=?,CITY_ID=?,POSTAL_CODE_TX=?,UPDATED_DT=CURRENT_TIMESTAMP(),COUNTRY_ID=93 WHERE USER_ID=?', [req.body.Name_Tx, req.body.Studio, req.body.Whatsapp, req.body.Gender, req.body.Age, req.body.Address, req.body.StateId, req.body.CityId, req.body.PinCode, req.body.Id], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("UpdateUserById");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                retObj.statcode = 200;
                retObj.statmsg = "Success";
                res.send(retObj);
            }
        });
	}catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For AddReseller
module.exports.addReseller = function (req, res) {
    if (req.body) {
        let reg = req.body;
	    try{
        var sql = "Set @NAME_TX=?;SET @STUDIO_NAME_TX=?;Set @EMAIL_ID_TX=?;Set @USER_TYPE_ID=?;Set @WHATSAPP_NO_TX=?;Set @RESELLER_ID=?;Set @GENDER_NM=?;Set @AGE_NM=?;Set @ADDRESS_TX=?; Set @STATE_ID=?;Set @CITY_ID=?;Set @POSTAL_CODE_TX=?;Set @PASSWORD_TX=?;Set @WEBSITE_TX=?;Set @IP_ADDRESS_TX=?;Set @CODE_TX=?;Set @AMOUNT=?;Set @BOX_NM=?;Set @CHAT_CODE_TX=?; CALL USP_AddReseller(@NAME_TX,@STUDIO_NAME_TX,@EMAIL_ID_TX,@USER_TYPE_ID,@WHATSAPP_NO_TX,@RESELLER_ID,@GENDER_NM,@AGE_NM,@ADDRESS_TX, @STATE_ID,@CITY_ID,@POSTAL_CODE_TX,@PASSWORD_TX,@WEBSITE_TX,@IP_ADDRESS_TX,@CODE_TX,@AMOUNT,@BOX_NM,@CHAT_CODE_TX)";
        pool.query(sql, [reg.NAME_TX, reg.STUDIO_NAME_TX, reg.EMAIL_ID_TX, reg.USER_TYPE_ID, reg.WHATSAPP_NO_TX, reg.RESELLER_ID, reg.GENDER_NM, reg.AGE_NM, reg.ADDRESS_TX,
        reg.STATE_ID, reg.CITY_ID, reg.POSTAL_CODE_TX, reg.PASSWORD_TX, reg.WEBSITE_TX, reg.IP_ADDRESS_TX, reg.CODE_TX, reg.AMOUNT, reg.BOX_NM, reg.CHAT_CODE_TX], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("addReseller");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    if (result[19][0].MSG === 1) {
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
	}catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get Registered User /Reseller list
module.exports.GetUserlist = function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT *,(SELECT NAME_TX FROM USER_REGISTERATION_T WHERE ACTIVE_YN=1 AND ID=A.RESELLER_ID) AS RESELLER_NAME_TX, CASE WHEN A.ACTIVE_YN=1 THEN "Active" ELSE "Inactive" end STATUS_TX, CASE WHEN A.USER_TYPE_ID=1 THEN "Admin" WHEN A.USER_TYPE_ID=2 THEN "Reseller" WHEN A.USER_TYPE_ID=3 THEN "User" END USER_TYPE_TX FROM USER_REGISTERATION_T AS A ', null, (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("GetUserlist");
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
	}catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get Streams list
module.exports.GetStreamlist = function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT S.*,CASE WHEN S.ACTIVE_YN=1 THEN "Active" ELSE "Inactive" end STATUS_TX,IFNULL(UR.STUDIO_NAME_TX,"") AS STUDIO_NAME_TX, IFNULL(UR.NAME_TX,"Admin") AS NAME_TX,IFNULL(UR.WHATSAPP_NO_TX,"") AS PHONE_TX,DATE_FORMAT(STREAM_DATE_DT,"%d/%m/%Y") AS STREAM_DT  FROM STREAM_T S INNER JOIN USER_T U ON U.ID=S.USER_REG_ID LEFT JOIN USER_REGISTERATION_T UR ON UR.USER_ID=U.ID  ', [req.body.ID],  (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("GetStreamlist");
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
	}catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get Streams list
module.exports.streambyid = function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT S.*,CASE WHEN S.ACTIVE_YN=1 THEN "Active" ELSE "Inactive" end STATUS_TX,IFNULL(UR.STUDIO_NAME_TX,"") AS STUDIO_NAME_TX, IFNULL(UR.NAME_TX,"Admin") AS NAME_TX,IFNULL(UR.WHATSAPP_NO_TX,"") AS PHONE_TX,DATE_FORMAT(STREAM_DATE_DT,"%d/%m/%Y") AS STREAM_DT  FROM STREAM_T S INNER JOIN USER_T U ON U.ID=S.USER_REG_ID LEFT JOIN USER_REGISTERATION_T UR ON UR.USER_ID=U.ID WHERE S.ID=? ', [req.body.STREAM_ID],  (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("streambyid");
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
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

module.exports.CheckURL = function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT COUNT(URL_TITLE_TX) AS URLexists FROM STREAM_T WHERE URL_TITLE_TX=?;  ', [req.body.URLTITLE,req.body.ID],  (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("CheckURL");
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
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For AddReseller
module.exports.addUpdateStream = function (req, res) {
    if (req.body) {
	    try{
        let reg = req.body;
        var sql = "Set @URL_TITLE_TX=?;SET @EVENT_TITLE_TX=?;Set @USER_REG_ID=?;Set @ADV_TEXT_TX=?;Set @STREAM_DATE_DT=?;Set @STREAM_TIME=?;Set @VENUE_TX=?;Set @IP_ADDRESS_TX=?; Set @APP_POOL=?;Set @CODE_TX=?;Set @YOUTUBE_YN=?;Set @TEMPLATE_ID=?;Set @VOD_YN=?;Set @CHAT_CODE_TX=?;Set @IMAGE_NAME_TX=?;Set @FULL_PATH_TX=?;Set @STREAM_ID=?;Set @STREAM_IMAGE_BYT=?; Set @IMAGE_NAME2_TX=?; Set @STREAM_IMAGE2_BYT=?; Set @IMAGE_NAME3_TX=?; Set @STREAM_IMAGE3_BYT=?; CALL USP_AddUpdateStream(@URL_TITLE_TX,@EVENT_TITLE_TX,@USER_REG_ID,@ADV_TEXT_TX,@STREAM_DATE_DT,@STREAM_TIME,@VENUE_TX,@IP_ADDRESS_TX, @APP_POOL,@CODE_TX,@YOUTUBE_YN,@TEMPLATE_ID,@VOD_YN,@CHAT_CODE_TX,@IMAGE_NAME_TX,@FULL_PATH_TX,@STREAM_ID,@STREAM_IMAGE_BYT,@IMAGE_NAME2_TX,@STREAM_IMAGE2_BYT,@IMAGE_NAME3_TX,@STREAM_IMAGE3_BYT)";
        pool.query(sql, [reg.URL_TITLE_TX, reg.EVENT_TITLE_TX, reg.USER_REG_ID, reg.ADV_TEXT_TX, reg.STREAM_DATE_DT, reg.STREAM_TIME, reg.VENUE_TX, reg.IP_ADDRESS_TX,
        reg.APP_POOL,reg.CODE_TX, reg.YOUTUBE_YN, reg.TEMPLATE_ID, reg.VOD_YN, reg.CHAT_CODE_TX, reg.IMAGE_NAME_TX, reg.FULL_PATH_TX, reg.STREAM_ID,reg.STREAM_IMAGE_BYT,reg.IMAGE_NAME2_TX,reg.STREAM_IMAGE2_BYT,reg.IMAGE_NAME3_TX,reg.STREAM_IMAGE3_BYT], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("addUpdateStream");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                retObj.statcode = 200;
                retObj.statmsg = "Success";
                res.send(retObj);
            }
        });
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get Streams Plan list
module.exports.GetStreamPlanlist =  function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT S.*,CASE WHEN S.ACTIVE_YN=1 THEN "Active" ELSE "Inactive" end STATUS_TX, IFNULL(U.USER_TYPE_TX,"Admin") AS USER_TYPE_TX,PLAN_TYPE_NAME_TX  FROM PLAN_T S INNER JOIN PLAN_TYPE_T P ON P.ID=S.PLAN_TYPE_ID INNER JOIN USER_TYPE_T U ON U.ID=S.USER_TYPE_ID ', [req.body.ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("GetStreamPlanlist");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                  common.validateSession(req, res, result);
                  
                                 
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                  
                }
            }
        });
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get One Stream Plan
module.exports.streamplanbyid = function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT * FROM PLAN_T WHERE ID=? ', [req.body.PLAN_ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("streamplanbyid");
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
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Add Stream Plan
module.exports.addUpdateStreamPlan = function (req, res) {
    if (req.body) {
	    try{
        let reg = req.body;        
        var sql = "Set @PLAN_NAME_TX=?;Set @USER_TYPE_ID=?;SET @STREAM_SIZE_NM=?;Set @AMOUNT=?; Set @CREATED_BY=?; Set @PLAN_ID=?;Set @PLAN_TYPE_ID=?; CALL USP_AddUpdateStreamPlan(@PLAN_NAME_TX,@USER_TYPE_ID,@STREAM_SIZE_NM,@AMOUNT,@CREATED_BY,@PLAN_ID,@PLAN_TYPE_ID)";
        pool.query(sql, [reg.PLAN_NAME_TX, reg.USER_TYPE_ID,reg.STREAM_SIZE_NM, reg.AMOUNT, reg.CREATED_BY, reg.PLAN_ID,reg.PLAN_TYPE_ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("addUpdateStreamPlan");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                retObj.statcode = 200;
                retObj.statmsg = "Success";
                res.send(retObj);
            }
        });
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}


//For Get Purchase Plan list
module.exports.GetPurchasePlanlist =  function (req, res) {
    if (req.body) {          
	    try{
        pool.query("CALL GETPLANFORPURCHASE("+req.body.ID+","+req.body.PLAN_TYPE_ID+")", (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("GetPurchasePlanlist");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                  common.validateSession(req, res, result);
                  
                                 
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                  
                }
            }
        });   
    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}
//For Purchase Plan Initiate
module.exports.PurchasePlanInititate = function (req, res) {
    if (req.body) {
        let reg = req.body;            
	    try{
        pool.query("CALL USP_PurchasePlanInitiate("+reg.PLAN_ID+", "+reg.PLAN_TYPE_ID+", "+reg.AMOUNT+","+reg.TAXAMOUNT+","+reg.TOTALAMOUNT+","+reg.TOTAL_VALUE_NM+", "+reg.CREATED_BY+")", (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("PurchasePlanInititate");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    common.validateSession(req, res, result);
                  } else {
                      retObj.statcode = 102;
                      retObj.statmsg = "No Result Found";                    
                  }
               
            }
        });
	}catch(e){
		console.log(e);
		throw e;
	}
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}
//For Get Plan by Payment Id
module.exports.PlanDetailByPGID = function (req, res) {
    if (req.body) {
	    try{
        pool.query('SELECT P.* FROM PLAN_T P INNER JOIN PLAN_PURCHASE_T PP ON PP.PLAN_ID=P.ID INNER JOIN PG_TRANSACTION_T PG ON PG.REF_ID=PP.ID WHERE PG.ID=? ', [req.body.PG_ID], (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("PlanDetailByPGID");
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
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Purchase Plan Success
module.exports.PurchasePlanSuccess = function (req, res) {
    if (req.body) {
	    try{
        let reg = req.body;                
        pool.query("CALL USP_PurchasePlanSuccess("+reg.PG_ID+", "+reg.CREATED_BY+")", (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("PurchasePlanSuccess");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                retObj.statcode = 200;
                retObj.statmsg = "Success";
                res.send(retObj);
            }
        });
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Get Streams By UrlTitle
module.exports.streambyUrlTitle = function (req, res) {
    if (req.body) {
	    try{
        var field1val = req.body.URL_TITLE_TX;
        pool.query("SELECT * FROM STREAM_T WHERE URL_TITLE_TX= '" + field1val + "' AND ACTIVE_YN=1;", (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("streambyUrlTitle");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    retObj.statcode = 200;
                    retObj.statmsg = "Success";
                    var d = result[0];
                    const def_Iv = "H8Ctcauy/4DhnYyfksuWkw==";
                    const def_Key = "0e+B7xdXE4I5p8mqAK9r2ejoAGlVx6Mkb2EuHNOoxkg=";
                    retObj.data = util.dataEncrypt(JSON.stringify(d), def_Iv, def_Key);
                    res.send(retObj);
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                    res.send(retObj);
                }
            }
        });
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}

//For Update Template By ID
module.exports.UpdateTemplateById = function (req, res) {
    if (req.body) {
	    try{
        var field1val = req.body.TEMPLATE_BODY_TX;
        pool.query("UPDATE STREAM_T SET TEMPLATE_BODY_TX= '" + field1val + "' WHERE ID=" + req.body.ID + ";", (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
		    console.log("UpdateTemplateById");
		    console.log(error);
                retObj.statmsg = error.toString();
                res.send(retObj);
            } else {
                if (result && result.length > 0) {
                    retObj.statcode = 200;
                    retObj.statmsg = "Success";                    
                    res.send(retObj);
                } else {
                    retObj.statcode = 102;
                    retObj.statmsg = "No Result Found";
                    res.send(retObj);
                }
            }
        });
		    }catch(e){
                console.log(e);
                throw e;
        }
    } else {
        var retObj = {
            statcode: 101,
            statmsg: "Invalid parameters"
        }
        res.send(retObj);
    }
}
