import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Role } from "../../helpers";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { accountService, trainingService } from "../../services";
import "../../assets/scss/custom/components/_tableblur.scss";

function Trainings({ match }) {
  const userDetails = accountService.userValue;
  const [users, setUsers] = useState(null);
  let filteredData = [];
  useEffect(() => {
    if (userDetails.currentRole === Role.Admin) {
      trainingService.getAll().then((x) => {
        for (let i = 0; i < x.length; i++) {
          if (x[i].assignedByName != null && x[i].assignedToName != null) {
            filteredData.push(x[i]);
          }
        }
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
            <Link to={"."} className="btn btn-danger ">
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
                        {user.assignedToName ? user.assignedToName : "NA"}
                      </td>
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {user.assignedByName ? user.assignedByName : "NA"}
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
                    <Tr key={user.id}>
                      <Td>{index + 1}</Td>
                      <Td>
                        {user.assignedToName ? user.assignedToName : "NA"}
                      </Td>
                      <Td>
                        {user.assignedByName ? user.assignedByName : "NA"}
                      </Td>
                      <Td>{user.trainingName}</Td>
                      <Td>
                        {moment(user.trainingStarTdate).format("DD/MM/YYYY")}
                      </Td>
                      <Td>
                        {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td>{user.trainingPrequisites}</Td>
                    </Tr>
                  ))}
                {!users && (
                  <Tr>
                    <Td colSpan="4" className="text-center">
                      <span className="spinner-border spinner-border-lg align-center"></span>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Trainings };
