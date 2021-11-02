import {
  accountService,
  alertService,
  programService,
  trainingService,
  revenueService,
} from "../../services";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import CustomSelect from "../../components/CustomSelect";

function UploadProgramData({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const userDetails = accountService.userValue;
  const [temp, setTemp] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadBtn, setUploadBtn] = useState(false);
  const [successBtn, setSuccessBtn] = useState(false);
  const [errorBtn, setErrorBtn] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  let userDropDownData = [];
  console.log("selectedFile >> = ", selectedFile);
  var date = getCurrentDate("-");
  console.log("date == ", date);

  function create(formData, id) {
    console.log("form Data == ", formData);
    trainingService
      .uploadExcel(formData, id)
      .then((data) => {
        setUploadBtn(false);
        setSuccessBtn(true);
        alertService.success("Success", { keepAfterRouteChange: true });
        Swal.fire("Training uploaded successfully.!");
      })
      .catch((error) => {
        setUploadBtn(false);
        setErrorBtn(true);
        alertService.error(error);
      });
  }

  function getCurrentDate(separator = "") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    console.log(
      "date == ",
      `${year}${separator}${month < 10 ? `0${month}` : `${month}`}`
    );
    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}`;
  }

  useEffect(() => {
    getAllPrograms();
  }, []);

  const getAllPrograms = async () => {
    let userDropDownData = [];
    if (userDetails.role === "Admin") {
      programService
        .getAll()
        .then((programs) => {
          console.log("programs:::", programs);
          if (programs && programs.length > 0) {
            programs.map((programData, index) => {
              userDropDownData.push({
                label: programData.programName,
                value: programData.id,
              });
            });
          }
          setTemp(userDropDownData);
        })
        .catch((error) => {
          console.log("error::", error);
        });
    }
  };

  const validationSchema = Yup.object().shape({
    programName: Yup.string(),
    month: Yup.string(),
    file: Yup.string(),
  });

  const initialValues = {
    programName: "",
    month: "",
    file: "",
  };

  function onSubmit(fields, { setStatus, setSubmitting }) {
    var formData = new FormData();
    if (!fields.file || !fields.programName || !fields.month) {
      return Swal.fire(
        "Oops...",
        "Please attach or fill all the fields",
        "error"
      );
    }
    let oneDate = moment(fields.month, "YYYY-MM");
    var monthName = oneDate.format("MMMM");
    var yearName = oneDate.format("YYYY");

    formData.append("filePath", fields.file);
    formData.append("monthName", monthName);
    formData.append("yearName", yearName);
    formData.append("programId", selectedProgramId);
    formData.append("revenueId", 0);
    revenueService
      .uploadRevenueExcel(formData)
      .then((data) => {
        setUploadBtn(false);
        setSuccessBtn(true);
        alertService.success("Success", { keepAfterRouteChange: true });
        Swal.fire("Revenue data uploaded successfully.!").then(function () {
          history.push("/revenue");
        });
      })
      .catch((error) => {
        setUploadBtn(false);
        setErrorBtn(true);
        alertService.error(error);
      });
    //create(fields.file, user.id);
  }

  console.log("temp:::", temp);
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="d-flex row justify-content-between">
            <div className="col-md-4">
              <h1 className="header-text">Upload User Data</h1>
            </div>

            <div className="col-md-4 text-end">
              <Link to={"."} className="btn btn-danger ">
                <ArrowBackIcon className="mr-1" />
                Back
              </Link>
            </div>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                setTouched,
              }) => {
                return (
                  <Form>
                    <>
                      <div className="row mt-5">
                        <div className="form-group col-md-6 mb-2">
                          <label>Project Name</label>
                          <Field
                            className={
                              errors.programName && touched.programName
                                ? " is-invalid"
                                : ""
                            }
                            name="programName"
                            options={temp}
                            component={CustomSelect}
                            isMulti={false}
                            placeholder="Select Program"
                            onChangeValue={(value) => {
                              console.log("Value == ", value);
                              setSelectedProgramId(value);
                            }}
                          />
                          <ErrorMessage
                            name="programName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group col-6">
                          <label>Month</label>
                          <Field
                            name="month"
                            data-date-format="DD MMMM YYYY"
                            placeholder="Enter month"
                            type="month"
                            max={date}
                            className={
                              "form-control" +
                              (errors.month && touched.month
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="month"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <label>Upload Program Data</label>

                        <div className="form-group col-12 newformmargin p-0">
                          <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                "file",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">&nbsp;</div>
                      <div className="row">
                        <div className="form-group text-end">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary"
                          >
                            {isSubmitting && (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            )}
                            Save
                          </button>
                          &nbsp; &nbsp; &nbsp;
                          <Link
                            to={isAddMode ? "." : ".."}
                            className="btn btn-danger"
                          >
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export { UploadProgramData };
