import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { accountService, alertService, trainingService } from "../../services";
import { Role } from "./../../helpers/role";
var FormData = require("form-data");

function AssignUsers({ history, match }) {
  const { id } = match.params;
  const userDetails = accountService.userValue;
  console.log("userDetails == ", userDetails);
  const [users, setUsers] = useState(null);
  const [trainingData, setTrainingData] = useState({});
  const [temp, setTemp] = useState([]);
  const [click, setClick] = useState(true);
  const [checkedUser, setCheckedUser] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  let userDropDownData = [];
  const assignUserIds = [];
  let checkedData = [];
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [perManager, setPerManager] = useState();
  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    if (userDetails.currentRole === Role.Admin) {
      trainingService.getById(id).then((x) => {
        setTrainingData(x);
      });
      accountService.getManagerList().then((x) => {
        setUsers(x);
        x &&
          x.map((userdata, index) => {
            userDropDownData.push({
              label: userdata.firstName + " " + userdata.lastName,
              value: userdata.id,
            });
          });
        setTemp(userDropDownData);
      });
      trainingService.getUserByTrainingId(id).then((x) => {
        x.map((row) => {
          assignUserIds.push(row.assignedTo);
        });
      });
      setAssignedUsers(assignUserIds);
    }
    if (userDetails.currentRole === Role.Manager) {
      console.log("1st");
      trainingService.getUserByTrainingId(id).then((x) => {
        setTrainingData(x[0]);
      });
      console.log("2nd");
      accountService.getUserList().then((x) => {
        setUsers(x);
        x &&
          x.map((userdata, index) => {
            userDropDownData.push({
              label: userdata.firstName + " " + userdata.lastName,
              value: userdata.id,
            });
          });
        setTemp(userDropDownData);
      });
      console.log("3rd");
      trainingService.getUserByTrainingId(id).then((x) => {
        x.map((row) => {
          assignUserIds.push(row.assignedTo);
        });
      });
      setAssignedUsers(assignUserIds);
      console.log("4th");
    }

    let data = parseInt(trainingData?.slots / temp?.length);
    setPerManager(data);
  }, []);

  function create(data) {
    var formData = new FormData();
    formData.append("data1", data);
    trainingService
      .assignTraining(data)
      .then((data) => {
        alertService.success("Success", { keepAfterRouteChange: true });
        Swal.fire("Training Assign successfully.!");
        //trainingService.getAll().then(x => setUsers(x));
      })
      .catch((error) => {
        alertService.error(error);
      });
  }

  function createNomination(data) {
    var formData = new FormData();
    formData.append("data1", data);
    trainingService
      .nominateTraining(data)
      .then((data) => {
        alertService.success("Success", { keepAfterRouteChange: true });
        Swal.fire("Training Nominated successfully.!");
        //trainingService.getAll().then(x => setUsers(x));
      })
      .catch((error) => {
        alertService.error(error);
      });
  }
  function updatedValue(e, index) {
    let value = parseInt(e.target.value);

    for (let i = 0; i < temp.length; i++) {
      if (index - 1 === i) {
        temp[i].numberOfTraining = value;
      }
    }
    let totalSlot = trainingData.slots;
    let minus = totalSlot - e.target.placeholder;
    let lastValue = minus + value;

    setFinalValue(lastValue);
    if (lastValue > totalSlot || lastValue < totalSlot) {
      setClick(false);
    }
  }

  useEffect(() => {
    console.log("6th");
    if (userDetails.currentRole === Role.Admin) {
      if (trainingData.slots) {
        let slotData = parseInt(trainingData?.slots / temp?.length);
        let userData = [];
        setPerManager(slotData);
        let totalAssignedTraining = slotData * temp?.length;
        for (let i = 0; i < temp?.length; i++) {
          let data = temp[i];
          data = {
            numberOfTraining: slotData ? slotData : 0,
            managerName: temp[i].label,
            id: temp[i].value,
            trainingId: parseInt(id),
          };
          userData[i] = data;
        }
        setTemp(userData);
        let diffenceInSlot = 0;
        if (trainingData?.slots) {
          diffenceInSlot = trainingData.slots - totalAssignedTraining;
        }

        let modifiedData = userData;
        if (diffenceInSlot > 0) {
          for (let j = 0; j < userData?.length; j++) {
            if (diffenceInSlot <= 0) {
              break;
            }
            let data = userData[j];
            data = {
              managerName: userData[j].managerName,
              numberOfTraining: (slotData ? slotData : 0) + 1,
              id: userData[j].id,
              trainingId: parseInt(id),
            };
            modifiedData[j] = data;
            diffenceInSlot--;
          }
          setTemp(modifiedData);
        } else {
          setTemp(modifiedData);
        }
      } else {
        let userData = [];
        setPerManager("N/A");
        for (let i = 0; i < temp?.length; i++) {
          let data = temp[i];
          data = {
            numberOfTraining: 0,
            managerName: temp[i].label,
            trainingId: parseInt(id),
            id: temp[i].value,
          };
          userData[i] = data;
        }
        setTemp(userData);
      }
    } else if (userDetails.currentRole === Role.Manager) {
      console.log("7th");
      if (trainingData.assignedSlots >= 0) {
        let userData = [];
        for (let i = 0; i < temp?.length; i++) {
          let data = temp[i];
          data = {
            userName: temp[i].label,
            id: temp[i].value,
            trainingId: parseInt(id),
          };
          userData[i] = data;
        }
        setTemp(userData);
      } else {
        console.log("in else of manager");
        let userData = [];
        console.log("temp == ", temp);
        for (let i = 0; i < temp?.length; i++) {
          let data = temp[i];
          console.log("temp[i] == ", data);
          data = {
            numberOfTraining: 0,
            userName: temp[i].label,
            trainingId: parseInt(id),
            id: temp[i].value,
          };
          userData[i] = data;
        }
        console.log("userData == ", userData);
        setTemp(userData);
      }
    }
  }, [trainingData]);

  const handleChange = (e) => {
    if (userDetails.currentRole === Role.Admin) {
      const { name, checked } = e.target;
      if (name === "allSelect") {
        let tempUser = temp.map((user) => {
          return { ...user, isChecked: checked };
        });
        for (let i = 0; i < tempUser?.length; i++) {
          if (tempUser[i].isChecked === true) {
            checkedData.push(tempUser[i]);
          }
        }
        setTemp(tempUser);
        setCheckedUser(tempUser);
        if (checkedData.length > trainingData?.assignedSlots) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        setCheckedUser(tempUser);
      } else {
        let tempUser = temp.map((user) =>
          user.managerName === name ? { ...user, isChecked: checked } : user
        );
        for (let i = 0; i < tempUser?.length; i++) {
          if (tempUser[i].isChecked === true) {
            checkedData.push(tempUser[i]);
          }
        }
        setTemp(tempUser);
        setCheckedUser(checkedData);
        if (checkedData.length > trainingData?.assignedSlots) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
      }
    } else if (userDetails.currentRole === Role.Manager) {
      const { name, checked } = e.target;
      if (name === "allSelect") {
        let tempUser = temp.map((user) => {
          return { ...user, isChecked: checked };
        });
        for (let i = 0; i < tempUser?.length; i++) {
          if (tempUser[i].isChecked === true) {
            checkedData.push(tempUser[i]);
          }
        }
        setTemp(tempUser);
        setCheckedUser(checkedData);
        if (trainingData?.assignedSlots > 0) {
          if (checkedData.length > trainingData?.assignedSlots) {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
          }
        } else if (trainingData?.assignedSlots === 0) {
          setIsDisabled(false);
        }

        setCheckedUser(tempUser);
      } else {
        console.log("temp == > ", temp);
        let tempUser = temp.map((user) =>
          user.userName === name ? { ...user, isChecked: checked } : user
        );
        for (let i = 0; i < tempUser?.length; i++) {
          console.log("tempuser == ", tempUser);
          if (tempUser[i].isChecked === true) {
            tempUser[i].nominatedBy = userDetails.id;
            tempUser[i].nominatedTo = tempUser[i].id;
            checkedData.push(tempUser[i]);
          }
        }
        setTemp(tempUser);
        setCheckedUser(checkedData);
        if (trainingData?.assignedSlots === 0) {
          setIsDisabled(false);
        } else if (checkedData.length > trainingData?.assignedSlots) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
      }
    }
  };

  function submitClick(e) {
    try {
      e.preventDefault();
      if (userDetails.currentRole === "Admin") {
        create(checkedUser);
      } else {
        //trainingServiceconsole.log("checkedUser == ",checkedUser)
        createNomination(checkedUser);
      }
    } catch (error) {
      console.log("error == ", error);
    }
  }

  console.log("temp == ", temp);
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-end">
            <Link to={"/training/add"} className="btn btn-danger ">
              <ArrowBackIcon className="mr-1" />
              Back
            </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
          Assign Training
        </h3>
        <div className="card-header">
          {userDetails.currentRole === Role.Admin && (
            <h6>
              Total number of Slots:-{" "}
              <b>{trainingData?.slots ? trainingData.slots : "N/A"}</b>
            </h6>
          )}
          {userDetails.currentRole === Role.Manager && (
            <h6>
              Total number of Slots:-{" "}
              <b>
                {trainingData?.assignedSlots
                  ? trainingData.assignedSlots
                  : "N/A"}
              </b>
            </h6>
          )}
          {userDetails.currentRole === Role.Admin && (
            <h6>
              Total Reporting Managers:-{" "}
              <b>{temp?.length ? temp.length : "N/A"}</b>
            </h6>
          )}
          {userDetails.currentRole === Role.Manager && (
            <h6>
              Total Reporting Employees:-{" "}
              <b>{temp?.length ? temp.length : "N/A"}</b>
            </h6>
          )}
          {userDetails.currentRole === Role.Admin && (
            <h6>
              Slot for each reporing manager :-{" "}
              <b>{Math.floor(perManager ? perManager : 0)}</b>&nbsp;
            </h6>
          )}
        </div>
      </div>
      <div className="card-body mt-5">
        <div id="table" className="table-editable">
          <table className="table table-bordered table-responsive-md  text-center">
            <thead>
              <tr>
                <th className="traning-listing">#</th>
                {userDetails.currentRole === Role.Admin && (
                  <th className="traning-listing">Manager Name</th>
                )}
                {userDetails.currentRole === Role.Manager && (
                  <th className="traning-listing">User Name</th>
                )}
                {userDetails.currentRole === Role.Admin && (
                  <th className="traning-listing">Assigned Training</th>
                )}
                <th
                  className="traning-listing form-check"
                  style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                >
                  <input
                    type="checkbox"
                    /*  className="form-check-input"  */
                    name="allSelect"
                    checked={!temp.some((user) => user?.isChecked !== true)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label ms-2">All Select</label>
                </th>
              </tr>
            </thead>
            <tbody>
              {temp &&
                temp.map((user, index) => (
                  <tr key={index}>
                    <td
                      className="pt-3-half"
                      contentEditable={false}
                      style={{ minWidth: "40px" }}
                    >
                      {index + 1}
                    </td>
                    {userDetails.currentRole === Role.Admin && (
                      <td
                        className="traning-listing"
                        contentEditable={false}
                        style={{ minWidth: "40px" }}
                      >
                        {user.managerName}
                      </td>
                    )}
                    {userDetails.currentRole === Role.Manager && (
                      <td
                        className="traning-listing"
                        contentEditable={false}
                        style={{ minWidth: "40px" }}
                      >
                        {user.userName}
                      </td>
                    )}
                    {userDetails.currentRole === Role.Admin && (
                      <div>
                        {user.numberOfTraining > 0 ? (
                          <td
                            className="traning-listing"
                            contentEditable={false}
                            style={{ minWidth: "150px" }}
                            onBlur={(e) => updatedValue(e, index + 1)}
                          >
                            <input
                              disabled
                              type="number"
                              min="0"
                              className="border-0"
                              placeholder={
                                user.numberOfTraining
                                  ? user.numberOfTraining
                                  : "N/A"
                              }
                            />
                          </td>
                        ) : (
                          <td
                            className="traning-listing"
                            contentEditable={false}
                            style={{ minWidth: "150px" }}
                          >
                            <input
                              disabled
                              placeholder={
                                user.numberOfTraining
                                  ? user.numberOfTraining
                                  : "N/A"
                              }
                            />
                          </td>
                        )}
                      </div>
                    )}
                    {userDetails.currentRole === Role.Admin && (
                      <td
                        className="traning-listing"
                        style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                      >
                        <div className="form-check" key={index}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={user.managerName}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                          />
                        </div>
                      </td>
                    )}
                    {userDetails.currentRole === Role.Manager && (
                      <td
                        className="traning-listing"
                        style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                      >
                        <div className="form-check" key={index}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={user.userName}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="text-end mt-3">
            <button
              type="submit"
              onClick={submitClick}
              className="btn btn-warning"
              disabled={isDisabled}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AssignUsers };
