// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation";
import PropTypes from "prop-types";
import React from "react";
import MetaTags from "react-meta-tags";
//redux
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Alert, Col, Container, Row } from "reactstrap";
import {
  layoutTheme
} from "../../constants/layout";
// action
import { userForgetPassword } from "../../store/actions";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const logo = "/assets/images/autoshubLogo.png";
const logoLight = "/assets/images/autoshubLogoLight.png";

const ForgetPasswordPage = props => {
  const [isSubmit, setIsSubmit] = React.useState(false)
  const dispatch = useDispatch()

  const {
    layoutMode,
    forgetError,
    forgetSuccessMsg,
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
    state: state
  }));

  React.useEffect(() => {
    if (forgetSuccessMsg && forgetSuccessMsg !== "") {
      setIsSubmit(false)
      props.history.push("/login")
    }
  }, [forgetSuccessMsg])

  function handleValidSubmit(event, values) {
    setIsSubmit(true)
    dispatch(userForgetPassword(values, props.history))
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Forget Password
        </title>
      </MetaTags>
      <div className="auth-page" style={{ background: layoutMode === layoutTheme.DARKMODE ? "#12181D" : "#fbffff" }}>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-shodow auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      {
                        layoutMode === layoutTheme.DARKMODE ?
                          <Link to="/landing" className="d-block auth-logo logo logo-dark">
                            <img src={logo} alt="" height="100" />
                            {/* <span className="logo-txt">Auto S Hub</span> */}
                          </Link>
                          :
                          <Link to="/landing" className="d-block auth-logo logo logo-light">
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
                      <AvForm className="custom-form mt-4"
                        onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                      >
                        {forgetError ? (
                          <Alert color="danger" style={{ marginTop: "13px" }}>
                            {forgetError}
                          </Alert>
                        ) : null}
                        {forgetSuccessMsg ? (
                          <Alert color="success" style={{ marginTop: "13px" }}>
                            {forgetSuccessMsg}
                          </Alert>
                        ) : null}
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
                          <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">
                            {isSubmit && (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            )}
                            Reset</button>
                        </div>
                      </AvForm>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">Remember It ?  <Link to="login" className="text-muted" style={{ marginTop: "-10px", fontSize: "13px" }}>Sign in</Link> </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">Auto S Hub ?? {new Date().getFullYear()}
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

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
