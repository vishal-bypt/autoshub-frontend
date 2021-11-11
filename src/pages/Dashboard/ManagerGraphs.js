import React from "react";
import { Col, Row, Card, CardBody, CardTitle, CardHeader } from "reactstrap";
// import chartJs
import EPieChart from "../../components/AllCharts/echart/piechart";
import { Link } from "react-router-dom";
import { dashboardService } from "../../services/dashboard.service";
import Download from "@material-ui/icons/GetApp";

const ManagerGraphs = (props) => {

  let exportDataFormatForAssigned = [
    {
      keyName: "name",
      lableName: "ToolName",
      order: 1,
    },
    {
      keyName: "value",
      lableName: "Assigned",
      order: 2,
    },
  ];

  let exportDataFormatForNominated = [
    {
      keyName: "name",
      lableName: "ToolName",
      order: 1,
    },
    {
      keyName: "value",
      lableName: "Nominated",
      order: 2,
    },
  ];

  const handleDownloadDataForAssigned = () => {
    dashboardService
      .exportAnyReport(
        "ExportAssignedTraining",
        props.employeedWiseAssigned,
        exportDataFormatForAssigned
      )
      .then((x) => {
        const link = document.createElement("a");
        link.href = x.exportPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const handleDownloadDataForNominated = () => {
    dashboardService
      .exportAnyReport(
        "ExportNominatedTraining",
        props.employeedWiseNominated,
        exportDataFormatForNominated
      )
      .then((x) => {
        const link = document.createElement("a");
        link.href = x.exportPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <CardTitle>Employee wise - Assigned vs Nominated</CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="justify-content-center">
                <Col sm={6}>
                <div className="card-h-100 card">
                  <div className="card-body">
                  <Row className="justify-content-center text-center">
                    <h3 className="card-title">Assigned</h3>
                    <Link to="#" onClick={handleDownloadDataForAssigned}>
                          <Download title="Download" />
                        </Link>
                  </Row>
                  <EPieChart title="Assigned" data={props.employeedWiseAssigned} />
                  </div>
                  </div>
                </Col>
                <Col sm={6}>
                <div className="card-h-100 card">
                  <div className="card-body">
                  <Row className="justify-content-center text-center">
                    <h3 className="card-title">Nominated</h3>
                    <Link to="#" onClick={handleDownloadDataForNominated}>
                          <Download title="Download" />
                        </Link>
                  </Row>
                  <EPieChart title="Nominated" data={props.employeedWiseNominated} />
                  </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ManagerGraphs;
