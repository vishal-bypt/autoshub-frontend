import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {
  accountService,
  alertService,
  trainingService,
  programService,
} from "../../services";

function EditProgram({ history, match }) {
  const user = accountService.userValue;
  const { id } = match.params;
  const isAddMode = !id;

  const initialValues = {
    //programName: ''
    programName: "",
  };

  const validationSchema = Yup.object().shape({
    /*  programName: Yup.string()
            .required('Program Name is required')  */
    programName: Yup.string().required("Program Name is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    const data = { ...fields, userId: user.id };
    if (isAddMode) {
      createUser(data, setSubmitting);
    } else {
      updateUser(id, data, setSubmitting);
    }
  }

  function createUser(fields, setSubmitting) {
    accountService
      .create(fields)
      .then(() => {
        alertService.success("User added successfully", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  function updateUser(id, fields, setSubmitting) {
    programService
      .update(id, fields)
      .then(() => {
        alertService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push("/revenue/allProgram");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Program?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        programService.delete(id).then((data) => {
          alertService.success(data.message, { keepAfterRouteChange: true });
          history.push("/revenue");
        });
        Swal.fire(
          "Deleted!",
          "Your record has been deleted successfully",
          "success"
        );
      }
    });
    console.log("API call is pending");
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Edit Program</h1>
          </div>
          <div className="col-md-6 text-end">
            <Link to={"."} className="btn btn-danger">
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
            {({ errors, touched, isSubmitting, setFieldValue }) => {
              //   useEffect(() => {
              //     if (!isAddMode) {
              //       // get user and set form fields
              //       programService.getById(id).then((user) => {
              //         const fields = ["programName"];
              //         fields.forEach((field) =>
              //           setFieldValue(field, user[field], false)
              //         );
              //       });
              //     }
              //   }, []);

              return (
                <Form>
                  <div className="form-row mt-5">
                    <div className="form-group col-6">
                      <label>Program Name</label>
                      <Field
                        name="programName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.programName && touched.programName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="programName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row">&nbsp;</div>
                  <div className="form-group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Save
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <Link
                      to="#"
                      onClick={(e) => handleDelete(id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                    &nbsp; &nbsp; &nbsp;
                    <Link
                      to="."
                      onClick={() => {
                        history.goBack();
                      }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export { EditProgram };
