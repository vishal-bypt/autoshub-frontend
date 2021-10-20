import React, { useEffect, useState } from "react";
import cellEditFactory from "react-bootstrap-table2-editor";
import moment from "moment";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AllInclusive from "@material-ui/icons/AllInclusive";
import BootstrapTable from "react-bootstrap-table-next";
import { trainingService, accountService, alertService } from "../../services";
import Swal from "sweetalert2";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import BackupIcon from "@material-ui/icons/Backup";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import { IconButton } from "@material-ui/core";
var FormData = require("form-data");

function AssignUsers({ history, match }) {
  const { id } = match.params;
  const userDetails = accountService.userValue;
  const user = accountService.userValue;
  const [users, setUsers] = useState(null);
  const [trainingData, setTrainingData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectBtn, setSelectBtn] = useState(true);
  const [temp, setTemp] = useState(null);
  const [uploadBtn, setUploadBtn] = useState(false);
  const [successBtn, setSuccessBtn] = useState(false);
  const [errorBtn, setErrorBtn] = useState(false);
  let userDropDownData = [];
  const assignUserIds = [];
  const [assignedUsers, setAssignedUsers] = useState(null);
  const [perManager, setPerManager] = useState();

  useEffect(() => {
    if (userDetails.role == "Admin") {
      getManagerList();
    }
  }, []);

  const getManagerList = async () => {
    await accountService.getManagerList().then(async (x) => {
      x.map((userdata) => {
        userDropDownData.push({
          label: userdata.firstName + " " + userdata.lastName,
          value: userdata.id,
        });
      });
      setUsers(x);
      setTemp(userDropDownData);
      if (userDropDownData && userDropDownData.length > 0) {
        let temp = userDropDownData;
        let slotData = parseInt(50 / temp.length);
        setPerManager(slotData);
        let userData = [];
        for (let i = 0; i < temp.length; i++) {
          let data = temp[i];
          data = {
            numberOfTraining: slotData ? slotData : 0,
            managerName: temp[i].label,
          };
          userData.push(data);
        }

        let diffenceInSlot = 0;
        let totalAssignedTraining = slotData * temp.length;
        diffenceInSlot = 50 - totalAssignedTraining;

        if (diffenceInSlot > 0) {
          for (let j = 0; j < userData.length; j++) {
            if (diffenceInSlot <= 0) {
              break;
            }
            let data = userData[j];
            data.numberOfTraining = data.numberOfTraining + 1;
            diffenceInSlot--;
          }
          setTemp(userData);
        }
      }
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      var formData = new FormData();
      if (!selectedFile) {
        return Swal.fire("Oops...", "Please attach excel file!", "error");
      }
      formData.append("filePath", selectedFile); //append the values with key, value pair
      create(formData, user.id);
    } catch (error) {
      console.log("error == ", error);
    }
  };

  function create(formData, id) {
    trainingService
      .uploadExcel(formData, id)
      .then((data) => {
        setUploadBtn(false);
        setSuccessBtn(true);
        alertService.success("Success", { keepAfterRouteChange: true });
        Swal.fire("Training uploaded successfully.!");
        trainingService.getAll().then((x) => setUsers(x));
      })
      .catch((error) => {
        setUploadBtn(false);
        setErrorBtn(true);
        alertService.error(error);
      });
  }
  function updatedValue(e, index) {
    console.log("index == ", index);
    console.log("e -- ", e);
    let value = e.target.value;
    trainingService.update(index, value).then((x) => {
      console.log("x == ", x);
      console.log("successfully updated value");
    });
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-end">
              <Link to={"."} className="btn btn-danger ">
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
            <h6>
              Total number of Slots:- <b>{"50"}</b>
            </h6>
            <h6>
              Total Reporting Managers:-{" "}
              <b>{temp?.length ? temp.length : "N/A"}</b>
            </h6>
            <h6>
              Slot for each reporing manager :-{" "}
              <b>{Math.floor(perManager ? perManager : 0)}</b>&nbsp;
            </h6>
          </div>
          <div className="card-body">
            <div id="table" className="table-editable">
              {/*  <span class="table-add float-right mb-3 mr-2"><a href="#!" class="text-success"
                            ><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a
                                ></span> */}
              <table className="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                  <tr>
                    <th className="traning-listing">#</th>
                    <th className="traning-listing">Manager Name</th>
                    <th className="traning-listing">Assigned Training</th>
                  </tr>
                </thead>
                <tbody>
                  {temp &&
                    temp.map((user, index) => (
                      <tr key={user.id}>
                        <td
                          className="pt-3-half"
                          contentEditable="false"
                          style={{ minWidth: "40px" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ minWidth: "40px" }}
                        >
                          {user.trainingName}
                        </td>
                        {/* <td className="traning-listing" contentEditable="true" style={{ minWidth: '150px' }}>{user.trainingType}</td>  */}
                        <td
                          className="traning-listing"
                          contentEditable="true"
                          style={{ minWidth: "150px" }}
                          onBlur={(e) => updatedValue(e, index + 1)}
                        >
                          <input
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
                        <td
                          className="traning-listing"
                          style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                        >
                          {userDetails.role == "Admin" && (
                            <div>
                              <Link
                                to={`/training/assign/${user.id}`}
                                className="btn btn-sm btn-primary mr-1"
                              >
                                Assign
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
    </>
  );
}

export { AssignUsers };
