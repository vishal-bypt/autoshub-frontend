import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import { Col, Container, Row } from 'reactstrap';

//Verification code package
import AuthCode from "react-auth-code-input";
import CarouselPage from './CarouselPage';

//import images 
import logo from "../../assets/images/autoshubLogo.png"
import logoLight from "../../assets/images/autoshubLogoLight.png"
import { useSelector, useDispatch } from "react-redux"
import {
    layoutTypes,
    layoutTheme,
    layoutWidthTypes,
    layoutPositions,
    topBarThemeTypes,
    leftSidebarTypes,
    leftSideBarThemeTypes,
} from "../../constants/layout";


const TwoStepVerfication = () => {
    const {
        layoutType,
        layoutMode,
        layoutWidth,
        layoutPosition,
        topbarTheme,
        leftSideBarType,
        leftSideBarTheme,
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
    let userEmail = "sujal.bandhara@bypt.in";
    console.log("layoutMode", layoutMode, layoutTheme.DARKMODE, layoutMode === layoutTheme.DARKMODE);
    return (
        <React.Fragment>
            <MetaTags>
                <title>Two Step Verfication | Auto S Hub</title>
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
                                                    </Link>
                                                    :
                                                    <Link to="/dashboard" className="d-block auth-logo logo logo-light">
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
                                                    <p className="mb-5">Please enter the 4 digit code sent to <span className="fw-bold">{userEmail}</span></p>

                                                    <form>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="mb-3 verification">
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
                                                                        onChange={() => null}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <div className="mt-4">
                                                        <Link to="/dashboard" className="btn btn-primary w-100">Confirm</Link>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="mt-5 text-center">
                                                <p className="text-muted mb-0">Didn't receive an email ? <Link to="#"
                                                    className="text-primary fw-semibold"> Resend </Link> </p>
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
    );
};

export default TwoStepVerfication;