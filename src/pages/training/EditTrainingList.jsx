import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { accountService, trainingService } from "../../services";
import { Role } from "../../helpers/role";

function EditTrainingList({ match }) {
  const { path } = match;
  const userDetails = accountService.userValue;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (userDetails.currentRole == Role.Admin) {
      trainingService.getAll().then((x) => {
        setUsers(x);
      });
    }
    if (userDetails.currentRole == Role.User) {
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
            <div className="col-md-6">
              <h1 className="header-text">Trainings</h1>
            </div>
            <div className="col-md-6 text-end">
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
            <table className="table">
              <thead>
                <tr>
                  <th className="traning-listing">#</th>
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EditTrainingList };
