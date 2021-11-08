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
    let value = {slots}   
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
            {/* <form encType="multipart/form-data">
                <div className="form-group col-12 mt-2 p-0">
                  <input
                    type="file"
                    display="none"
                    name=""
                    id="ExcelFile"
                    className="form-control"
                    onChange={onFileChange}
                    hidden
                  />
                </div>
              </form>
              <div className="variantsPopUpFileUpload text-end">
                {selectBtn && (
                  <IconButton
                    onClick={() => {
                      document.getElementById("ExcelFile").click();
                    }}
                  >
                    <div className="filePopUpFileUpload text-white bg-danger p-2">
                      <label htmlFor="input-file selectAndUpload">
                        <CloudQueueIcon />
                        &nbsp;SelectFile & upload
                      </label>
                    </div>
                  </IconButton>
                )}
                {uploadBtn && (
                  <IconButton onClick={handleSubmit}>
                    <div className="filePopUpFileUpload file--uploadingPopUpFileUpload">
                      <label htmlFor="input-file text-white">
                        <BackupIcon />
                        Upload
                      </label>
                    </div>
                  </IconButton>
                )}

                {successBtn && (
                  <IconButton
                    onClick={() => {
                      setSuccessBtn(false);
                      setSelectBtn(true);
                    }}
                  >
                    <div className="filePopUpFileUpload file--successPopUpFileUpload">
                      <label htmlFor="input-file text-white">
                        <CloudDoneIcon />
                        Success
                      </label>
                    </div>
                  </IconButton>
                )}

                {errorBtn && (
                  <IconButton
                    onClick={() => {
                      setErrorBtn(false);
                      setSelectBtn(true);
                    }}
                  >
                    <div className="filePopUpFileUpload file--dangerPopUpFileUpload">
                      <label htmlFor="input-file text-white">
                        <CloudOffIcon />
                        Error
                      </label>
                    </div>
                  </IconButton>
                )}
              </div> */}
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
        {/* <div className="data-table-div">
                    <div className="data-table">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>                                        
                                        <th className="traning-listing" >#</th>
                                        <th className="traning-listing" >Training Name</th>
                                        <th className="traning-listing" >Training Type</th>
                                        <th className="traning-listing" >Start Date</th>
                                        <th className="traning-listing" >End Date</th>
                                        <th className="traning-listing" >Required Prerequisites</th>
                                        <th className="traning-listing" >Stream</th>
                                        <th className="traning-listing" >Tool Name</th>
                                        <th className="traning-listing" >Created</th>
                                        <th className="traning-listing" >Nomination End Date</th>
                                        <th className="traning-listing" >Vacancies</th>                                        
                                        <th className="traning-listing" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users && users.map((user, index) =>
                                    
                                        <tr key={user.id}>                                           
                                            <td className="traning-listing" style={{ minWidth: '40px' }}>{index + 1}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }} >{user.trainingName}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{user.trainingType}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '120px' }}>{user.trainingPrequisites}</td>
                                            <td className="traning-listing" style={{ minWidth: '75px' }}>{user.stream}</td>
                                            <td className="traning-listing" style={{ minWidth: '100px' }}>{user.toolName}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.created).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>
                                            <div className="table-editable">
                                                <td className="traning-listing" style={{ minWidth: '150px' }} ><AllInclusive/></td>
                                            </div>
                                            
                                            <td className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                                {userDetails.role == "Admin" && <div >
                                                    <Link to={`/training/assign/${user.id}`} className="btn btn-sm btn-primary mr-1">Assign</Link>
                                                </div>}
                                            </td>
                                        </tr>                                    
                                )
                                }
                                {!users &&
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <span className="spinner-border spinner-border-lg align-center"></span>
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
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
                          className="traning-listing"
                          contentEditable="false"
                          style={{ maxWidth: "50px" }}
                          onBlur={(e) => updatedValue(e, index + 1)}
                        >
                          <input
                            style={{
                              backgroundColor: "transparent",
                              maxWidth: "80px",
                              color:
                                layoutMode === layoutTheme.DARKMODE
                                  ? "#858D98"
                                  : "#495057",
                            }}
                            type="number"
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
