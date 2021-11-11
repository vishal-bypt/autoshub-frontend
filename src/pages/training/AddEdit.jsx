import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BackupIcon from "@material-ui/icons/Backup";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Swal from "sweetalert2";
import { layoutTheme } from "../../constants/layout";
import { Role } from "../../helpers";
import { accountService, alertService, trainingService } from "../../services";
// import "../../assets/scss/custom/components/_tableblur.scss";
var FormData = require("form-data");

function AddEdit({ history, match }) {
  const userDetails = accountService.userValue;
  const user = accountService.userValue;
  const [users, setUsers] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectBtn, setSelectBtn] = useState(true);
  const [uploadBtn, setUploadBtn] = useState(false);
  const [successBtn, setSuccessBtn] = useState(false);
  const [errorBtn, setErrorBtn] = useState(false);
  const [slotsEdit, setSlotsEdit] = useState(null);
  const { layoutMode } = useSelector((state) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  useEffect(() => {
    trainingService.getAll().then((x) => setUsers(x));
  }, []);

  const onFileChange = (event) => {
    let file = event.target.files[0];
    console.log("event.target.files:::", event.target.files);
    if (!file)
      alertService.error("Add excel file", { keepAfterRouteChange: false });
    else {
      setSelectedFile(file);
      setSelectBtn(false);
      setUploadBtn(true);
    }
  };

  const handleRedirect = (params, index) => {
    let slots = slotsEdit ? slotsEdit : "N/A";
    let value = { slots };
    trainingService.update(index, value).then((x) => {
      console.log("successfully updated value");
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
      console.log("formData:::", formData);
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
    let slots = e.target.value;
    let value = { slots };
    setSlotsEdit(slots);
    trainingService.update(index, value).then((x) => {
      console.log("successfully updated value");
    });
  }
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="d-flex row justify-content-between">
            <div className="col-md-4">
              <h1 className="font-weight-bold mb-2 text-danger">
                Training Records
              </h1>
            </div>
            <div className="col-md-4 text-end">
              <Link
                to={"/training/uploadFiles"}
                className="btn btn-primary m-1"
              >
                Upload
              </Link>
              <Link to={"."} className="btn btn-danger ">
                <ArrowBackIcon className="mr-1" />
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <div className="card-body">
            <div id="table" className="table-editable  table-responsive">
              <Table
                id="tech-companies-1"
                className="table table-bordered  tableBlur"
              >
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Training Name</Th>
                    <Th>Training Type</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    <Th>Required Prerequisites</Th>
                    <Th>Stream</Th>
                    <Th>Tool Name</Th>
                    <Th>Created</Th>
                    <Th>Nomination End Date</Th>
                    <Th>Slots</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users &&
                    users.map((user, index) => (
                      <Tr key={user.id}>
                        <Td
                          className="pt-3-half"
                          contentEditable="false"
                          style={{ minWidth: "40px" }}
                        >
                          {index + 1}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "40px" }}
                        >
                          {user.trainingName}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "10px" }}
                        >
                          {user.trainingType}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "100px" }}
                        >
                          {moment(user.trainingStartDate).format("DD/MM/YYYY")}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "100px" }}
                        >
                          {moment(user.trainingEndDate).format("DD/MM/YYYY")}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "60px" }}
                        >
                          {user.trainingPrequisites}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "70px" }}
                        >
                          {user.stream}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "40px" }}
                        >
                          {user.toolName}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "50px" }}
                        >
                          {moment(user.created).format("DD/MM/YYYY")}
                        </Td>
                        <Td
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "50px" }}
                        >
                          {moment(user.nominationEndDate).format("DD/MM/YYYY")}
                        </Td>
                        <Td
                          className="traning-listing text-center"
                          contentEditable="false"
                          style={{ maxWidth: "80px" }}
                          onBlur={(e) => updatedValue(e, index + 1)}
                        >
                          <input
                            style={{
                              backgroundColor: "white",
                              maxWidth: "60px",
                              // color:
                              //   layoutMode === layoutTheme.DARKMODE
                              //     ? "#858D98"
                              //     : "#495057",
                              // color:
                              //   layoutMode === layoutTheme.DARKMODE
                              //     ? "#FFFFFA"
                              //     : "#FFFFFF",
                            }}
                            min="0"
                            className="border-0"
                            placeholder={user.slots ? user.slots : "N/A"}
                          />
                        </Td>
                        <Td
                          className="traning-listing"
                          style={{ whiteSpace: "nowrap", minWidth: "30%" }}
                        >
                          {userDetails.currentRole === Role.Admin && (
                            <div>
                              <Link
                                /* onClick={() => handleRedirect(`/training/assign/${user.id}`,index+1)} */
                                to={`/training/assign/${user.id}`}
                                className="btn btn-sm btn-primary mr-1"
                              >
                                Assign
                              </Link>
                            </div>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  {!users && (
                    <tr>
                      <Td colSpan="12" className="text-center">
                        <span className="spinner-border spinner-border-lg align-center"></span>
                      </Td>
                    </tr>
                  )}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export { AddEdit };
