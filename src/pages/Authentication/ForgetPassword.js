import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"
import { Row, Col, Alert, Container } from "reactstrap"
import { history } from '../../helpers';
//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "../../store/actions"

// import images
// import logo from "../../assets/images/logo-sm.svg"
import logo from "../../assets/images/autoshubLogo.png"
import logoLight from "../../assets/images/autoshubLogoLight.png"
import CarouselPage from "../AuthenticationInner/CarouselPage"
import {
  layoutTypes,
  layoutTheme,
  layoutWidthTypes,
  layoutPositions,
  topBarThemeTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
} from "../../constants/layout";

const ForgetPasswordPage = props => {
  const dispatch = useDispatch()

  const {
    layoutType,
    layoutMode,
    layoutWidth,
    layoutPosition,
    topbarTheme,
    leftSideBarType,
    leftSideBarTheme,
    error,
    forgetError,
    forgetSuccessMsg
  } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
    layoutMode: state.Layout.layoutMode,
    layoutWidth: state.Layout.layoutWidth,
    layoutPosition: state.Layout.layoutPosition,
    topbarTheme: state.Layout.topbarTheme,
    leftSideBarType: state.Layout.leftSideBarType,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
    error: state.Login.error,
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }));


  function handleValidSubmit(event, values) {
    dispatch(userForgetPassword(values, props.history))
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Forget Password
        </title>
      </MetaTags>
      <div className="auth-page" style={{ background: layoutMode === layoutTheme.DARKMODE ? "#2C302E" : "#fbffff" }}>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      {
                        layoutMode === layoutTheme.DARKMODE ?
                          <Link to="/dashboard" className="d-block auth-logo logo logo-dark">
                            <img src={logo} alt="" height="100" />
                            {/* <span className="logo-txt">Auto S Hub</span> */}
                          </Link>
                          :
                          <Link to="/dashboard" className="d-block auth-logo logo logo-light">
                            <img src={logoLight} alt="" height="100" />
                            {/* <span className="logo-txt">Auto S Hub</span> */}
                          </Link>
                      }

                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Reset Password</h5>
                        {/* <p className="text-muted mt-2">Reset Password with Minia.</p> */}
                      </div>

                      {forgetError && forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {forgetError}
                        </Alert>
                      ) : null}
                      {forgetSuccessMsg ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {forgetSuccessMsg}
                        </Alert>
                      ) : null}

                      <AvForm className="custom-form mt-4"
                        onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                      >
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>
                        <div className="mb-3 mt-4">
                          <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Reset</button>
                        </div>
                      </AvForm>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">Remember It ?  <Link to="login" className="text-muted" style={{ marginTop: "-10px", fontSize: "13px" }}>Sign in</Link> </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">Auto S Hub © {new Date().getFullYear()}. <br />Crafted with <i className="mdi mdi-heart text-danger"></i> by ByPeople technologies</p>
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

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
