import React from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

import EPieChart from "../../components/AllCharts/echart/piechart";
import GaugeChart from "../../components/AllCharts/echart/gaugechart";

const AdminGraphs = (props) => {
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
                <Col sm={6}>
                  <Row className="justify-content-center text-center">
                    <h3 className="card-title">Assigned</h3>
                  </Row>
                  <EPieChart title="Assigned" data={props.trainingPartnerAssigned} />
                </Col>
                <Col sm={6}>
                  <Row className="justify-content-center text-center">
                    <h3 className="card-title">Attended</h3>
                  </Row>
                  <EPieChart title="Attended"  data={props.trainingPartnerAttended} />
                </Col>
              </Row>
              <Row className="mt-5">&nbsp;</Row>
              <Row className="justify-content-center">
                <Col sm={6}>
                  <Row className="justify-content-center text-center">
                    <h3 className="card-title">Assigned vs Attended</h3>
                  </Row>
                  <EPieChart title="Assigned vs Attended" data={props.trainingPartnerAssignedAttended} />
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
      </Row>
    </React.Fragment>
  );
};

export default AdminGraphs;
