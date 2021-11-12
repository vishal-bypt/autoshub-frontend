import React from "react";
import { Redirect } from "react-router-dom";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
// Authentication related pages
import Login from "../pages/Authentication/Login";
import ResetPassword from "../pages/Authentication/ResetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import userProfile from "../pages/Authentication/user-profile";
import ConfirmMail from "../pages/AuthenticationInner/ConfirmMail";
import EmailVerification from "../pages/AuthenticationInner/EmailVerification";
import LockScreen from "../pages/AuthenticationInner/LockScreen";
//AuthenticationInner related pages
import PageLogin from "../pages/AuthenticationInner/PageLogin";
import PageRegister from "../pages/AuthenticationInner/PageRegister";
import RecoverPassword from "../pages/AuthenticationInner/RecoverPassword";
import TwoStepVerfication from "../pages/AuthenticationInner/TwoStepVerfication";
//Dashboard
import Dashboard from "../pages/Dashboard/index";
import Landing from "../pages/Dashboard/Landing";
import { AddEdit as RevenueAddEdit } from "../pages/revenue/AddEdit";
import { EditProgram } from "../pages/revenue/EditProgram";
import { Revenue } from "../pages/revenue/Index";
import { List as RevenueList } from "../pages/revenue/List";
import { UploadProgramData } from "../pages/revenue/UploadProgramData";
import AddEditPage from '../pages/rfpForm/AddEdit';
import { EditedEntries } from '../pages/rfpForm/EditedEntries';
import { LandingEntries } from '../pages/rfpForm/LandingEntries';
import { List } from '../pages/rfpForm/List';
import { MyEntries } from '../pages/rfpForm/MyEntries';
import { AddEdit } from "../pages/training/AddEdit";
import { AllNominations } from "../pages/training/AllNominations";
import { AssignUsers } from "../pages/training/AssignUsers";
import { Attendance } from "../pages/training/Attendance";
import { EditTraining } from "../pages/training/EditTraining";
import { EditTrainingList } from "../pages/training/EditTrainingList";
import { GetTrainingByRole } from "../pages/training/GetTrainingByRole";
import { Training } from "../pages/training/Index";
import { List1 } from "../pages/training/List";
import { Trainings } from "../pages/training/Trainings";
import { UploadFieldList } from "../pages/training/UploadFieldList";
import { UploadFiles } from "../pages/training/UploadFiles";
import { UploadPrequisites } from "../pages/training/UploadPrequisites";
import { UserAccessView } from "../pages/user/userAccessView/Index";
import AddUsers from "../pages/user/userList/AddUsers";
import EditUser from "../pages/user/userList/EditUser";
import { UserList } from "../pages/user/userList/Index";
import { MyTrainings } from "../pages/training/MyTrainings";

const userRoutes = [

  //dashboard
  { path: "/dashboard", component: Dashboard },
  { path: "/landing", component: Landing },

  //profile
  { path: "/profile", component: userProfile },

  //Training
  { path: "/training", component: Training },
  { path: "/training/list", component: List1 },
  { path: "/training/add", component: AddEdit },
  { path: "/training/uploadPrequisites", component: UploadPrequisites },
  { path: "/training/getAllByRole", component: GetTrainingByRole },
  { path: "/training/getAll", component: Trainings },
  { path: "/training/myTraining", component: MyTrainings },
  { path: "/training/getAllNominations", component: AllNominations },
  { path: "/training/editList", component: EditTrainingList },
  { path: "/training/edit/:id", component: EditTraining },
  { path: "/training/assign/:id", component: AssignUsers },
  { path: "/training/uploadList", component: UploadFieldList },
  { path: "/training/uploadFiles", component: UploadFiles },
  { path: "/training/Attendance", component: Attendance },

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
  { path: "/userList/editUser/:id", component: EditUser },
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
  { path: "/reset-password", component: ResetPassword },
  { path: "/page-recoverpw", component: RecoverPassword },
  { path: "/page-lock-screen", component: LockScreen },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-email-verification", component: EmailVerification },
  { path: "/page-two-step-verification", component: TwoStepVerfication },
]

export { userRoutes, authRoutes };

