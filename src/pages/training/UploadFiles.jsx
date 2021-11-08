import React from "react";
import { Link } from "react-router-dom";
import Dropzone, { useDropzone } from "react-dropzone";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap";

function UploadFiles() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    getFilesFromEvent: (event) => {
      console.log("event::", event);
      //   myCustomFileGetter(event);
    },
  });

  const [selectedFiles, setselectedFiles] = React.useState([]);

  function handleAcceptedFiles(files) {
    console.log("files:::", files);
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div>
            <Container fluid={true}>
              <Breadcrumbs title="Forms" breadcrumbItem="Upload File" />

              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <section className="container">
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                        <aside>
                          <h4>Files</h4>
                          {/* <ul>{files}</ul> */}
                        </aside>
                      </section>
                      {/* <Form>
                        <Dropzone
                          //   accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          multiple={false}
                          //   onDrop={(acceptedFiles) => {
                          //     console.log("acceptedFiles::::", acceptedFiles);
                          //     handleAcceptedFiles(acceptedFiles);
                          //   }}
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
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {selectedFiles.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </Form> */}

                      <div className="text-center mt-4">
                        <button
                          onClick={() => {
                            console.log("selectedFiles:::", selectedFiles);
                          }}
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
