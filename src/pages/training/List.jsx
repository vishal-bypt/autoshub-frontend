import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Refresh from "@material-ui/icons/Refresh";
import moment from "moment";
import { accountService, trainingService, alertService } from "../../services";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import PopUpFileUpload from "./PopUpFileUpload";
import { Role } from "./../../helpers/role";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../../assets/scss/custom/components/_tableblur.scss"
function List1({ history, match }) {
  const { path } = match;
  //const [userDetails, setUserDetails]=useState({});
  const userDetails = accountService.userValue;
  console.log("userValue == ", accountService.userValue);

  //console.log("userDetails role == ", userDetails.currentRole);
  const [trainings, setTrainings] = useState(null);
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
      trainingService.listTaskToUser().then((x) => {
        x.map((data) => {
          x = data.training;
          x.assignedByName = `${data.assignBy.firstName}  ${data.assignBy.lastName}`;
          x.assignedToName = `${data.assignTo.firstName}  ${data.assignTo.lastName}`;
          x.acceptRejectStatus = data.acceptRejectStatus;
          userData.push(x);
        });
        setTrainings(userData);
      });
    }
  }, [userDetails]);

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
        setTrainings(filteredData);
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
        setTrainings(filteredData);
      });
      history.push("/training");
    });
  };
  console.log("details = ", userDetails);
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            {userDetails?.currentRole == Role.Admin && (
              <h1 className="header-text">Trainings</h1>
            )}
            {userDetails?.currentRole == Role.User && (
              <h1 className="header-text">My Trainings</h1>
            )}
            {userDetails?.currentRole == Role.Manager && (
              <h1 className="header-text">Trainings</h1>
            )}
          </div>
          <div className="col-md-6 text-end">
            {userDetails?.currentRole == Role.Admin && (
              <>
                <Link to={`/training/add`} className="btn btn-primary">
                  Upload Trainings
                </Link>
                <Link
                  to={`/training/editList`}
                  className="btn btn-primary ml-1"
                >
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
                <Link to={`/training`} className="btn btn-primary ml-1">
                  <Refresh />
                </Link>
              </>
            )}
            {userDetails?.currentRole == Role.Manager && (
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
        {/* <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          > */}
            {/* <table className="table"> */}
              {/* <thead>
                <tr>
                  <th>#</th>
                  {userDetails?.currentRole == Role.Admin && (
                    <>
                      <th>Month</th>
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
              </thead> */}
              {/* <tbody>
                {trainings &&
                  trainings.map((user, index) => (
                    <tr key={user.id}>
                      <Td className="traning-listing">{index + 1}</Td> */}
                      {/* {userDetails?.currentRole == Role.Admin && (
                        // <>
                        //   <td className="traning-listing">
                        //     {moment(user.trainingStartDate).format("MMMM")}{" "}
                        //   </td>
                        //   <td className="traning-listing">
                        //     {moment(user.trainingStartDate).format(
                        //       "DD/MM/YYYY"
                        //     )}
                        //   </td>
                        //   <td className="traning-listing">
                        //     {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                        //   </td>
                        //   <td className="traning-listing">
                        //     {user.trainingName}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "150px" }}
                        //   >
                        //     {user.stream}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "150px" }}
                        //   >
                        //     {user.toolName}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "100px" }}
                        //   >
                        //     {user.nominationCount ? user.nominationCount : 0}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "100px" }}
                        //   >
                        //     0
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "100px" }}
                        //   >
                        //     0
                        //   </td>
                        // </>
                      )} */}

                     {/*   {userDetails?.currentRole == Role.User && (
                        // <>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "100px" }}
                        //   >
                        //     {user.assignedToName}{" "}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "100px" }}
                        //   >
                        //     {user.assignedByName}{" "}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "150px" }}
                        //   >
                        //     {user.trainingName}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "130px" }}
                        //   >
                        //     {moment(user.trainingStartDate).format(
                        //       "DD/MM/YYYY"
                        //     )}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "130px" }}
                        //   >
                        //     {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "130px" }}
                        //   >
                        //     {user.trainingPrequisites}
                        //   </td>
                        //   <td
                        //     className="traning-listing"
                        //     style={{ minWidth: "150px" }}
                        //   >
                        //     {/* {user.acceptRejectStatus == 0 ?
                        //                   "Pending" : "Completed"
                        //               } */}
                        {/* //     Pending */}
                        {/* //   </td> */}
                        {/* //   <td> */}
                        {/* //     {user.trainingPrequisites != "NA" ? ( */}
                        {/* //       <div> */}
                        {/* //         {user.acceptRejectStatus != "1" ? ( */}
                        {/* //           <PopUpFileUpload */}
                        {/* //             id={user.id} */}
                        {/* //             userDetails={userDetails} */}
                        {/* //           /> */}
                        {/* //         ) : ( */}
                        {/* //           "-" */}
                        {/* //         )}{" "} */}
                        {/* //       </div> */}
                        {/* //     ) : (
                        //       "-"
                        //     )}
                        //   </td> */}
                        {/* // </>
                      )} */}

                      {/* {userDetails?.currentRole == Role.Manager && ( */}
                        {/* <>
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
                        </> */}
                      {/* )} */}
                    {/* </tr> */}
                  {/* ))} */}
                {/* {!trainings && (
                  <tr>
                    <td colSpan="10" className="text-center">
                      <span className="spinner-border spinner-border-lg align-center"></span>
                    </td>
                  </tr>
                )} */}
              {/* </tbody>
            </table> */}
            <Table
              id="tech-companies-1"
              
              className="table  table-bordered tableBlur"
            >
              <Thead>
                <Tr>
                  {userDetails?.currentRole == Role.Admin && (
                    <>
                      <Th >#</Th>
                      <Th>Month</Th>
                      <Th >Start Date</Th>
                      <Th data-priority="3">End Date</Th>
                      <Th >Training Name</Th>
                      <Th data-priority="3">Stream</Th>
                      <Th data-priority="3"> Tool Name</Th>
                      <Th data-priority="3">No. of Nominations</Th>
                      <Th data-priority="3">No. of Attended</Th>
                      <Th data-priority="3">No. of Absentees</Th>
                    </>
                  )}
                  {userDetails?.currentRole == Role.Manager && (
                    <>
                      <Th >#</Th>

                      <Th >Training Name</Th>
                      <Th >Training Type</Th>
                      <Th >Start Date</Th>
                      <Th >End Date</Th>
                      <Th >Required Prerequisites</Th>
                      <Th >Nomination End Date</Th>
                      <Th ></Th>
                    </>
                  )}
                  {userDetails?.currentRole == Role.User && (
                    <>
                      <Th >#</Th>

                      <Th >Nominated Employee</Th>
                      <Th >Nominated By</Th>
                      <Th >Training Name</Th>
                      <Th >Start Date</Th>
                      <Th >End Date</Th>
                      <Th >Required Prerequisites</Th>
                      <Th >Status</Th>
                      <Th >Upload Prequisites</Th>
                    </>
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {trainings &&
                  trainings.map((user, index) => (
                    <Tr key={user.id}>
                         <Td><span className="co-name">{index + 1}</span></Td>

                      {userDetails?.currentRole == Role.Admin && (
                        <React.Fragment>
                          {/* <Th><span className="co-name">{index + 1}</span></Th> */}
                          <Td>
                            {moment(user.trainingStartDate).format("MMMM")}
                          </Td>
                          <Td>
                            {moment(user.trainingStartDate).format(
                              "DD/MM/YYYY"
                            )}
                          </Td>
                          <Td>
                            {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                          </Td>
                          <Td>{user.trainingName}</Td>
                          <Td>{user.stream}</Td>
                          <Td>{user.toolName}</Td>
                          <Td>
                            {user.nominationCount ? user.nominationCount : 0}
                          </Td>
                          <Td>0</Td>
                          <Td>0</Td>
                        </React.Fragment>
                      )}

                      {userDetails?.currentRole == Role.User && (
                        <React.Fragment>
                          {/* <Th><span className="co-name">{index + 1}</span></Th> */}

                          <Td>{user.assignedToName} </Td>
                          <Td>{user.assignedByName} </Td>
                          <Td>{user.trainingName}</Td>
                          <Td>
                            {moment(user.trainingStartDate).format(
                              "DD/MM/YYYY"
                            )}
                          </Td>
                          <Td>
                            {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                          </Td>
                          <Td>{user.trainingPrequisites}</Td>
                          <Td>
                            {/* {user.acceptRejectStatus == 0 ?
                                          "Pending" : "Completed"
                                      } */}
                            Pending
                          </Td>
                          <Td>
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
                          </Td>
                        </React.Fragment>
                      )}

                      {userDetails?.currentRole == Role.Manager && (
                        <React.Fragment>
                       
                          <Td>{user.trainingName}</Td>
                          <Td>{user.trainingType}</Td>
                          <Td>
                            {moment(user.trainingStartDate).format(
                              "DD/MM/YYYY"
                            )}
                          </Td>
                          <Td>
                            {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                          </Td>
                          <Td>{user.trainingPrequisites}</Td>
                          <Td>
                            {moment(user.nominationEndDate).format(
                              "DD/MM/YYYY"
                            )}
                          </Td>
                          <Td>
                            <Link
                              to={`/training/assign/${user.id}`}
                              className="btn btn-warning" 
                            >
                              Nominate
                            </Link>
                          </Td>
                        </React.Fragment>
                      )}
                    </Tr>
                  ))}
                {/* {!trainings && (
                  <Tr>
                    <Td colSpan="10" className="text-center">
                      <span className="spinner-border spinner-border-lg align-center"></span>
                    </Td>
                  </Tr>
                )} */}
              </Tbody>
            </Table>
            
          {/* </div>
        </div> */}
      </div>
    </div>
  );
}

export { List1 };
