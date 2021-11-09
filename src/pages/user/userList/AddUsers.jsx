import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Form, Row } from "reactstrap";
import Swal from "sweetalert2";
import { accountService, alertService } from "../../../services";

var FormData = require("form-data");

function AddUsers({ history, match }) {
  const [selectedFiles, setselectedFiles] = React.useState(null);

  const handleSubmit = () => {
    try {
      var formData = new FormData();
      if (!selectedFiles) {
        return Swal.fire("Oops...", "Please attach excel file!", "error");
      }
      formData.append("filePath", selectedFiles); //append the values with key, value pair
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
          Swal.fire("Users uploaded successfully.!");
          history.push("/userList");
        } else {
          Swal.fire(res.message);
        }
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
                        {selectedFiles !== null &&
                        selectedFiles !== undefined ? (
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
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {selectedFiles?.name
                                        ? selectedFiles.name
                                        : ""}
                                    </Link>
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

export default AddUsers;
