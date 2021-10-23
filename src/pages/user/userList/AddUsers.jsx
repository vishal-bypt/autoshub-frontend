import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BackupIcon from "@material-ui/icons/Backup";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  accountService,
  alertService,
  trainingService,
} from "../../../services";
var FormData = require("form-data");

function AddUsers({ history, match }) {
  const { path } = match;
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectBtn, setSelectBtn] = useState(true);
  const [uploadBtn, setUploadBtn] = useState(false);
  const [successBtn, setSuccessBtn] = useState(false);
  const [errorBtn, setErrorBtn] = useState(false);

  const onFileChange = (event) => {
    let file = event.target.files[0];
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
      create(formData);
    } catch (error) {
      console.log("error == ", error);
    }
  };

  function create(formData) {
    accountService
      .uploadUsersExcel(formData)
      .then((res) => {
        if (res.success) {
          setUploadBtn(false);
          setSuccessBtn(true);
          Swal.fire("Users uploaded successfully.!");
          history.push("/userList");
        } else {
          Swal.fire(res.message);
        }
      })
      .catch((error) => {
        setUploadBtn(false);
        setErrorBtn(true);
        alertService.error(error);
      });
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="d-flex row justify-content-between">
            <div className="col-md-4">
              <h1 className="header-text">Upload User Records</h1>
            </div>

            <div className="col-md-4 text-end">
              <Link to={"."} className="btn btn-danger ">
                <ArrowBackIcon className="mr-1" />
                Back
              </Link>
            </div>
          </div>
          <div className="col text-center my-5">
            <form encType="multipart/form-data">
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
            <div className="variantsPopUpFileUpload">
              {selectBtn && (
                <IconButton
                  onClick={() => {
                    document.getElementById("ExcelFile").click();
                  }}
                >
                  {" "}
                  <div className="filePopUpFileUpload ">
                    <label htmlFor="input-file selectAndUpload">
                      <CloudQueueIcon />
                      &nbsp;SelectFile & Upload
                    </label>
                  </div>
                </IconButton>
              )}
              {uploadBtn && (
                <IconButton onClick={handleSubmit}>
                  <div className="filePopUpFileUpload file--uploadingPopUpFileUpload">
                    <label htmlFor="input-file">
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
                    <label htmlFor="input-file">
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
                    <label htmlFor="input-file">
                      <CloudOffIcon />
                      Error
                    </label>
                  </div>
                </IconButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUsers;
