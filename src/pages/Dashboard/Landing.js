import React from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container } from "reactstrap";

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
            <div className="tile-div">
              <Link to={`/rfp/landing-entries`} className="mb-2">
                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
              </Link>
              <Link to={`training`} className="mb-2">
                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
              </Link>
              <Link to={`training`} className="mb-2">
                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Landing;
