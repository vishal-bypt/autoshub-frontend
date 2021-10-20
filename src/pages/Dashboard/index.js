import React from "react";
import MetaTags from "react-meta-tags";
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// import chartJs
import EPieChart from "../../components/AllCharts/echart/piechart";

const options = {
  chart: {
    height: 50,
    type: "line",
    toolbar: { show: false },
  },
  colors: ["#5156be"],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return "";
        },
      },
    },
    marker: {
      show: false,
    },
  },
};

const TrainingPartnerAssigned = [
  { value: 200, name: "UiPaths" },
  { value: 45, name: "BluePrism" },
  { value: 31, name: "Google Cloud" },
  { value: 15, name: "AWS" },
  { value: 20, name: "Automation" },
];

const TrainingPartnerAttended = [
  { value: 200, name: "UiPaths" },
  { value: 45, name: "BluePrism" },
  { value: 31, name: "Google Cloud" },
  { value: 15, name: "AWS" },
  { value: 20, name: "Automation" },
];

const TrainingPartnerAssignedAttended = [
  { value: 135, name: "Assigned" },
  { value: 65, name: "Attended" },
];

const EmployeedWiseNominated = [
  { value: 200, name: "UiPaths" },
  { value: 45, name: "BluePrism" },
  { value: 31, name: "Google Cloud" },
  { value: 15, name: "AWS" },
  { value: 20, name: "Automation" },
];

const EmployeedWiseAttended = [
  { value: 200, name: "UiPaths" },
  { value: 45, name: "BluePrism" },
  { value: 31, name: "Google Cloud" },
  { value: 15, name: "AWS" },
  { value: 20, name: "Automation" },
];

const NominatedAcceptedRejected = [
  { value: 335, name: "Nominated" },
  { value: 310, name: "Accepted" },
  { value: 234, name: "Rejected" },
];

const EmployeedWiseAssigned = [
  { value: 200, name: "UiPaths" },
  { value: 45, name: "BluePrism" },
  { value: 31, name: "Google Cloud" },
  { value: 15, name: "AWS" },
  { value: 20, name: "Automation" },
];

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard - Auto S Hub</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
          <Row>
            <Col xl={12}>
              <select>
                <option>JAN</option>
                <option>FEB</option>
              </select>
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Training Partner - Assigned Vs Attended view
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Assigned</h3>
                      </Row>
                      <EPieChart data={TrainingPartnerAssigned} />
                    </Col>
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Attended</h3>
                      </Row>
                      <EPieChart data={TrainingPartnerAttended} />
                    </Col>
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Assigned vs Attended</h3>
                      </Row>
                      <EPieChart data={TrainingPartnerAssignedAttended} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Employee wise - Nominated Vs Attended</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Nominated</h3>
                      </Row>
                      <EPieChart data={EmployeedWiseNominated} />
                    </Col>
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Attended</h3>
                      </Row>
                      <EPieChart data={EmployeedWiseAttended} />
                    </Col>
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">
                          Nominated vs Accepted vs Rejected
                        </h3>
                      </Row>
                      <EPieChart data={NominatedAcceptedRejected} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Employee wise - Assigned vs Nominated</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row className="justify-content-center">
                    <Col sm={6}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Assigned</h3>
                      </Row>
                      <EPieChart data={EmployeedWiseAssigned} />
                    </Col>
                    <Col sm={6}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Nominated</h3>
                      </Row>
                      <EPieChart data={EmployeedWiseNominated} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
