import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CustomSelect from "../../components/CustomSelect";
import { accountService, programService } from "../../services";

function Resources({ history, match }) {
  const userDetails = accountService.userValue;
  const [temp, setTemp] = useState([]);
  var date = getCurrentDate("-");

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
      programService.getAll().then((programs) => {
        if (programs && programs.length > 0) {
          programs.map((programData, index) => {
            userDropDownData.push({
              label: programData.programName,
              value: programData.programName,
            });
          });
        }
        setTemp(userDropDownData);
      });
    }
  };

  const validationSchema = Yup.object().shape({
    programName: Yup.string(),
    month: Yup.string(),
  });

  const initialValues = {
    programName: "",
    month: "",
  };

  function onSubmit(fields, { setStatus, setSubmitting }) {
    console.log("fields == ", fields.month);

    var oneDate = moment(fields.month);
    var monthName = oneDate.format("MMMM-YYYY");
    console.log("month name == ", monthName);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="new-form-height p-4 extra-padding">
            <div className="d-flex row justify-content-between">
              <div className="col-md-4">
                <Link
                  to={`/revenue/addProgram`}
                  className="btn btn-primary m-2"
                >
                  Add Program
                </Link>
                <Link
                  to={`/revenue/allProgram`}
                  className="btn btn-primary m-2"
                >
                  All Program
                </Link>
                <Link
                  to={`/revenue/uploadData`}
                  className="btn btn-primary m-2"
                >
                  Upload Program Data
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
                            />
                            <ErrorMessage
                              name="programName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group col-md-6 mb-2">
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
                              Submit
                            </button>
                            &nbsp; &nbsp; &nbsp;
                            {/* <button
                              disabled={isSubmitting}
                              type="button"
                              className="btn btn-danger"
                              //   onClick={() => handleDelete()}
                            >
                              Cancel
                            </button> */}
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
      </div>
    </React.Fragment>
  );
}

export { Resources };
