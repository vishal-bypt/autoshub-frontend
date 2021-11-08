import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Form, Row } from "reactstrap";
import Swal from "sweetalert2";
import { accountService, alertService, trainingService } from "../../services";

var FormData = require("form-data");
function UploadFiles({ history }) {
  const user = accountService.userValue;

  const [selectedFiles, setselectedFiles] = React.useState(null);

  const handleSubmit = () => {
    try {
      var formData = new FormData();
      if (!selectedFiles) {
        console.log("selectedFiles::", selectedFiles);
        return Swal.fire("Oops...", "Please attach excel file!", "error");
      }
      formData.append("filePath", selectedFiles); //append the values with key, value pair
      create(formData, user.id);
    } catch (error) {
      console.log("error == ", error);
    }
  };

  function create(formData, id) {
    trainingService
      .uploadExcel(formData, id)
      .then((data) => {
        Swal.fire("Training uploaded successfully.!");
        history.goBack();
      })
      .catch((error) => {
        alertService.error(error);
      });
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="d-flex row justify-content-between">
            <div className="col-md-4">
              <h1 className="header-text">Upload Training Records</h1>
            </div>

            <div className="col-md-4 text-end">
              <Link to={"/training/add"} className="btn btn-danger ">
                <ArrowBackIcon className="mr-1" />
                Back
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <Container fluid={true}>
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <Form>
                        <Dropzone
                          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          multiple={false}
                          onDrop={(acceptedFiles) => {
                            setselectedFiles(acceptedFiles[0]);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick mt-2"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        {selectedFiles !== null ? (
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={"-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={selectedFiles.name}
                                      src={selectedFiles.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {selectedFiles.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>
                                        {selectedFiles.formattedSize}
                                      </strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          </div>
                        ) : null}
                      </Form>

                      <div className="text-center mt-4">
                        <button
                          onClick={() => handleSubmit()}
                          type="button"
                          className="btn btn-primary "
                        >
                          Upload
                        </button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export { UploadFiles };
