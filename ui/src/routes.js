import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ChangePWD from "views/examples/Changepassword.js";
import ViewUser from "views/examples/ViewUser.js";
import AddStream from "views/examples/AddStream.js";
import ViewStream from "views/examples/ViewStream.js";
import CreateStream from "views/examples/CreateStream.js";
import CreateStreamPlan from "views/examples/CreateStreamPlan.js";
import ViewStreamPlan from "views/examples/ViewStreamPlan.js";
import ViewPlanPurchase from "views/examples/ViewPlanPurchase.js";
import PurchasePlan from "views/examples/PurchasePlan.js";
import ConfirmPurchasePlan from "views/examples/ConfirmPurchasePlan.js";
import TextEditor from "views/examples/TextEditor.js";
import Temp from "views/examples/TemplateWelcome.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/icons",
    name: "Add User Reseller",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/viewreselleruser",
    name: "View User Reseller",
    icon: "ni ni-planet text-blue",
    component: ViewUser,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/addstream",
    name: "Update Stream",
    icon: "ni ni-planet text-blue",
    component: AddStream,
    layout: "/admin",
    Inmenu: "no"
  },
  {
    path: "/Createstream",
    name: "Create Stream",
    icon: "ni ni-planet text-blue",
    component: CreateStream,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/viewstream",
    name: "View Stream",
    icon: "ni ni-planet text-blue",
    component: ViewStream,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/CreatestreamPlan",
    name: "Create Plans",
    icon: "ni ni-planet text-blue",
    component: CreateStreamPlan,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/viewstreamPlan",
    name: "View Plans",
    icon: "ni ni-planet text-blue",
    component: ViewStreamPlan,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/ViewPlanPurchase",
    name: "Purchase Plan",
    icon: "ni ni-planet text-blue",
    component: ViewPlanPurchase,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/PurchasePlan",
    name: "Purchase Plan",
    icon: "ni ni-planet text-blue",
    component: PurchasePlan,
    layout: "/admin",
    Inmenu: "no"
  },
  {
    path: "/ConfirmPurchasePlan",
    name: "Confirm Plan and Do Payment",
    icon: "ni ni-planet text-blue",
    component: ConfirmPurchasePlan,
    layout: "/admin",
    Inmenu: "no"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/Changepassword",
    name: "Change Password",
    icon: "ni ni-single-02 text-yellow",
    component: ChangePWD,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    Inmenu: "yes"
  },
  {
    path: "/textEditor",
    name: "textEditor",
    icon: "ni ni-key-25 text-info",
    component: TextEditor,
    layout: "/admin"
  },
  {
    path: "/temp",
    name: "Stream View",
    icon: "ni ni-circle-08 text-pink",
    component: Temp,
    layout: "/Temp"
  }
];

var userRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/addstream",
    name: "Update Stream",
    icon: "ni ni-planet text-blue",
    component: AddStream,
    layout: "/user",
    Inmenu: "no"
  },
  {
    path: "/Createstream",
    name: "Create Stream",
    icon: "ni ni-planet text-blue",
    component: CreateStream,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/viewstream",
    name: "View Stream",
    icon: "ni ni-planet text-blue",
    component: ViewStream,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/CreatestreamPlan",
    name: "Create Plans",
    icon: "ni ni-planet text-blue",
    component: CreateStreamPlan,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/viewstreamPlan",
    name: "View Plans",
    icon: "ni ni-planet text-blue",
    component: ViewStreamPlan,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/ViewPlanPurchase",
    name: "Purchase Plan",
    icon: "ni ni-planet text-blue",
    component: ViewPlanPurchase,
    layout: "/user",
    Inmenu: "no"
  },
  {
    path: "/PurchasePlan",
    name: "Purchase Plan",
    icon: "ni ni-planet text-blue",
    component: PurchasePlan,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/ConfirmPurchasePlan",
    name: "Confirm Plan and Do Payment",
    icon: "ni ni-planet text-blue",
    component: ConfirmPurchasePlan,
    layout: "/user",
    Inmenu: "no"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/user",
    Inmenu: "yes"
  },
  {
    path: "/Changepassword",
    name: "Change Password",
    icon: "ni ni-single-02 text-yellow",
    component: ChangePWD,
    layout: "/user",
    Inmenu: "yes"
  }
];

var studioRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/addstream",
    name: "Update Stream",
    icon: "ni ni-planet text-blue",
    component: AddStream,
    layout: "/studio",
    Inmenu: "no"
  },
  {
    path: "/Createstream",
    name: "Create Stream",
    icon: "ni ni-planet text-blue",
    component: CreateStream,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/viewstream",
    name: "View Stream",
    icon: "ni ni-planet text-blue",
    component: ViewStream,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/CreatestreamPlan",
    name: "Create Plans",
    icon: "ni ni-planet text-blue",
    component: CreateStreamPlan,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/viewstreamPlan",
    name: "View Plans",
    icon: "ni ni-planet text-blue",
    component: ViewStreamPlan,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/ViewPlanPurchase",
    name: "Purchase Plan",
    icon: "ni ni-planet text-blue",
    component: ViewPlanPurchase,
    layout: "/studio",
    Inmenu: "no"
  },
  {
    path: "/PurchasePlan",
    name: "Purchase Plan",
    icon: "ni ni-planet text-blue",
    component: PurchasePlan,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/ConfirmPurchasePlan",
    name: "Confirm Plan and Do Payment",
    icon: "ni ni-planet text-blue",
    component: ConfirmPurchasePlan,
    layout: "/studio",
    Inmenu: "no"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/studio",
    Inmenu: "yes"
  },
  {
    path: "/Changepassword",
    name: "Change Password",
    icon: "ni ni-single-02 text-yellow",
    component: ChangePWD,
    layout: "/studio",
    Inmenu: "yes"
  }
];

var authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    Inmenu: "yes"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    Inmenu: "yes"
  }
];
export default { routes, userRoutes, authRoutes, studioRoutes };
