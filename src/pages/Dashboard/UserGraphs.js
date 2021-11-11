import React from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// import chartJs
import EPieChart from "../../components/AllCharts/echart/piechart";

const UserGraphs = (props) => {
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
                  </Row>
                  <EPieChart title="Nominated" data={props.employeedWiseNominated} />
                  </div>
                  </div>
                </Col>
                <Col sm={4}>
                <div className="card-h-100 card">
                  <div className="card-body">
                  <Row className="justify-content-center text-center">
                    <h3 className="card-title">Attended</h3>
                  </Row>
                  <EPieChart title="Attended" data={props.employeedWiseAttended} />
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
                  </Row>
                  <EPieChart title="Nominated vs Accepted vs Rejected" data={props.nominatedAcceptedRejected} />
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

export default UserGraphs;
