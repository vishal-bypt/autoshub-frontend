import React, {useState} from "react";
import { Col, Row, Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { dashboardService } from "../../services/dashboard.service";
import Download from "@material-ui/icons/GetApp";
import Loader from "../../components/Common/Loader";

// import chartJs
import EPieChart from "../../components/AllCharts/echart/piechart";

const UserGraphs = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  let exportDataFormatForAttended = [
    {
      keyName: "name",
      lableName: "ToolName",
      order: 1,
    },
    {
      keyName: "value",
      lableName: "Attended",
      order: 2,
    },
  ];

  let exportDataFormatForNominatedAcceptedRejected = [
    {
      keyName: "name",
      lableName: "Category",
      order: 1,
    },
    {
      keyName: "value",
      lableName: "Total",
      order: 2,
    },
  ];

  const handleDownloadDataForNominated = () => {
    setIsSubmitting(true)
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
        setIsSubmitting(false)
      });
  };

  const handleDownloadDataForAttended = () => {
    setIsSubmitting(true)
    dashboardService
      .exportAnyReport(
        "ExportNominatedTraining",
        props.employeedWiseAttended,
        exportDataFormatForAttended
      )
      .then((x) => {
        const link = document.createElement("a");
        link.href = x.exportPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsSubmitting(false)
      });
  };

  const handleDownloadDataForNominatedAcceptedRejected = () => {
    setIsSubmitting(true)
    dashboardService
      .exportAnyReport(
        "ExportNominatedAcceptedRejectedTraining",
        props.nominatedAcceptedRejected,
        exportDataFormatForNominatedAcceptedRejected
      )
      .then((x) => {
        const link = document.createElement("a");
        link.href = x.exportPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsSubmitting(false)
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <CardTitle>Employee wise - Nominated Vs Attended</CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="justify-content-center">
                <Col sm={4}>
                  <div className="card-h-100 card">
                    <div className="card-body">
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Nominated</h3>
                        <Link to="#" onClick={handleDownloadDataForNominated}>
                          <Download title="Download" />
                        </Link>
                      </Row>
                      <EPieChart
                        title="Nominated"
                        data={props.employeedWiseNominated}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="card-h-100 card">
                    <div className="card-body">
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Attended</h3>
                        <Link to="#" onClick={handleDownloadDataForAttended}>
                          <Download title="Download" />
                        </Link>
                      </Row>
                      <EPieChart
                        title="Attended"
                        data={props.employeedWiseAttended}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="card-h-100 card">
                    <div className="card-body">
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">
                          Nominated vs Accepted vs Rejected
                        </h3>
                        <Link to="#" onClick={handleDownloadDataForNominatedAcceptedRejected}>
                          <Download title="Download" />
                        </Link>
                      </Row>
                      <EPieChart
                        title="Nominated vs Accepted vs Rejected"
                        data={props.nominatedAcceptedRejected}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Loader loading={isSubmitting} />
    </React.Fragment>
  );
};

export default UserGraphs;
