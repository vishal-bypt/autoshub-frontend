import React from "react";
import { Col, Row, Card, CardBody, CardTitle, CardHeader } from "reactstrap";
// import chartJs
import EPieChart from "../../components/AllCharts/echart/piechart";

const ManagerGraphs = (props) => {
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
