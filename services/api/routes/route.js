var express = require("express");
var router = express.Router();

var ctrlogin = require("../controllers/login.controller");
var ctrMaster = require("../controllers/master.controller");
var ctrlogin = require("../controllers/login.controller");
var ctrtrans = require("../controllers/transaction.controller");

//router.route("/employees").get(ctrlogin.employess);
router.route("/login").post(ctrlogin.loginUser);
router.route("/register").post(ctrlogin.registerUser);
router.route("/changePassword").post(ctrlogin.changePassword);
router.route("/GetSeller").post(ctrMaster.GetReseller);
router.route("/GetState").post(ctrMaster.GetState);
router.route("/GetCityByState").post(ctrMaster.GetCityByState);
router.route("/GetCity").post(ctrMaster.GetCity);
router.route("/GetBox").post(ctrMaster.GetBox);
router.route("/reguserbyid").post(ctrtrans.GetRegUserById);
router.route("/UpdateUser").post(ctrtrans.UpdateUserById);
router.route("/addReseller").post(ctrtrans.addReseller);
router.route("/GetUserlist").post(ctrtrans.GetUserlist);
router.route("/GetStreamlist").post(ctrtrans.GetStreamlist);
router.route("/addUpdateStream").post(ctrtrans.addUpdateStream);
router.route("/CheckURL").post(ctrtrans.CheckURL);
router.route("/streambyid").post(ctrtrans.streambyid);
router.route("/streambyUrlTitle").post(ctrtrans.streambyUrlTitle);
router.route("/UpdateTemplateById").post(ctrtrans.UpdateTemplateById);
router.route("/GetStreamPlanlist").post(ctrtrans.GetStreamPlanlist);
router.route("/addUpdateStreamPlan").post(ctrtrans.addUpdateStreamPlan);
router.route("/streamplanbyid").post(ctrtrans.streamplanbyid);
router.route("/GetPurchasePlanlist").post(ctrtrans.GetPurchasePlanlist);
router.route("/PurchasePlanInititate").post(ctrtrans.PurchasePlanInititate);
router.route("/PlanDetailByPGID").post(ctrtrans.PlanDetailByPGID);
router.route("/PurchasePlanSuccess").post(ctrtrans.PurchasePlanSuccess);

module.exports = router;