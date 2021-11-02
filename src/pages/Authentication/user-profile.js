import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
//redux
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Alert, Card, CardBody, Col, Container, Modal, Row
} from "reactstrap";
import * as Yup from "yup";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { getInitials, getUserName } from "../../helpers";
import {
  accountService,
  alertService
} from "../../services";
// actions
import { resetProfileFlag } from "../../store/actions";
import { UserList } from "../user/userList/Index";

const UserProfile = props => {
  const dispatch = useDispatch()

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(0)
  const [user, setUser] = useState({})
  const [userRoleArray, setUserRoleArray] = useState([])

  useEffect(() => {

    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName)
        setemail(obj.email)
        setidx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        console.log("obj::", obj)
        setidx(obj.id)
        setUserRoleArray(obj.userRoleArray)
        getUser(obj.id)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  function getUser(id) {
    accountService.getById(id).then((data) => {
      console.log("data::", data)
      setUser(data)
    })
  }

  function onSubmit(fields, { setSubmitting }) {
    updateUser(user.id, fields, setSubmitting);
  }

  function updateUser(id, fields, setSubmitting) {
    accountService
      .update(id, fields)
      .then(() => {
        console.log("success");
        getUser(id)
        setSubmitting(false);
        // history.push("/userList");
      })
      .catch((error) => {
        console.log("error", error);
        setSubmitting(false);
        alertService.error(error);
      });
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || ""
  };

  const userName = getUserName(user.firstName || "", user.lastName || "")

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Auto S Hub</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Auto S Hub" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      {/* <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      /> */}
                      <div className="avatar-md rounded-circle header-profile-user d-flex align-items-center justify-content-center">
                        <span className="text-white">{getInitials(userName)}</span>
                      </div>
                    </div>
                    <div className="flex-grow-1 align-self-center ms-3">
                      <div className="text-muted">
                        <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                          <h5>{userName}</h5>
                          {
                            user && userRoleArray && userRoleArray.map((item, index) => {
                              return (
                                <div key={index} className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                                  <div><i className="mdi mdi-circle-medium me-1 text-success align-middle"></i>{item}</div>
                                </div>
                              )
                            })
                          }
                        </div>
                        <p className="mb-1">{user.email}</p>
                        <p className="mb-0">Id no: #{UserList.id}</p>

                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Update Profile</h4>

          <Card>
            <CardBody>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, values, touched, isSubmitting, setFieldValue }) => {
                  return (
                    <Form>
                      <>
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
                        <div className="form-group mt-3">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary w-lg"
                          >
                            {isSubmitting && (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            )}
                            Save
                          </button>
                          &nbsp; &nbsp; &nbsp;
                        </div>
                        <Modal className="d-none" isOpen={isSubmitting}></Modal>
                      </>
                    </Form>
                  );
                }}
              </Formik>
              {/* <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="form-group">
                  <AvField
                    name="username"
                    label="User Name"
                    value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    required
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </AvForm> */}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
