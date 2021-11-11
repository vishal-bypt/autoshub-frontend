import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Refresh from "@material-ui/icons/Refresh";
import Download from "@material-ui/icons/GetApp";
import moment from "moment";
import { accountService, trainingService, alertService } from "../../services";
import PopUpFileUpload from "./PopUpFileUpload";
import { Role } from "./../../helpers/role";
import Loader from "./../../components/Common/Loader";
import SweetAlert from "react-bootstrap-sweetalert";
import CustomSelect from "../../components/CustomSelect";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import "./index.css";
function List1({ history, match }) {
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

  let filteredData = [];
  useEffect(() => {
    setTrainings(null);
    if (userDetails?.currentRole == Role.Admin) {
      trainingService.getAll().then((x) => {
        setTrainings(x);
      });
    }
    if (userDetails?.currentRole == Role.Manager) {
      let userData = [];
      trainingService.listTaskToUser().then((x) => {
        console.log("x == ", x);
        x.map((data) => {
          x = data.training;
          userData.push(x);
        });
        setTrainings(userData);
      });
    }
    if (userDetails?.currentRole == Role.User) {
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
  }, [userDetails?.currentRole]);

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
      //history.push('/training');
    });
    setOpenDropDown(false);
  }

  const initialValues = {
    reason: "",
  };
  const viewPreRequisited = (e) => () => {
    let id = e.id;
    let userId = e.assignedToId;
    trainingService.viewPreRequisites(id, userId).then((data) => {
      //console.log("response data == ", data);
      /*  alertService.success('Successfully accepted training prerequisites', { keepAfterRouteChange: true });
             history.push('/training'); */
    });
  };

  function handleClickAccept(e) {
    setIsSubmitting(true);
    let params = {
      id: e.id,
      isAccepted: 1,
    };
    console.log("params -=-= ", params);
    trainingService
      .acceptOrRejectPreRequisites(params)
      .then((data) => {
        alertService.success("Successfully accepted training", {
          keepAfterRouteChange: true,
        });
        setAccept(true);
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
          setIsSubmitting(false);
        });
        // history.push('/training');
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  }

  function handleClickReject(e) {
    let params = {
      id: e.id,
      isAccepted: 2,
    };
    setOpenDropDown(true);
    setSelectedTraining(e);
    console.log("params == ", params);
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully accepted training prerequisites", {
        keepAfterRouteChange: true,
      });
      setReject(true);
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
      //history.push('/training');
    });
  }

  const handleExportData = () => {
    setIsSubmitting(true);
    try {
      trainingService.exportData("latest").then((response) => {
        setIsSubmitting(false);
        //setUsers(x);
        const link = document.createElement("a");
        link.href = response.exportPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (error) {
      console.log("error", error);
      setIsSubmitting(false);
    }
  };
  console.log("trainings = ", trainings);
  console.log("accept == ", accept);
  console.log("reject == ", reject);
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {userDetails?.currentRole == Role.Admin && (
              <h1 className="text-center font-weight-bold mb-5 text-danger">
                Trainings
              </h1>
            )}
            {userDetails?.currentRole == Role.User && (
              <h1 className="text-center font-weight-bold mb-5 text-danger">
                My Trainings
              </h1>
            )}
            {userDetails?.currentRole == Role.Manager && (
              <h1 className="text-center font-weight-bold mb-5 text-danger">
                Trainings
              </h1>
            )}
          </div>
          <div className="col-md-14 text-center d-flex justify-content-center">
            {userDetails?.currentRole == Role.Admin && (
              <>
                <Link to={`/training/add`} className="newbutton">
                  Upload Trainings
                </Link>
                <Link to={`/training/editList`} className="newbutton">
                  Edit Trainings
                </Link>
                <Link to={`/training/getAllByRole`} className="newbutton">
                  My Trainings
                </Link>
                <Link to={`/training/getAll`} className="newbutton">
                  View All
                </Link>
                <Link to={`/training/getAllNominations`} className="newbutton">
                  All Nominations
                </Link>
                <Link to={`/training/Attendance`} className="newbutton">
                  Attendance
                </Link>
                <Link to={`/training/list`} className="newbutton">
                  <Refresh />
                </Link>
                <Link to={`#`} onClick={handleExportData} className="newbutton">
                  <Download />
                </Link>
              </>
            )}
            {userDetails?.currentRole == Role.Manager && (
              <>
                <Link to={`/training/getAllByRole`} className="newbutton">
                  My Trainings
                </Link>
                <Link to="#" className="newbutton">
                  View Training
                </Link>
              </>
            )}
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
                  {userDetails?.currentRole == Role.Admin && (
                    <>
                      <th className="traning-listing">Month</th>
                      <th className="traning-listing">Start Date</th>
                      <th className="traning-listing">End Date</th>
                      <th className="traning-listing">Training Name</th>
                      <th className="traning-listing">Stream</th>
                      <th className="traning-listing">Tool Name</th>
                      <th className="traning-listing">No. of Nominations</th>
                      <th className="traning-listing">No. of Attended</th>
                      <th className="traning-listing">No. of Absentees</th>
                    </>
                  )}

                  {userDetails?.currentRole == Role.Manager && (
                    <>
                      <th className="traning-listing">Training Name</th>
                      <th className="traning-listing">Training Type</th>
                      <th className="traning-listing">Start Date</th>
                      <th className="traning-listing">End Date</th>
                      <th className="traning-listing">
                        Required Prerequisites
                      </th>
                      <th className="traning-listing">Nomination End Date</th>
                      <th></th>
                    </>
                  )}

                  {userDetails?.currentRole == Role.User && (
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
                      {userDetails?.currentRole == Role.Admin && (
                        <>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "100px" }}
                          >
                            {moment(user.trainingStartDate).format("MMMM")}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {moment(user.trainingStartDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "150px" }}
                          >
                            {user.trainingName}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "150px" }}
                          >
                            {user?.stream}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "150px" }}
                          >
                            {user.toolName}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "100px" }}
                          >
                            {user.totalNominations ? user.totalNominations : 0}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "100px" }}
                          >
                            {user.totalAttendedNominations
                              ? user.totalAttendedNominations
                              : 0}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "100px" }}
                          >
                            {user.totalRejectedNominations
                              ? user.totalRejectedNominations
                              : 0}
                          </td>
                          <td></td>
                        </>
                      )}

                      {userDetails?.currentRole == Role.User && (
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
                            {/* {user.acceptRejectStatus == 0 ?
                                          "Pending" : "Completed"
                                      } */}
                            Pending
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
                                      <div>Accepted</div>
                                     ) :(
                                      <div>
                                    {user.isPrerequisiteUploaded == true &&
                                      user?.isAccepted == true ? (
                                      <div>-</div>
                                    ) : (
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
                                        ) : <div>{user?.isAcceptedByAdmin == 1 ? "Accepted" : "Rejected"}</div>}
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

                      {userDetails?.currentRole == Role.Manager && (
                        <>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "150px" }}
                          >
                            {user.trainingName}
                          </td>
                          <td className="traning-listing">
                            {user.trainingType}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {moment(user.trainingStartDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "130px" }}
                          >
                            {user.trainingPrequisites}
                          </td>
                          <td>
                            {moment(user.nominationEndDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td
                            className="traning-listing"
                            style={{ minWidth: "150px" }}
                          >
                            <Link
                              to={`/training/assign/${user.id}`}
                              className="btn btn-warning"
                            >
                              Nominate
                            </Link>
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

export { List1 };
