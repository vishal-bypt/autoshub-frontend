import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { accountService, trainingService } from "../../services";
import { Role } from "../../helpers/role";
import "../../assets/scss/custom/components/_tableblur.scss";

function EditTrainingList({ match }) {
  const userDetails = accountService.userValue;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (userDetails.currentRole === Role.Admin) {
      trainingService.getAll().then((x) => {
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
    <div>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-end font-weight-bold mb-5 text-danger">Trainings</h1>
            </div>
            <div className="col-md-5 text-end">
              <Link to={"."} className="btn btn-danger">
                <ArrowBackIcon className="mr-1" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="data-table-div">
        <div className="data-table">
          <div className="table-responsive">
            {/* <table className="table ">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="traning-listing">Training Name</th>
                  <th className="traning-listing">Start Date</th>
                  <th className="traning-listing">End Date</th>
                  <th className="traning-listing">Required Prerequisites</th>
                  <th className="traning-listing">Status</th>
                  <th className="traning-listing"></th>
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
                      <td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        Pending
                      </td>
                      <td
                        className="traning-listing"
                        style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                      >
                        {userDetails.currentRole === Role.Admin && (
                          <div>
                            <Link
                              to={`/training/edit/${user.id}`}
                              className="btn btn-warning"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
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
                <tr>
                  <Th>#</Th>
                  <Th>Training Name</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                  <Th>Required Prerequisites</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </Thead>
              <Tbody>
              {users &&
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <Td
                        className="traning-listing"
                        style={{ minWidth: "40px" }}
                      >
                        {index + 1}
                      </Td>
                      <Td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {user.trainingName}
                      </Td>
                      <Td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {moment(user.trainingStartDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        {user.trainingPrequisites}
                      </Td>
                      <Td
                        className="traning-listing"
                        style={{ minWidth: "200px" }}
                      >
                        Pending
                      </Td>
                      <Td
                        className="traning-listing"
                        style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                      >
                        {userDetails.currentRole == Role.Admin && (
                          <div>
                            <Link
                              to={`/training/edit/${user.id}`}
                              className="btn btn-warning"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </Td>
                    </tr>
                  ))}
                {!users && (
                  <Tr>
                    <Td colSpan="8" className="text-center">
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

export { EditTrainingList };
