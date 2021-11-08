import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, Alert, Container } from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
// action
import { registerUser, apiError } from "../../store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types"

//redux

import {
  layoutTheme
} from "../../constants/layout"
// actions
import { loginUser, socialLogin } from "../../store/actions";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const logo = "/assets/images/autoshubLogo.png"
const logoLight = "/assets/images/autoshubLogoLight.png"


const ResetPassword = props => {
  const dispatch = useDispatch()
  const [isSubmit, setIsSubmit] = React.useState(false)
  const [mismatchError, setMismatchError] = React.useState("")

  const { layoutMode, error } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
    layoutMode: state.Layout.layoutMode,
    layoutWidth: state.Layout.layoutWidth,
    layoutPosition: state.Layout.layoutPosition,
    topbarTheme: state.Layout.topbarTheme,
    leftSideBarType: state.Layout.leftSideBarType,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
    error: state.Login.error,
  }));

  React.useEffect(() => {
    setIsSubmit(false)
  }, [error])
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {

    if (values) {
      let newPassword = values['password'];
      let confirmPassword = values['confirm-password'];
      if (newPassword == confirmPassword) {
        setIsSubmit(true)
        setMismatchError("")
        dispatch(loginUser(values, props.history))
        setTimeout(() => {
          setIsSubmit(false);
        }, 2000)
      }
      else {
        setMismatchError("Password and Confirm password mismatch")
        setIsSubmit(false);
      }
    }
  }

  //Token validation failed, if the token has expired you can get a new one at the forgot password page.


  return (
    <React.Fragment>
      <MetaTags>
        <title>Reset Password | Auto S Hub</title>
      </MetaTags>
      <div className="auth-page" style={{ background: layoutMode === layoutTheme.DARKMODE ? "#12181D" : "#fbffff" }}>
        <Container fluid className="p-0 mw-100">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-shodow auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="md-5 text-center">
                      {
                        layoutMode === layoutTheme.DARKMODE ?
                          <Link to="/landing" className="d-block auth-logo logo logo-dark">
                            <img src={logo} alt="" height="100" />
                          </Link>
                          :
                          <Link to="/landing" className="d-block auth-logo logo logo-light">
                            <img src={logoLight} alt="" height="100" />
                          </Link>
                      }

                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Welcome from Auto S Hub!</h5>
                        <p className="text-muted mt-2">Reset your current Password to continue with Auto S Hub.</p>
                      </div>
                      <AvForm
                        className="custom-form mt-4 pt-2"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v)
                        }}
                      >

                        {mismatchError ? <Alert color="danger">{mismatchError}</Alert> : error ? <Alert color="danger">{error}</Alert> : null}

                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <label className="form-label">New Password</label>
                            </div>
                          </div>
                          <AvField
                            name="password"
                            value=""
                            type="password"
                            className="form-control"
                            placeholder="Enter new Password"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <label className="form-label">Confirm Password</label>
                            </div>
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="confirm-password"
                              value=""
                              type="text"
                              className="form-control"
                              required
                              placeholder="Confirm Password"
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col">
                            <div className="flex-shrink-0">
                              <div className="">
                                <label className="form-check-label" htmlFor="remember-check">
                                  Are you geting issue?
                                </label>
                                <Link to="forgot-password" className="text-muted" style={{ marginTop: "-10px", fontSize: "13px" }}> Try Forgot Password</Link>
                                {/* <Link to="/forgot-password" className="text-muted">Forgot password?</Link> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">
                            {isSubmit && (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            )}
                            Reset Password
                          </button>
                        </div>
                      </AvForm>


                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">Auto S Hub © {new Date().getFullYear()}
                      {/* <br />Crafted with <i className="mdi mdi-heart text-danger"></i> by ByPeople technologies */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(ResetPassword)

ResetPassword.propTypes = {
  history: PropTypes.object,
}