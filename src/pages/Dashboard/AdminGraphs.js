import React, {useState} from "react";
import { Col, Row, Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import EPieChart from "../../components/AllCharts/echart/piechart";
import GaugeChart from "../../components/AllCharts/echart/gaugechart";
import { dashboardService } from "../../services/dashboard.service";
import Download from "@material-ui/icons/GetApp";
import Loader from "../../components/Common/Loader";

const AdminGraphs = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  let exportDataFormatForAssignedAndAttended = [
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

  const handleDownloadDataForAssigned = () => {
    setIsSubmitting(true)
    dashboardService
      .exportAnyReport(
        "ExportAssignedTraining",
        props.trainingPartnerAssigned,
        exportDataFormatForAssigned
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
        "ExportAttendedTraining",
        props.trainingPartnerAttended,
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

  const handleDownloadDataForAssignedAndAttended = () => {
    setIsSubmitting(true)
    dashboardService
      .exportAnyReport(
        "ExportAssignedAndAttendedTraining",
        props.trainingPartnerAssignedAttended,
        exportDataFormatForAssignedAndAttended
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
              <CardTitle>
                Training Partner - Assigned Vs Attended view
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="justify-content-center">
                <Col sm={4}>
                  <div className="card-h-100 card">
                    <div className="card-body">
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Assigned</h3>
                        <Link to="#" onClick={handleDownloadDataForAssigned}>
                          <Download title="Download" />
                        </Link>
                      </Row>
                      <EPieChart
                        title="Assigned"
                        data={props.trainingPartnerAssigned}
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
                        data={props.trainingPartnerAttended}
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="card-h-100 card">
                    <div className="card-body">
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Assigned vs Attended</h3>
                        <Link
                          to="#"
                          onClick={handleDownloadDataForAssignedAndAttended}
                        >
                          <Download title="Download" />
                        </Link>
                      </Row>
                      <EPieChart
                        title="Assigned vs Attended"
                        data={props.trainingPartnerAssignedAttended}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">&nbsp;</Row>
              <Row className="justify-content-center">
                <Col sm={12}>
                  <div className="card-h-100 card">
                    <div className="card-body">
                      <Row className="justify-content-center text-center">
                        <h3 className="card-title">Attended</h3>
                      </Row>
                      <GaugeChart
                        data={props.trainingPartnerAssignedAttended}
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

export default AdminGraphs;
