import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Refresh from "@material-ui/icons/Refresh";
import Download from "@material-ui/icons/GetApp";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { accountService, trainingService, alertService } from "../../services";
import PopUpFileUpload from "./PopUpFileUpload";
import { Role } from "./../../helpers/role";
import Loader from "./../../components/Common/Loader";
import SweetAlert from "react-bootstrap-sweetalert";
import CustomSelect from "../../components/CustomSelect";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import "./index.css";
function MyTrainings({ history, match }) {
  const { path } = match;
  const userDetails = accountService.userValue;
  console.log("userValue == ", accountService.userValue);

  //console.log("userDetails role == ", userDetails.currentRole);
  const [trainings, setTrainings] = useState(null);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTrainings(null);    
    if (Role.User == Role.User) {
      let userData = [];
      trainingService.listTaskToUsers().then((x) => {
        console.log("x of user == ", x);
        x.map((data) => {
          x = data;
          x.assignedByName = `${data.assignBy.firstName}  ${data.assignBy.lastName}`;
          x.assignedToName = `${data.assignTo.firstName}  ${data.assignTo.lastName}`;
          x.acceptRejectStatus = data.acceptRejectStatus;
          userData.push(x);
        });
        setTrainings(userData);
      });
    }
  }, [Role.User]);

  function onSubmit(fields, { setStatus, setSubmitting }) {
    let params = {
      rejectionReason: fields.reason,
      id: selectedTraining.id,
    };
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully submitted training rejection reason", {
        keepAfterRouteChange: true,
      });
      setSelectedTraining("");
      let userData = [];
      trainingService.listTaskToUsers().then((x) => {
        x.map((data) => {
          x = data;
          x.assignedByName = `${data.assignBy.firstName}  ${data.assignBy.lastName}`;
          x.assignedToName = `${data.assignTo.firstName}  ${data.assignTo.lastName}`;
          x.acceptRejectStatus = data.acceptRejectStatus;
          userData.push(x);
        });
        setTrainings(userData);
      });      
    });
    setOpenDropDown(false);
  }

  const initialValues = {
    reason: "",
  }; 

  function handleClickAccept(e) {
    setIsSubmitting(true);
    let params = {
      id: e.id,
      isAccepted: 1,
    };    
    trainingService
      .acceptOrRejectPreRequisites(params)
      .then((data) => {
        alertService.success("Successfully accepted training", {
          keepAfterRouteChange: true,
        });
        setAccept(true);
        let userData = [];
        trainingService.listTaskToUsers().then((x) => {          
          x.map((data) => {
            x = data;
            x.assignedByName = `${data.assignBy.firstName}  ${data.assignBy.lastName}`;
            x.assignedToName = `${data.assignTo.firstName}  ${data.assignTo.lastName}`;
            x.acceptRejectStatus = data.acceptRejectStatus;
            userData.push(x);
          });
          setTrainings(userData);
          setIsSubmitting(false);
        });       
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  }

  function handleClickReject(e) {
    let params = {
      id: e.id,
      isAccepted: 2,
      iscompleted: 3
    };
    setOpenDropDown(true);
    setSelectedTraining(e);    
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully accepted training prerequisites", {
        keepAfterRouteChange: true,
      });
      setReject(true);
      let userData = [];
      trainingService.listTaskToUsers().then((x) => {        
        x.map((data) => {
          x = data;
          x.assignedByName = `${data.assignBy.firstName}  ${data.assignBy.lastName}`;
          x.assignedToName = `${data.assignTo.firstName}  ${data.assignTo.lastName}`;
          x.acceptRejectStatus = data.acceptRejectStatus;
          userData.push(x);
        });
        setTrainings(userData);
      });      
    });
  }
  
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">           
            {Role.User == Role.User && (
              <h1 className="text-end font-weight-bold mb-5 text-danger">
                My Trainings
              </h1>
            )}            
          </div> 
          <div className="col-md-6 text-end">
            <Link to={"."} className="btn btn-danger ">
              <ArrowBackIcon className="mr-1" />
              Back
            </Link>
          </div>         
        </div>

        <div className="table-rep-plugin mt-5">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <table className="table">
              <thead>
                <tr>
                  <th>#</th> 
                  {Role.User == Role.User && (
                    <>
                      <th className="traning-listing">Nominated Employee</th>
                      <th className="traning-listing">Nominated By</th>
                      <th className="traning-listing">Training Name</th>
                      <th className="traning-listing">Start Date</th>
                      <th className="traning-listing">End Date</th>
                      <th className="traning-listing">
                        Required Prerequisites
                      </th>
                      <th className="traning-listing">Status</th>
                      <th className="traning-listing">Upload Prequisites</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {trainings &&
                  trainings.map((user, index) => (
                    <tr key={user.id}>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "40px" }}
                      >
                        {index + 1}
                      </td> 
                      {Role.User == Role.User && (
                        <>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "100px" }}
                          >
                            {user.assignedToName}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "100px" }}
                          >
                            {user.assignedByName}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "150px" }}
                          >
                            {user.training?.trainingName}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {moment(user.training?.trainingStartDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {moment(user.training?.trainingEndDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {user.training?.trainingPrequisites == ""
                              ? "-"
                              : user.training?.trainingPrequisites}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "150px" }}
                          >
                            {user.isAttendanceApproved == 1 ?
                              "Attended" : 
                              <div>
                                {user.isAttendanceApproved == 2 ? 
                                  "Absent" : "Pending"
                                }
                              </div>
                            }                             
                          </td>
                          <td>
                            {user.training?.trainingPrequisites != "-" &&
                            user.isAccepted == 0 ? (
                              <div>
                                <a
                                  style={{
                                    color: "#00b100",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    handleClickAccept(user);
                                    //setAccept(true);
                                  }}
                                >
                                  Approve
                                </a>
                                &nbsp;/&nbsp;
                                <a
                                  style={{
                                    color: "#e60000",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    handleClickReject(user);
                                    //setReject(true);
                                  }}
                                >
                                  Reject
                                </a>
                              </div>
                            ) : (
                              <div>
                                {user?.isAccepted == true &&
                                user?.isPrerequisiteUploaded == false &&
                                user.training?.trainingPrequisites != "NA" ? (
                                  <div>
                                    <PopUpFileUpload
                                      id={user.id}
                                      userDetails={userDetails}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {user?.isAcceptedByAdmin == 1 ? (
                                      <div>Approved</div>
                                     ) :(
                                      <div>
                                    {user.isPrerequisiteUploaded == true &&
                                      user?.isAccepted == true ? user?.isAcceptedByAdmin == 2 ? (
                                      <div>Rejected By Admin</div>
                                    ) :user?.isAcceptedByAdmin == 0 ? (
                                      <div>Admin Pending</div>
                                    ) :(
                                      <div>Admin Approved</div>
                                    ) :  (
                                      <div>{user?.isAccepted == 1 && 
                                        user?.training.trainingPrequisites == "NA" ? user?.isAcceptedByAdmin == 2 ? (
                                          <div>Rejected By Admin</div> 
                                        ) :user?.isAcceptedByAdmin == 0 ? (
                                          <div>Admin Pending</div>
                                        ):( <div>Admin Approved</div>
                                          ) :(
                                      <div>
                                        {user?.isAccepted == 2 ? (
                                          <div>
                                            {openDropDown ? (
                                              <SweetAlert
                                                type={"controlled"}
                                                closeOnClickOutside={true}
                                                onConfirm={() => {
                                                  setOpenDropDown(false);
                                                }}
                                                showConfirm={false}
                                                style={{
                                                  overflow: "-moz-initial",
                                                  justifyContent: "flex-start",
                                                }}
                                              >
                                                <div>
                                                  <div>
                                                    <Formik
                                                      initialValues={
                                                        initialValues
                                                      }
                                                      onSubmit={onSubmit}
                                                      onValidationError={(
                                                        errorValues
                                                      ) => {}}
                                                    >
                                                      {({
                                                        errors,
                                                        values,
                                                        touched,
                                                        isSubmitting,
                                                        setFieldValue,
                                                        handleBlur,
                                                        setTouched,
                                                      }) => {
                                                        return (
                                                          <Form>
                                                            <div>
                                                              <label>
                                                                Reasons for
                                                                Decline Training
                                                              </label>
                                                              <FastField
                                                                name="reason"
                                                                onBlurValue={(
                                                                  field
                                                                ) => {
                                                                  setTouched({
                                                                    ...touched,
                                                                    [field]: true,
                                                                  });
                                                                }}
                                                                options={[
                                                                  {
                                                                    label:
                                                                      "On Planned Leaves",
                                                                    value:
                                                                      "On Planned Leaves",
                                                                  },
                                                                  {
                                                                    label:
                                                                      "Schedule for another Training",
                                                                    value:
                                                                      "Schedule for another Training",
                                                                  },
                                                                  {
                                                                    label:
                                                                      "Ongoing project meetings/deadlines",
                                                                    value:
                                                                      "Ongoing project meetings/deadlines",
                                                                  },
                                                                  {
                                                                    label:
                                                                      "Ongoing Exit formalities",
                                                                    value:
                                                                      "Ongoing Exit formalities",
                                                                  },
                                                                  {
                                                                    label:
                                                                      "Not inclined to assigned skillset",
                                                                    value:
                                                                      "Not inclined to assigned skillset",
                                                                  },
                                                                  {
                                                                    label:
                                                                      "Other",
                                                                    value:
                                                                      "Other",
                                                                  },
                                                                ]}
                                                                placeholder="Please select reasons"
                                                                component={
                                                                  CustomSelect
                                                                }
                                                                isMulti={false}
                                                              />
                                                            </div>

                                                            <div className="text-end mt-3">
                                                              <button
                                                                type="submit"
                                                                className="btn btn-primary"
                                                              >
                                                                Submit
                                                              </button>
                                                            </div>
                                                          </Form>
                                                        );
                                                      }}
                                                    </Formik>
                                                  </div>
                                                </div>
                                              </SweetAlert>
                                            ) : (
                                              <div>Rejected</div>
                                            )}
                                          </div>
                                        ) : <div>{user?.isAcceptedByAdmin == 1 ? "Approved" : "Rejected"}</div>}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            </div>
                                )}
                            </div>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                {!trainings && (
                  <tr>
                    <td colSpan="10" className="text-center">
                      <span className="spinner-border spinner-border-lg align-center"></span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Loader loading={isSubmitting} />
    </div>
  );
}

export { MyTrainings };
