import React, { useEffect } from 'react';
//Verification code package
import AuthCode from "react-auth-code-input";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'reactstrap';
import Swal from "sweetalert2";
//import images 
import logo from "../../assets/images/autoshubLogo.png";
import logoLight from "../../assets/images/autoshubLogoLight.png";
import {
    layoutTheme
} from "../../constants/layout";
import { accountService } from '../../services';
import { verifyCode } from "../../store/actions";
import CarouselPage from './CarouselPage';

const TwoStepVerfication = (props) => {
    const dispatch = useDispatch()
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
    const user = accountService.userValue;
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [code, setCode] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [accountId, setAccountId] = React.useState("")

    useEffect(() => {

        const query = new URLSearchParams(props.location.search);
        let userEmail = user && user.email ? user.email : query && query.get("email") ? query.get("email") : "NA";
        let accountId = user && user.id ? user.id : query && query.get("id") ? query.get("id") : "";
        let code = query && query.get("code") ? query.get("code") : "";
        navigator?.clipboard?.writeText(code)
        setCode(code);
        setEmail(userEmail);
        setAccountId(accountId);
    }, [])

    React.useEffect(() => {
        setIsSubmit(false)
    }, [error])

    // let userEmail = "sujal.bandhara@bypt.in";

    console.log("layoutMode", layoutMode, layoutTheme.DARKMODE, layoutMode === layoutTheme.DARKMODE);

    const handleSubmit = () => {
        setIsSubmit(true)
        let values = {
            "accountId": accountId,
            "accountVerificationCode": code,
        }
        dispatch(verifyCode(values, props.history))
    }

    const handleResend = () => {
        setIsSubmit(true)
        accountService
            .resendVerificationCode(accountId)
            .then((data) => {
                setIsSubmit(false)
                Swal.fire("Verification code sent successfully.!");
            })
            .catch((error) => {
                setIsSubmit(false)
            });
    }

    return (
        <React.Fragment>
            <MetaTags>
                <title>Two Step Verfication | Auto S Hub</title>
            </MetaTags>
            <div className="auth-page" style={{ background: layoutMode === layoutTheme.DARKMODE ? "#12181D" : "#fbffff" }}>
                <Container fluid className="p-0 mw-100">
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
                                                    </Link>
                                                    :
                                                    <Link to="/landing" className="d-block auth-logo logo logo-light">
                                                        <img src={logoLight} alt="" height="100" />
                                                    </Link>
                                            }
                                        </div>
                                        <div className="auth-content my-auto">
                                            <div className="text-center">

                                                <div className="avatar-lg mx-auto">
                                                    <div className="avatar-title rounded-circle bg-light">
                                                        <i className="bx bxs-envelope h2 mb-0 text-primary"></i>
                                                    </div>
                                                </div>
                                                <div className="p-2 mt-4">

                                                    <h4>Verify your email</h4>
                                                    <h6 >Please enter the 4 digit code sent to</h6>

                                                    <p className="mb-5"><span className="fw-bold">{email}</span></p>

                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="mb-3 verification">
                                                                    {error ? <div className="mb-5"><Alert color="danger">{error}</Alert></div> : null}
                                                                    <label htmlFor="digit1-input" className="visually-hidden">Dight 1</label>
                                                                    <AuthCode
                                                                        characters={4}
                                                                        className="form-control form-control-lg text-center"
                                                                        allowedCharacters="^[0-9]"
                                                                        inputStyle={{
                                                                            width: "42px",
                                                                            height: "42px",
                                                                            padding: "8px",
                                                                            borderRadius: "8px",
                                                                            fontSize: "16px",
                                                                            textAlign: "center",
                                                                            marginRight: "15px",
                                                                            border: "1px solid #ced4da",
                                                                            textTransform: "uppercase",
                                                                        }}
                                                                        handleOnPaste={(val) => setCode(val)}
                                                                        onChange={(val) => setCode(val)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <div className="mt-4">
                                                        <button onClick={handleSubmit} className="btn btn-primary w-100 waves-effect waves-light" type="button">
                                                            {isSubmit && (
                                                                <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                                            )}
                                                            Confirm
                                                        </button>
                                                        {/* <Link to="/dashboard" className="btn btn-primary w-100">Confirm</Link> */}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="mt-5 text-center">
                                                <p className="text-muted mb-0">Didn't receive an email ? <button onClick={handleResend}
                                                    className="btn p-0 text-primary fw-semibold"> Resend </button> </p>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <p className="text-muted mb-0">Change email ? return <Link to="login" className="text-primary fw-semibold" style={{ marginTop: "-10px", fontSize: "13px" }}>Sign In</Link> </p>
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
            </div >
        </React.Fragment >
    );
};

export default TwoStepVerfication;