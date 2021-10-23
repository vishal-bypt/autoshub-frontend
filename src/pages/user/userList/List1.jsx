import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { accountService } from "../../../services";

function List({ history, match }) {
  const { path } = match;
  const userDetails = accountService.userValue;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUser();
  }, []);

  function getAllUser() {
    accountService.getAll().then((data) => {
      setUsers(data.accounts);
    });
  }
  const openAddEditUser = (user) => {
    history.push("/userList/editUser", { user: user });
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1 className="header-text">UserList</h1>
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
                  <th className="user-listing">Email</th>
                  <th className="user-listing">First Name</th>
                  <th className="user-listing">Last Name</th>
                  <th className="user-listing">Manager Id</th>
                  <th className="user-listing">Emp Id</th>
                  <th className="user-listing">Exce Id</th>
                  <th className="user-listing"></th>
                  {userDetails.role == "Manager" && <th></th>}
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="user-listing" style={{ minWidth: "40px" }}>
                        {index + 1}
                      </td>
                      <td
                        className="user-listing"
                        style={{ minWidth: "100px" }}
                      >
                        {user.email}
                      </td>
                      <td
                        className="user-listing"
                        style={{ minWidth: "130px" }}
                      >
                        {user.firstName}
                      </td>
                      <td
                        className="user-listing"
                        style={{ minWidth: "130px" }}
                      >
                        {user.lastName}
                      </td>
                      <td
                        className="user-listing"
                        style={{ minWidth: "150px" }}
                      >
                        {user.managerId || "N/A"}
                      </td>
                      <td
                        className="user-listing"
                        style={{ minWidth: "150px" }}
                      >
                        {user.empId || "N/A"}
                      </td>
                      <td
                        className="user-listing"
                        style={{ minWidth: "150px" }}
                      >
                        {user.execId || "N/A"}
                      </td>
                      <td
                        className="user-listing"
                        style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                      >
                        <div>
                          {/* <Link
                              to={`/userList/edit/${user.id}`}
                              className="btn btn-warning"
                            > */}
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => openAddEditUser(user)}
                          >
                            Edit
                          </button>
                          {/* </Link> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                {!users && (
                  <tr>
                    <td colSpan="8" className="text-center">
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

export default List;
