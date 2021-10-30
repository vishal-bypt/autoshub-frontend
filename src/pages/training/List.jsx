import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Refresh from '@material-ui/icons/Refresh';
import moment from "moment";
import { accountService, trainingService, alertService } from "../../services";
import PopUpFileUpload from "./PopUpFileUpload";

function List({ history, match }) {
  const { path } = match;
  const userDetails = accountService.userValue;
  console.log("userDetails == ", userDetails);
  //console.log("userDetails role == ", userDetails.currentRole);
  const [users, setUsers] = useState(null);
  let filteredData = [];
  useEffect(() => {    
      trainingService.getAll().then((x) => {
        console.log("x == ", x);
        setUsers(x);
      });   

    if (userDetails.currentRole == "Admin") {
      trainingService.getAll().then((x) => {
        /* for (let i = 0; i < x.length; i++) {
                    if (x[i].assignedByName != null && x[i].assignedToName != null) {
                        console.log("x[1] == ", x[i]);
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"
                            console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
                        }
                        filteredData.push(x[i])
                    }
                } */
        setUsers(x);
      });
    }
    if (userDetails.currentRole == "Manager") {
      let userData = [];
      trainingService.listTaskToUser().then((x) => {
        //console.log("x == ", x)
        x.map((data) => {
          x = data.training;
          userData.push(x);
        });
        setUsers(userData);
      });
    }
    if (userDetails.currentRole == "User") {
      let userData = [];
      trainingService.listTaskToUser().then((x) => {
        x.map((data) => {
          //console.log("data of user == ", data);
          x = data.training;
          x.assignedByName = `${data.assignBy.firstName}  ${data.assignBy.lastName}`;
          x.assignedToName = `${data.assignTo.firstName}  ${data.assignTo.lastName}`;
          x.acceptRejectStatus = data.acceptRejectStatus;
          userData.push(x);
        });
        setUsers(userData);
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

  const handleClickAccept = (e) => () => {
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
        setUsers(filteredData);
      });
      history.push("/training");
    });
  };

  const handleClickReject = (e) => () => {
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
        setUsers(filteredData);
      });
      history.push("/training");
    });
  };
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            {userDetails.currentRole == "Admin" && (
              <h1 className="header-text">Trainings</h1>
            )}
            {userDetails.currentRole == "User" && (
              <h1 className="header-text">My Trainings</h1>
            )}
            {userDetails.currentRole == "Manager" && (
              <h1 className="header-text">Trainings</h1>
            )}
          </div>
          <div className="col-md-6 text-end">
            {userDetails.currentRole == "Admin" && (
              <>
                <Link to={`/training/add`} className="btn btn-primary">
                  Upload Trainings
                </Link>
                <Link to={`/training/editList`} className="btn btn-primary ml-1">
                  Edit Trainings
                </Link>
                <Link
                  to={`/training/getAllByRole`}
                  className="btn btn-primary ml-1"
                >
                  My Trainings
                </Link>
                <Link to={`/training/getAll`} className="btn btn-primary ml-1">
                  View All
                </Link>
                <Link
                  to={`/training/getAllNominations`}
                  className="btn btn-primary ml-1"
                >
                  All Nominations
                </Link>
                <Link
                  to={`/training`}
                  className="btn btn-primary ml-1"
                >
                  <Refresh/>
                </Link>
              </>
            )}
            {userDetails.currentRole == "Manager" && (
              <>
                <Link to={`/training/getAllByRole`} className="btn btn-primary">
                  My Trainings
                </Link>
                <Link to="#" className="btn btn-primary ml-1">
                  View Training
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="row">&nbsp;</div>
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">Month</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">Start Date</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">End Date</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">Training Name</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">Stream</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">Tool Name</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">No. of Nominations</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">No. of Attended</th>
                  )}
                  {userDetails.currentRole == "Admin" && (
                    <th className="traning-listing">No. of Absentees</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">Nominated Employee</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">Nominated By</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">Training Name</th>
                  )}
                  {userDetails.currentRole == "Manager" && (
                    <th className="traning-listing">Training Name</th>
                  )}
                  {userDetails.currentRole == "Manager" && (
                    <th className="traning-listing">Training Type</th>
                  )}
                  {userDetails.currentRole == "Manager" && (
                    <th className="traning-listing">Start Date</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">Start Date</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">End Date</th>
                  )}
                  {userDetails.currentRole == "Manager" && (
                    <th className="traning-listing">End Date</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">Required Prerequisites</th>
                  )}
                  {userDetails.currentRole == "Manager" && (
                    <th className="traning-listing">Required Prerequisites</th>
                  )}
                  {userDetails.currentRole == "Manager" && (
                    <th className="traning-listing">Nomination End Date</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">Status</th>
                  )}
                  {userDetails.currentRole == "User" && (
                    <th className="traning-listing">Upload Prequisites</th>
                  )}
                  {userDetails.currentRole == "Manager" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "40px" }}
                      >
                        {index + 1}
                      </td>
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "100px" }}
                        >
                          {moment(user.trainingStartDate).format("MMMM")}{" "}
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {moment(user.trainingStartDate).format("DD/MM/YYYY")}
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "150px" }}
                        >
                          {user.trainingName}
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "150px" }}
                        >
                          {user.stream}
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "150px" }}
                        >
                          {user.toolName}
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "100px" }}
                        >
                          {user.nominationCount ? user.nominationCount : 0}{" "}
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "100px" }}
                        >
                          {user.assignedToName}{" "}
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "100px" }}
                        >
                          0
                        </td>
                      )}
                      {userDetails.currentRole == "Admin" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "100px" }}
                        >
                          0
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "100px" }}
                        >
                          {user.assignedByName}{" "}
                        </td>
                      )}
                      {userDetails.currentRole == "Manager" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "150px" }}
                        >
                          {user.trainingName}
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "150px" }}
                        >
                          {user.trainingName}
                        </td>
                      )}
                      {userDetails.currentRole == "Manager" && (
                        <td className="traning-listing">{user.trainingType}</td>
                      )}
                      {userDetails.currentRole == "Manager" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {moment(user.trainingStartDate).format("DD/MM/YYYY")}
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {moment(user.trainingStartDate).format("DD/MM/YYYY")}
                        </td>
                      )}
                      {userDetails.currentRole == "Manager" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                        </td>
                      )}
                      {userDetails.currentRole == "Manager" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {user.trainingPrequisites}
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "130px" }}
                        >
                          {user.trainingPrequisites}
                        </td>
                      )}
                      {userDetails.currentRole == "Manager" && (
                        <td>
                          {moment(user.nominationEndDate).format("DD/MM/YYYY")}
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td
                          className="traning-listing"
                          style={{ minWidth: "150px" }}
                        >
                          {/* {user.acceptRejectStatus == 0 ?
                                        "Pending" : "Completed"
                                    } */}
                          Pending
                        </td>
                      )}
                      {userDetails.currentRole == "User" && (
                        <td>
                          {user.trainingPrequisites != "NA" ? (
                            <div>
                              {user.acceptRejectStatus != "1" ? (
                                <PopUpFileUpload
                                  id={user.id}
                                  userDetails={userDetails}
                                />
                              ) : (
                                "-"
                              )}{" "}
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                      )}
                      {userDetails.currentRole == "Manager" && (
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
                      )}
                    </tr>
                  ))}
                {!users && (
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

export { List };
