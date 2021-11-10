import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Refresh from "@material-ui/icons/Refresh";
import Download from "@material-ui/icons/GetApp";
import moment from "moment";
import { accountService, trainingService, alertService } from "../../services";
import PopUpFileUpload from "./PopUpFileUpload";
import { Role } from "./../../helpers/role";
import "./index.css";
function List1({ history, match }) {
  const { path } = match;
  const userDetails = accountService.userValue;
  console.log("userValue == ", accountService.userValue);

  //console.log("userDetails role == ", userDetails.currentRole);
  const [trainings, setTrainings] = useState(null);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  let filteredData = [];
  useEffect(() => {
    if (userDetails?.currentRole == Role.Admin) {
      trainingService.getAll().then((x) => {
        setTrainings(x);
      });
    }
    if (userDetails?.currentRole == Role.Manager) {
      let userData = [];
      trainingService.listTaskToUser().then((x) => {
        //console.log("x == ", x)
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
  }, []);

  const viewPreRequisited = (e) => () => {
    let id = e.id;
    let userId = e.assignedToId;
    trainingService.viewPreRequisites(id, userId).then((data) => {
      //console.log("response data == ", data);
      /*  alertService.success('Successfully accepted training prerequisites', { keepAfterRouteChange: true });
             history.push('/training'); */
    });
  };

  /*  const handleClickAccept = (e) => () => {
     //console.log(e);
     let params = {
       trainingId: e.id,
       userId: e.assignedToId,
       isAccept: 1,
       managerId: e.assignedById,
     };
     trainingService.acceptOrRejectPreRequisites(params).then((data) => {
       alertService.success("Successfully accepted training prerequisites", {
         keepAfterRouteChange: true,
       });
       trainingService.getActiveTrainingList().then((x) => {
         //console.log("x == ", x.length);
         for (let i = 0; i < x.length; i++) {
           if (x[i].assignedByName != null && x[i].assignedToName != null) {
             //console.log("x[1] == ", x[i]);
             if (x[i].acceptRejectStatus == 1) {
               x[i].acceptRejectStatus = "Completed";
               //console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
             }
             filteredData.push(x[i]);
           }
         }
         setTrainings(filteredData);
       });
       history.push("/training");
     });
   }; */

  /*  const handleClickReject = (e) => () => {
    let params = {
      trainingId: e.id,
      userId: e.assignedToId,
      isAccept: 2,
      managerId: e.assignedById,
    };
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully rejected training prerequisites", {
        keepAfterRouteChange: true,
      });
      trainingService.getActiveTrainingList().then((x) => {
        for (let i = 0; i < x.length; i++) {
          if (x[i].assignedByName != null && x[i].assignedToName != null) {
            //console.log("x[1] == ", x[i]);
            if (x[i].acceptRejectStatus == 1) {
              x[i].acceptRejectStatus = "Completed";
              //console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
            }
            filteredData.push(x[i]);
          }
        }
        setTrainings(filteredData);
      });
      history.push("/training");
    });
  }; */

  function handleClickAccept(e) {
    let params = {
      trainingId: e.training.id,
      nominatedTo: e.assignTo.id,
      isAccept: 1,
      nominatedBy: e.assignBy.id,
    };
    console.log("params -=-= ", params);
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
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
      });
      // history.push('/training');
    });
  }

  function handleClickReject(e) {
    let params = {
      trainingId: e.training.id,
      nominatedTo: e.assignTo.id,
      isAccept: 2,
      nominatedBy: e.assignBy.id,
    };
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
    try {
      trainingService.exportData("latest").then((response) => {
        //setUsers(x);
        const link = document.createElement("a");
        link.href = response.exportPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (error) {
      console.log("error", error);
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
                                    color: "blue",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() => {
                                    handleClickAccept(user);
                                    //setAccept(true);
                                  }}
                                >
                                  Approve
                                </a>
                                /
                                <a
                                  style={{
                                    color: "blue",
                                    textDecoration: "underline",
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
                                user?.isPrerequisiteUploaded == false ? (
                                  <div>
                                    <PopUpFileUpload
                                      id={user.id}
                                      userDetails={userDetails}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {user.isPrerequisiteUploaded == true &&
                                    user?.isAccepted == true ? (
                                      <div>-</div>
                                    ) : (
                                      <div>
                                        {user?.isAccepted == 2 ? (
                                          <div>
                                            <h1>You have rejected it</h1>
                                          </div>
                                        ) : null}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* {user.training?.trainingPrequisites != "-" && user.isAccepted == 0 && accept == false && reject == false ? (
                              <div>
                                {user.isPrerequisiteUploaded === false ? (
                                  <div>
                                    <a style={{ color: 'blue', textDecoration: 'underline' }}
                                      onClick={() => {
                                        handleClickAccept(user)
                                        setAccept(true);
                                      }}>Approve</a>
                                    /
                                    <a style={{ color: 'blue', textDecoration: 'underline' }}
                                      onClick={() => {
                                        handleClickReject(user)
                                        setReject(true);
                                    }}>Reject</a>
                                  </div>
                                ) : (                                  
                                  <div>
                                    {user.isAccepted == true ? (
                                      <PopUpFileUpload
                                        id={user.id}
                                        userDetails={userDetails}
                                      />
                                    ):<div>
                                      <h1>Hi</h1>
                                      </div>}
                                  </div>
                                )}

                              </div>
                            ) : (
                              <div>
                                {reject == true && (
                                  <h6>You Rejected</h6>
                                )}
                                {accept == true && (
                                  <PopUpFileUpload
                                  id={user.id}
                                  userDetails={userDetails}
                                />
                                )}
                             </div>
                            )} */}
                            {/* {accept == true && (
                               <PopUpFileUpload
                               id={user.id}
                               userDetails={userDetails}
                             />
                            )} */}
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
    </div>
  );
}

export { List1 };
