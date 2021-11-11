import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import BackupIcon from "@material-ui/icons/Backup";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import React from "react";
import { alertService, rfcService } from "../../services";

var FormData = require("form-data");
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function PopUpFileUpload({ id, userDetails }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [selectFileBtn, setSelectFileBtn] = React.useState(true);
  const [uploadingBtn, setUploadingBtn] = React.useState(false);
  const [successBtn, setSuccessBtn] = React.useState(false);
  const [errorBtn, setErrorBtn] = React.useState(false);
  const [fileNameDisplay, setFileNameDisplay] = React.useState(``);
  console.log(id, userDetails);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const fileSelect = (e) => {
    // alert('file select')
    // debugger
    if (e.target.files[0]) {
      console.log("e.target.files[0] == ", e.target.files[0]);
      console.log(
        "JSON.stringify(userDetails) == ",
        JSON.stringify(userDetails)
      );
      var re = /(?:\.([^.]+))?$/;
      var ext = re.exec(e.target.files[0].name)[1];
      if (
        ext === `xls` ||
        ext === `xlsx` ||
        ext === `png` ||
        ext === `jpg` ||
        ext === `jpeg` ||
        ext === `PNG` ||
        ext === `doc` ||
        ext === `docx` ||
        ext === `pdf` ||
        ext === `xlsx`
      ) {
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("fileName", e.target.files[0].name);
        formData.append("userDetails", JSON.stringify(userDetails));
        formData.append("id", id);
        //formData.append('trainingId',)
        setFileNameDisplay(e.target.files[0].name);
        setSelectFileBtn(false);
        setUploadingBtn(true);
        console.log("formData final == ", formData);
        rfcService
          .uploadPreRequisitesData(formData, id)
          .then((data) => {
            if (data.ok) {
              alertService.success("Success", { keepAfterRouteChange: true });
              setUploadingBtn(false);
              setSuccessBtn(true);
            } else {
              //alertService.error(error);
              setUploadingBtn(false);
              setErrorBtn(true);
            }

            //history.push('/training/add');
          })
          .catch((error) => {
            alertService.error(error);
            setUploadingBtn(false);
            setErrorBtn(true);
          });
      } else {
        alertService.error("enter valid file");
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="btn btn-primary sm-2" onClick={handleClickOpen}>
        Upload
      </div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Document Upload
          <hr></hr>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Upload Prequisites Document
          </DialogContentText>
          {fileNameDisplay && (
            <DialogContentText>
              File Name : &nbsp;{fileNameDisplay}
            </DialogContentText>
          )}
          <form className={classes.form} noValidate>
            <input type="file" id="DocFile" onChange={fileSelect} hidden />
            <FormControl className={classes.formControl}>
              <div className="containerPopUpFileUpload">
                <div className="variantsPopUpFileUpload">
                  {selectFileBtn && (
                    <IconButton
                      onClick={() => {
                        // <input id='input-file' type='file' />

                        document.getElementById("DocFile").click();
                        // setUploadFileBtn(true)
                      }}
                    >
                      {" "}
                      <div className="filePopUpFileUpload ">
                        <label htmlFor="input-file selectAndUpload">
                          <CloudQueueIcon />
                          &nbsp;SelectFile & upload
                        </label>
                      </div>
                    </IconButton>
                  )}

                  {uploadingBtn && (
                    <IconButton>
                      <div className="filePopUpFileUpload file--uploadingPopUpFileUpload">
                        <label htmlFor="input-file">
                          <BackupIcon />
                          Uploading
                        </label>
                        {/* <input id='input-file' type='file' /> */}
                      </div>
                    </IconButton>
                  )}

                  {successBtn && (
                    <IconButton>
                      <div className="filePopUpFileUpload file--successPopUpFileUpload">
                        <label htmlFor="input-file">
                          <CloudDoneIcon />
                          Success
                        </label>
                        {/* <input id='input-file' type='file' /> */}
                      </div>
                    </IconButton>
                  )}

                  {errorBtn && (
                    <IconButton>
                      <div className="filePopUpFileUpload file--dangerPopUpFileUpload">
                        <label htmlFor="input-file">
                          <CloudOffIcon />
                          Error
                        </label>
                        {/* <input id='input-file' type='file' /> */}
                      </div>
                    </IconButton>
                  )}
                </div>
              </div>
            </FormControl>
          </form>
          <hr></hr>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
