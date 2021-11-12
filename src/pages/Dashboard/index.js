import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { trainingService } from "../../services";
import { accountService } from "../../services/account.service";
import { dashboardService } from "../../services/dashboard.service";
import AdminGraphs from "./AdminGraphs";
import ManagerGraphs from "./ManagerGraphs";
import UserGraphs from "./UserGraphs";
import Loader from "../../components/Common/Loader";
import CustomSelect from '../../components/CustomSelect';
import { ErrorMessage, FastField, Field, Form, Formik, setFieldValue } from 'formik';

const Dashboard = () => {
  const [trainingPartnerAssigned, setTrainingPartnerAssigned] = useState([]);
  const [trainingPartnerAttended, setTrainingPartnerAttended] = useState([]);
  const [trainingReport, setTrainingReport] = useState([]);
  const [
    trainingPartnerAssignedAttended,
    setTrainingPartnerAssignedAttended,
  ] = useState([{ value: trainingPartnerAssigned }]);
  const [employeedWiseNominated, setEmployeedWiseNominated] = useState([]);
  const [employeedWiseAttended, setEmployeedWiseAttended] = useState([]);
  const [nominatedAcceptedRejected, setNominatedAcceptedRejected] = useState(
    []
  );
  const [employeedWiseAssigned, setEmployeedWiseAssigned] = useState([]);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const userDetails = accountService.userValue;
  const [isSubmitting, setIsSubmitting] = useState(true);

  const [execManagerList, setExecManagerList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [selectedExecId, setSelectedExecId] = useState("");


  useEffect(() => {
    apiCalls();
    getExecManagerList();
  }, []);

  useEffect(() => {
    if (selectedExecId) {
      setManagerList([])
      getManagerListByExecId()
    }
  }, [selectedExecId])

  const apiCalls = (startDate, endDate, execManager, manager) => {
    setIsSubmitting(true);
    dashboardService
      .getTrainingPartnerAssigned(startDate, endDate, execManager, manager)
      .then((x) => setTrainingPartnerAssigned(x));
     dashboardService
       .getTrainingPartnerAttended(startDate, endDate, execManager, manager)
       .then((x) => setTrainingPartnerAttended(x));
    dashboardService
      .getTrainingPartnerAssignedAttended(startDate, endDate, execManager, manager)
      .then((x) => setTrainingPartnerAssignedAttended(x));
    dashboardService
      .getEmployeedWiseNominated(startDate, endDate, execManager, manager)
      .then((x) => setEmployeedWiseNominated(x));
    dashboardService
      .getEmployeedWiseAttended(startDate, endDate, execManager, manager)
      .then((x) => setEmployeedWiseAttended(x));
    dashboardService
      .getNominatedAcceptedRejected(startDate, endDate, execManager, manager)
      .then((x) => setNominatedAcceptedRejected(x));
    dashboardService
      .getEmployeedWiseAssigned(startDate, endDate, execManager, manager)
      .then((x) => setEmployeedWiseAssigned(x));

    trainingService.getTrainingReport().then((x) => {
      setTrainingReport(x);
      setIsSubmitting(false);
    });
  };

  const getExecManagerList = () => {
    setIsSubmitting(true)
    accountService
      .getExecManagerList()
      .then((res) => {
        let updatedArr = res.map(data => {
          let dataObj = {
            label: data?.firstName,
            value: data?.execId
          }
          return dataObj
        })
        updatedArr.unshift({
          label: "",
          value: ""
        })
        setExecManagerList(updatedArr)
        setIsSubmitting(false)
      }).catch((error) => {
        setIsSubmitting(false)
      });;
  }

  const getManagerListByExecId = () => {
    setIsSubmitting(true)
    accountService
      .getManagerListByExecId(selectedExecId)
      .then((res) => {
        let updatedArr = res.map(data => {
          let dataObj = {
            label: data?.firstName,
            value: data?.empId
          }
          return dataObj
        })
        setManagerList(updatedArr)
        setIsSubmitting(false)
      }).catch((error) => {
        setIsSubmitting(false)
      });
  }

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    apiCalls(startDate, endDate);
  };

  const handleClear = (e) => {
    setStartDate("");
    setEndDate("");
    apiCalls();
  };

  const initialValues = {
    execManager: '',
    manager: [],
  }
  function onSubmit(fields, { setStatus, setSubmitting }) {
    console.log("fields:::", fields);
    apiCalls(startDate, endDate, fields.execManager, fields.manager);
  
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
                  value={startDate}
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
                  value={endDate}
                  onChange={handleEndDate}
                />
              </FormGroup>
            </Col>
            <Col xl={2}>
              {/* {startDate && endDate && (
                <Button
                  name="btnFilter"
                  className="mt-4"
                  color="primary"
                  id="btnFilter"
                  onClick={handleSubmit}
                >
                  Filter
                </Button>
              )}
              {(startDate === undefined || endDate === undefined) && (
                <Button
                  name="btnFilter"
                  disabled
                  className="mt-4"
                  color="primary"
                  id="btnFilter"
                >
                  Filter
                </Button>
              )}
              &nbsp;
              <Button
                name="btnClear"
                onClick={handleClear}
                className="mt-4"
                color="danger"
                id="btnClear"
              >
                Clear
              </Button> */}
            </Col>
          </Row>
          &nbsp;
          <div>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={onSubmit}
            >
              {({ errors, values, touched, isSubmitting, setFieldValue, handleBlur, setTouched, resetForm }) => {
                console.log("values", values);
                return (
                  <Form>
                    <div className="row">
                      <div className="col-md-5">
                        <label>Exec Manager List</label>
                        <Field
                          name="execManager"
                          onBlurValue={(field) => { setTouched({ ...touched, [field]: true }); }}
                          options={execManagerList}
                          placeholder=""
                          component={CustomSelect}
                          isMulti={false}
                          onChangeValue={value => {
                            if (value === "") {
                              return;
                            }
                            setSelectedExecId(value)
                          }}
                        />
                        <ErrorMessage name="execManager" component="div" className="invalid-feedback" />
                      </div>
                      {selectedExecId !== "" && <div className="col-md-5">
                        <label>Manager List</label>
                        <Field
                          name="manager"
                          onBlurValue={(field) => { setTouched({ ...touched, [field]: true }); }}
                          options={managerList}
                          component={CustomSelect}
                          isMulti={true}
                          placeholder=""
                          onChangeValue={value => {
                            if (value === "") {
                              return;
                            }
                          }}
                        />
                        <ErrorMessage name="manager" component="div" className="invalid-feedback" />
                      </div>
                      }
                      <Col xl={2}>
                        <Button
                          className="mt-4"
                          color="primary"
                          type='submit'
                        >
                          Filter
                        </Button>&nbsp;
                        <Button
                        name="btnClear"
                        onClick={value => {
                          setFieldValue('execManager', "", false);
                          setFieldValue('manager', [], false);
                          values.manager = [];
                          values.execManager = "";
                          handleClear();
                        }} 
                        className="mt-4"
                        color="danger"
                        id="btnClear"
                      >
                        Clear
                      </Button>
                      </Col>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          &nbsp;
          {userDetails &&
            userDetails.userRoleArray.includes("Admin" || "Executive") && (
              <AdminGraphs
                trainingPartnerAssigned={trainingPartnerAssigned}
                trainingPartnerAttended={trainingPartnerAttended}
                trainingPartnerAssignedAttended={
                  trainingPartnerAssignedAttended
                }
              />
            )}
          {userDetails &&
            userDetails.userRoleArray.includes("User" || "Executive") && (
              <UserGraphs
                employeedWiseNominated={employeedWiseNominated}
                employeedWiseAttended={employeedWiseAttended}
                nominatedAcceptedRejected={nominatedAcceptedRejected}
              />
            )}
          {userDetails &&
            userDetails.userRoleArray.includes("Manager" || "Executive") && (
              <ManagerGraphs
                employeedWiseAssigned={employeedWiseAssigned}
                employeedWiseNominated={employeedWiseNominated}
              />
            )}
        </Container>
      </div>
      <Loader loading={isSubmitting} />
    </React.Fragment>
  );
};

export default Dashboard;
