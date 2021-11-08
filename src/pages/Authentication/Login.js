// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"
import PropTypes from "prop-types"
import React from "react"
import MetaTags from "react-meta-tags"
//redux
import { useDispatch, useSelector } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Alert, Col, Container, Row } from "reactstrap"
import {
  layoutTheme
} from "../../constants/layout"
// actions
import { loginUser, socialLogin } from "../../store/actions";
import CarouselPage from "../AuthenticationInner/CarouselPage";

const logo = "/assets/images/autoshubLogo.png"
const logoLight = "/assets/images/autoshubLogoLight.png"

const Login = props => {
  const dispatch = useDispatch()
  const [isSubmit, setIsSubmit] = React.useState(false)
  const {
    layoutMode,
    error
  } = useSelector((state) => ({
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
    dispatch(loginUser(values, props.history))
    setIsSubmit(true)
  }

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Auto S Hub</title>
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
                        <h5 className="mb-0">Welcome Back !</h5>
                        <p className="text-muted mt-2">Sign in to continue with Auto S Hub.</p>
                      </div>
                      <AvForm
                        className="custom-form mt-4 pt-2"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v)
                        }}
                      >
                        {error ? <Alert color="danger">{error}</Alert> : null}
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            value="sujal.bandhara@bypt.in"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <label className="form-label">Password</label>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="">
                                <Link to="forgot-password" className="text-muted" style={{ marginTop: "-10px", fontSize: "13px" }}>Forgot Password?</Link>
                                {/* <Link to="/forgot-password" className="text-muted">Forgot password?</Link> */}
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              value="111111"
                              type="password"
                              className="form-control"
                              required
                              placeholder="Enter Password"
                            />
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="remember-check" />
                              <label className="form-check-label" htmlFor="remember-check">
                                Remember me
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">
                            {isSubmit && (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            )}
                            Log In
                          </button>
                        </div>
                      </AvForm>

                      {/* <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                          </li>

                          <li className="list-inline-item">
                            <GoogleLogin
                              clientId={google.CLIENT_ID}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => { }}
                            />
                          </li>
                        </ul>
                      </div> */}

                      {/* <div className="mt-5 text-center">
                        <p className="text-muted mb-0">Don't have an account ? <Link to="/register"
                          className="text-primary fw-semibold"> Signup now </Link> </p>
                      </div> */}
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">Auto S Hub © {new Date().getFullYear()} 
                      {/* <br />Crafted with <i className="mdi mdi-heart text-danger"></i> by ByPeople technologies */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Modal className="d-none" isOpen={isSubmit}></Modal> */}
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
