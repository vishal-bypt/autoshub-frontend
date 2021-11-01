import React, { useState, useEffect } from "react";
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
  FormGroup,
  Label,
  Input, 
  Button  
} from "reactstrap";

// import chartJs
import EPieChart from "../../components/AllCharts/echart/piechart";
import GaugeChart from "../../components/AllCharts/echart/gaugechart";
import { dashboardService } from "../../services/dashboard.service";
import AdminGraphs from "./AdminGraphs";
import ManagerGraphs from "./ManagerGraphs";
import UserGraphs from "./UserGraphs";


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
  const [trainingPartnerAssigned, setTrainingPartnerAssigned] = useState([]);
  const [trainingPartnerAttended, setTrainingPartnerAttended] = useState([]);
  const [
    trainingPartnerAssignedAttended,
    setTrainingPartnerAssignedAttended,
  ] = useState([]);
  const [employeedWiseNominated, setEmployeedWiseNominated] = useState([]);
  const [employeedWiseAttended, setEmployeedWiseAttended] = useState([]);
  const [nominatedAcceptedRejected, setNominatedAcceptedRejected] = useState(
    []
  );
  const [employeedWiseAssigned, setEmployeedWiseAssigned] = useState([]);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  useEffect(() => {
    apiCalls();
  }, []);

  const apiCalls = (startDate, endDate) => {
    dashboardService
      .getTrainingPartnerAssigned(startDate, endDate)
      .then((x) => setTrainingPartnerAssigned(x));
    dashboardService
      .getTrainingPartnerAttended(startDate, endDate)
      .then((x) => setTrainingPartnerAttended(x));
    dashboardService
      .getTrainingPartnerAssignedAttended(startDate, endDate)
      .then((x) => setTrainingPartnerAssignedAttended(x));
    dashboardService
      .getEmployeedWiseNominated(startDate, endDate)
      .then((x) => setEmployeedWiseNominated(x));
    dashboardService
      .getEmployeedWiseAttended(startDate, endDate)
      .then((x) => setEmployeedWiseAttended(x));
    dashboardService
      .getNominatedAcceptedRejected(startDate, endDate)
      .then((x) => setNominatedAcceptedRejected(x));
    dashboardService
      .getEmployeedWiseAssigned(startDate, endDate)
      .then((x) => setEmployeedWiseAssigned(x));
  }

  const handleStartDate = (e) => {
      setStartDate(e.target.value);
  }

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  }
  
  const handleSubmit = (e) => {
      console.log("startDate", startDate);
      console.log("endDate", endDate);
      apiCalls(startDate, endDate);
  }
  
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
            <Col xl={5}>
              <FormGroup>
                <Label for="exampleDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  placeholder="Start Date"
                  type="date"
                  onChange={handleStartDate}
                />
              </FormGroup>
            </Col>
            <Col xl={5}>
              <FormGroup>
                <Label for="exampleDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  placeholder="End date"
                  type="date"
                  onChange={handleEndDate}
                />
              </FormGroup>
            </Col>
            <Col xl={2}>
            { startDate && endDate && <Button name="btnFilter" className="mt-4" color="primary" id="btnFilter"  onClick={handleSubmit}>Filter</Button> }
            { (startDate === undefined || endDate === undefined) && <Button name="btnFilter" disabled className="mt-4" color="primary" id="btnFilter" >Filter</Button> }
            </Col>
          </Row>
          &nbsp;
          <AdminGraphs trainingPartnerAssigned={trainingPartnerAssigned} trainingPartnerAttended={trainingPartnerAttended} trainingPartnerAssignedAttended={trainingPartnerAssignedAttended} />
          {/* <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Training Partner - Assigned Vs Attended view
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row className="justify-content-center">
                    <Col sm={6}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Assigned</h3>
                      </Row>
                      <EPieChart data={trainingPartnerAssigned} />
                    </Col>
                    <Col sm={6}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Attended</h3>
                      </Row>
                      <EPieChart data={trainingPartnerAttended} />
                    </Col>
                  </Row>
                  <Row className="mt-5">&nbsp;</Row>
                  <Row className="justify-content-center">
                    <Col sm={6}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Assigned vs Attended</h3>
                      </Row>
                      <EPieChart data={trainingPartnerAssignedAttended} />
                    </Col>
                    <Col sm={6}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Attended</h3>
                      </Row>
                      <GaugeChart />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          {/* <Row className="justify-content-center">
                    <Col sm={12}>
                    <Row className="justify-content-center text-center">
                      <h3 className="card-title">Attended</h3>
                    </Row>
                    <GaugeChart/>
                    </Col>
          </Row> */}
          {/* <Row>
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
                      <EPieChart data={employeedWiseNominated} />
                    </Col>
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Attended</h3>
                      </Row>
                      <EPieChart data={employeedWiseAttended} />
                    </Col>
                    <Col sm={4}>
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">
                          Nominated vs Accepted vs Rejected
                        </h3>
                      </Row>
                      <EPieChart data={nominatedAcceptedRejected} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <UserGraphs employeedWiseNominated={employeedWiseNominated} employeedWiseAttended={employeedWiseAttended} nominatedAcceptedRejected={nominatedAcceptedRejected} />
          <ManagerGraphs employeedWiseAssigned={employeedWiseAssigned} employeedWiseNominated={employeedWiseNominated} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
