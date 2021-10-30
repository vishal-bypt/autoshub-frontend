import React from "react"
import { Redirect } from "react-router-dom"

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//AuthenticationInner related pages
import PageLogin from "../pages/AuthenticationInner/PageLogin";
import PageRegister from "../pages/AuthenticationInner/PageRegister";
import RecoverPassword from "../pages/AuthenticationInner/RecoverPassword";
import LockScreen from "../pages/AuthenticationInner/LockScreen";
import ConfirmMail from "../pages/AuthenticationInner/ConfirmMail";
import EmailVerification from "../pages/AuthenticationInner/EmailVerification";
import TwoStepVerfication from "../pages/AuthenticationInner/TwoStepVerfication";
import userProfile from "../pages/Authentication/user-profile";
import { Training } from "../pages/training/Index";
import { Revenue } from "../pages/revenue/Index";
import { UserAccessView } from "../pages/user/userAccessView/Index";
import { UserList } from "../pages/user/userList/Index";
import { AddEdit } from "../pages/training/AddEdit";
import { AddEdit as RevenueAddEdit } from "../pages/revenue/AddEdit";
import { List as RevenueList } from "../pages/revenue/List";
import { UploadProgramData } from "../pages/revenue/UploadProgramData";
import EditUser from "../pages/user/userList/EditUser";
import AddUsers from "../pages/user/userList/AddUsers";
import { UploadPrequisites } from "../pages/training/UploadPrequisites";
import { GetTrainingByRole } from "../pages/training/GetTrainingByRole";
import { Trainings } from "../pages/training/Trainings";
import { AllNominations } from "../pages/training/AllNominations";
import { EditTrainingList } from "../pages/training/EditTrainingList";
import { EditTraining } from "../pages/training/EditTraining";
import { EditProgram } from "../pages/revenue/EditProgram";

import { AssignUsers } from "../pages/training/AssignUsers";
import { UploadFieldList } from "../pages/training/UploadFieldList";
import { RFPForm } from "../pages/rfpForm/Index";
import { List } from '../pages/rfpForm/List';
import AddEditPage from '../pages/rfpForm/AddEdit';
import { MyEntries } from '../pages/rfpForm/MyEntries';
import { EditedEntries } from '../pages/rfpForm/EditedEntries';
import { LandingEntries } from '../pages/rfpForm/LandingEntries';
import { accountService } from "../services";
import Landing from "../pages/Dashboard/Landing";

const userDetails = accountService.userValue;

const userRoutes = [

  //dashboard
  { path: "/dashboard", component: Dashboard },
  { path: "/landing", component: Landing },

  //profile
  { path: "/profile", component: userProfile },

  //Training
  { path: "/training", component: Training },
  { path: "/training/add", component: AddEdit },
  { path: "/training/uploadPrequisites", component: UploadPrequisites },
  { path: "/training/getAllByRole", component: GetTrainingByRole },
  { path: "/training/getAll", component: Trainings },
  { path: "/training/getAllNominations", component: AllNominations },
  { path: "/training/editList", component: EditTrainingList },
  { path: "/training/edit/:id", component: EditTraining },
  { path: "/training/assign/:id", component: AssignUsers },
  { path: "/training/uploadList", component: UploadFieldList },

  //Revenue
  { path: "/revenue", component: Revenue },
  { path: "/revenue/addProgram", component: RevenueAddEdit },
  { path: "/revenue/allProgram", component: RevenueList },
  { path: "/revenue/uploadData", component: UploadProgramData },
  { path: "/revenue/edit/:id/:programName", component: EditProgram },

  //User
  // { path: "/userAccessView", component: userDetails && userDetails.role === "Admin" ? UserAccessView : null },
  // { path: "/userList", component: userDetails && userDetails.role === "Admin" ? UserList : null },
  // { path: "/userList/editUser", component: userDetails && userDetails.role === "Admin" ? EditUser : null },
  // { path: "/userList/addUsers", component: userDetails && userDetails.role === "Admin" ? AddUsers : null },
  { path: "/userAccessView", component: UserAccessView },
  { path: "/userList", component: UserList },
  { path: "/userList/editUser", component: EditUser },
  { path: "/userList/addUsers", component: AddUsers },


  //RFC
  { path: "/rfp", component: LandingEntries },
  { path: "/rfp/my-entries", component: MyEntries },
  { path: "/rfp/all-entries", component: List },
  { path: "/rfp/edited-entries", component: EditedEntries },
  { path: "/rfp/landing-entries", component: LandingEntries },
  { path: "/rfp/add", component: AddEditPage },
  { path: "/rfp/edit/:id", component: AddEditPage },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  //authencation page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  //AuthenticationInner pages
  { path: "/page-login", component: PageLogin },
  { path: "/page-register", component: PageRegister },
  { path: "/page-recoverpw", component: RecoverPassword },
  { path: "/page-lock-screen", component: LockScreen },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-email-verification", component: EmailVerification },
  { path: "/page-two-step-verification", component: TwoStepVerfication },
]

export { userRoutes, authRoutes }
