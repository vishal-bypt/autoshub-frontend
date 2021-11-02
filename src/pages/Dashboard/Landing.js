import React from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import traning from "../../assets/images/tiles/trainingTile.jpeg";
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Role, setCurrentUserRole } from "../../helpers";

const Landing = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard - Auto S Hub</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
          &nbsp;
          <div className="web-form">
            <div className="tile-div d-flex flex-row h-100">
              {/* <div className="mb-4 mb-md-5">
                <Link onClick={() => {
                  setCurrentUserRole(Role.Admin)
                }} to={`training`} className="mb-3">
                  <img src={rfp} />
                </Link>
                <div className="text-center">RFP</div>
              </div> */}
              <div className="mb-4 mb-md-5">
                <Link onClick={() => {
                  setCurrentUserRole(Role.Manager)
                }} to={`training`} className="mb-3">
                  <img src={traning} />
                </Link>
                <div className="text-center">Training</div>
              </div>
              {/* <div className="mb-4 mb-md-5">
                <Link onClick={() => {
                  setCurrentUserRole(Role.User)
                }} to={`training`} className="mb-3">
                  <img src={revenue} />
                </Link>
                <div className="text-center">Revenue</div>
              </div> */}
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Landing;
