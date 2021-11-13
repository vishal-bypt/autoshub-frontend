import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Role } from "../../helpers";
import { accountService, trainingService } from "../../services";

import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../assets/scss/custom/components/_tableblur.scss";

function GetTrainingByRole({ match }) {
  const userDetails = accountService.userValue;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (
      userDetails.currentRole === Role.Admin ||
      userDetails.currentRole === Role.Manager
    ) {
      trainingService.getTrainingByRole().then((x) => {
        setUsers(x);
      });
    }
    if (userDetails.currentRole === Role.User) {
      let userData = [];
      trainingService.listTaskToUser().then((x) => {
        x.map((data) => {
          x = data.training;
          userData.push(x);
        });
        setUsers(userData);
      });
    }
  }, []);
  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    trainingService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-7">
            <h1 className="text-end font-weight-bold mb-5 text-danger">My Trainings</h1>
          </div>
          <div className="col-md-5 text-end">
            <Link to={"/training/list"} className="btn btn-danger ">
              <ArrowBackIcon className="mr-1" />
              Back
            </Link>
          </div>          
        </div>        
      </div>
      <div className="data-table-div">
        <div className="data-table">
          <div className="table-responsive">
            {/* <table className="table">
              <thead>
                <tr>
                  <th className="traning-listing">#</th>
                  <th className="traning-listing">Nominated Employee</th>
                  <th className="traning-listing">Nominated By</th>
                  <th className="traning-listing">Training Name</th>
                  <th className="traning-listing">Start Date</th>
                  <th className="traning-listing">End Date</th>
                  <th className="traning-listing">Required Prerequisites</th>
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
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {user.assignedToName}
                      </td>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {user.assignedByName}
                      </td>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {user.trainingName}
                      </td>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {moment(user.trainingStartDate).format("DD/MM/YYYY")}
                      </td>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                      </td>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {user.trainingPrequisites}
                      </td>
                    </tr>
                  ))}
                {!users && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <span className="spinner-border spinner-border-lg align-center"></span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}
            <Table
              id="tech-companies-1"
              className="table tableBlur table-bordered"
            >
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Nominated Employee</Th>
                  <Th>Nominated By</Th>
                  <Th>Training Name</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                  <Th>Required Prerequisites</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users &&
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <Td>{index + 1}</Td>
                      <Td>{user.assignedToName}</Td>
                      <Td>{user.assignedByName}</Td>
                      <Td>{user.trainingName}</Td>
                      <Td>
                        {moment(user.trainingStartDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td>
                        {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td>{user.trainingPrequisites}</Td>
                    </tr>
                  ))}
                {!users && (
                  <tr>
                    <Td colSpan="4" className="text-center">
                      <span className="spinner-border spinner-border-lg align-center"></span>
                    </Td>
                  </tr>
                )}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { GetTrainingByRole }
