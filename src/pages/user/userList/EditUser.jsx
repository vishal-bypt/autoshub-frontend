import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import { accountService, alertService } from "../../../services";
import Loader from "../../../components/Common/Loader";

function EditUser({ history, match, location }) {
  const { id } = match.params;
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getUser();
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    managerId: Yup.string()
      .typeError("Manager Id is required")
      .required("Manager Id is required")
      .test(
        "maxDigits",
        "Manager Id should be maximum 6 digits",
        (number) => number.length === 6
      ),
    execId: Yup.string()
      .typeError("General Manager - Exec Id is required")
      .required("General Manager - Exec Id is required")
      .min(5)
      .max(6)
      .required(),
  });

  function onSubmit(fields, { setSubmitting }) {
    updateUser(id, fields, setSubmitting);
  }

  function getUser() {
    setLoading(true);
    accountService
      .getById(id)
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }

  function updateUser(id, fields, setSubmitting) {
    setLoading(true);
    accountService
      .update(id, fields)
      .then(() => {
        console.log("success");
        setLoading(false);
        history.push("/userList");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setSubmitting(false);
        alertService.error(error);
      });
  }

  // const handleDelete = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to delete this user?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     console.log("result::", result);
  //     if (result.isConfirmed) {
  //       accountService
  //         .delete(user.id)
  //         .then((data) => {
  //           alertService.success(data.message, { keepAfterRouteChange: true });
  //           history.push("/userList");
  //           Swal.fire(
  //             "Deleted!",
  //             "User has been deleted successfully",
  //             "success"
  //           );
  //         })
  //         .catch((error) => {
  //           console.log("error::", error);
  //           Swal.fire("Error!", error);
  //           alertService.error(error, { keepAfterRouteChange: true });
  //         });
  //     }
  //   });
  // };

  const initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    managerId: userData?.managerId,
    empId: userData?.empId,
    execId: userData?.execId,
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Edit User</h1>
          </div>
          <div className="col-md-6 text-end">
            <Link to={"/userList"} className="btn btn-danger">
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
            enableReinitialize
          >
            {({ errors, values, touched, isSubmitting, setFieldValue }) => {
              return (
                <Form>
                  <>
                    <div className="row mt-5">
                      <div className="form-group col-md-6 mb-2">
                        <label>First Name</label>
                        <Field
                          name="firstName"
                          type="text"
                          className={
                            "form-control" +
                            (errors.firstName && touched.firstName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-md-6 mb-2">
                        <label>Last Name</label>
                        <Field
                          name="lastName"
                          type="text"
                          className={
                            "form-control" +
                            (errors.lastName && touched.lastName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6 mb-2">
                        <label>Email</label>
                        <Field
                          name="email"
                          type="text"
                          className={
                            "form-control" +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-6">
                        <label>Employee Id</label>
                        <Field
                          disabled
                          name="empId"
                          type="text"
                          className={"form-control"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6 mb-2">
                        <label>Manager Id</label>
                        <Field
                          name="managerId"
                          type="text"
                          className={
                            "form-control" +
                            (errors.managerId && touched.managerId
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="managerId"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group col-6">
                        <label>General Manager - Exec Id</label>
                        <Field
                          name="execId"
                          type="text"
                          className={
                            "form-control" +
                            (errors.execId && touched.execId
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="execId"
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
                          Save
                        </button>
                        &nbsp; &nbsp; &nbsp;
                        {/* <button
                          disabled={isSubmitting}
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete()}
                        >
                          Delete
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
      <Loader loading={loading} />
    </div>
  );
}

export default EditUser;
