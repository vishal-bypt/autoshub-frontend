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
import { accountService } from "../../services/account.service";
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
  const [trainingReport, setTrainingReport] = useState([]);
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
  const userDetails = accountService.userValue;
  const roles = userDetails.userRoleArray;


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
    
      dashboardService
      .getTrainingReport()
      .then((x) => setTrainingReport(x));
      
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
  console.log("trainingReport", trainingReport);
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

          {userDetails && userDetails.userRoleArray.includes("Admin" || "Executive") &&
          <AdminGraphs trainingPartnerAssigned={trainingPartnerAssigned} trainingPartnerAttended={trainingPartnerAttended} trainingPartnerAssignedAttended={trainingPartnerAssignedAttended} />
          }
          {userDetails && userDetails.userRoleArray.includes("User" || "Executive") &&
          <UserGraphs employeedWiseNominated={employeedWiseNominated} employeedWiseAttended={employeedWiseAttended} nominatedAcceptedRejected={nominatedAcceptedRejected} />
          }
          {userDetails && userDetails.userRoleArray.includes("Manager" || "Executive") &&
          <ManagerGraphs employeedWiseAssigned={employeedWiseAssigned} employeedWiseNominated={employeedWiseNominated} />
          }
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
