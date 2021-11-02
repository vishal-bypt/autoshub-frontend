import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Loader from "../../components/Common/Loader";
import {
  accountService,
  alertService,
  programService,
  trainingService
} from "../../services";

function List({ history, match }) {
  const userDetails = accountService.userValue;

  const [users, setUsers] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(true);

  let filteredData = [];

  const columns = [
    {
      dataField: "id",
      text: "#",
    },
    {
      dataField: "programName",
      text: "Program Name",
    },
    {
      dataField: "",
      text: "",
      formatter: (cellContent, row) => (
        <div className="text-end me-5">
          <Link
            to={`/revenue/edit/${row.id}/${row.programName}`}
            className="btn btn-warning"
          >
            Edit
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (userDetails.role === "Admin") {
      programService.getAll().then((x) => {
        /* for (let i = 0; i < x.length; i++) {
                    if (x[i].assignedByName != null && x[i].assignedToName != null) {
                        console.log("x[1] == ", x[i]);
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"
                            console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
                        }
                        filteredData.push(x[i])
                    }
                } */
        setUsers(x);
        setIsSubmitting(false);
      });
    }
    if (userDetails.role === "Manager") {
      let userData = [];
      trainingService.listTaskToUser().then((x) => {
        //console.log("x == ", x)
        x.map((data) => {
          x = data.training;
          userData.push(x);
        });
        setUsers(userData);
        setIsSubmitting(false);
      });
    }
    if (userDetails.role === "User") {
      let userData = [];
      trainingService.listTaskToUser().then((x) => {
        x.map((data) => {
          //console.log("data of user == ", data);
          x = data.training;
          x.assignedByName = `${data.assignBy.firstName}  ${data.assignBy.lastName}`;
          x.assignedToName = `${data.assignTo.firstName}  ${data.assignTo.lastName}`;
          x.acceptRejectStatus = data.acceptRejectStatus;
          userData.push(x);
        });
        setUsers(userData);
        setIsSubmitting(false);
      });
    }
  }, []);

  const viewPreRequisited = (e) => () => {
    let id = e.id;
    let userId = e.assignedToId;
    trainingService.viewPreRequisites(id, userId).then((data) => {
      //console.log("response data == ", data);
      /*  alertService.success('Successfully accepted training prerequisites', { keepAfterRouteChange: true });
             history.push('/training'); */
    });
  };

  const handleClickAccept = (e) => () => {
    //console.log(e);
    let params = {
      trainingId: e.id,
      userId: e.assignedToId,
      isAccept: 1,
      managerId: e.assignedById,
    };
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully accepted training prerequisites", {
        keepAfterRouteChange: true,
      });
      trainingService.getActiveTrainingList().then((x) => {
        //console.log("x == ", x.length);
        for (let i = 0; i < x.length; i++) {
          if (x[i].assignedByName != null && x[i].assignedToName != null) {
            //console.log("x[1] == ", x[i]);
            if (x[i].acceptRejectStatus === 1) {
              x[i].acceptRejectStatus = "Completed";
              //console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
            }
            filteredData.push(x[i]);
          }
        }
        setUsers(filteredData);
      });
      history.push("/training");
    });
  };

  const handleClickReject = (e) => () => {
    let params = {
      trainingId: e.id,
      userId: e.assignedToId,
      isAccept: 2,
      managerId: e.assignedById,
    };
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully rejected training prerequisites", {
        keepAfterRouteChange: true,
      });
      trainingService.getActiveTrainingList().then((x) => {
        for (let i = 0; i < x.length; i++) {
          if (x[i].assignedByName !== null && x[i].assignedToName !== null) {
            //console.log("x[1] == ", x[i]);
            if (x[i].acceptRejectStatus === 1) {
              x[i].acceptRejectStatus = "Completed";
              //console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
            }
            filteredData.push(x[i]);
          }
        }
        setUsers(filteredData);
      });
      history.push("/training");
    });
  };

  const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
    <div>
      <React.Fragment>
        {/* <Row className="mb-2">
          <Col
            className="d-flex justify-content-between"
          >
            <div className="search-box me-2 mb-2 d-inline-block">
              <div className="position-relative">
                <input
                  key="random1"
                  type="text"
                  className="form-control"
                  placeholder={"Search..."}
                  value={searchValue}
                  autoFocus
                  onChange={(e) => onSearch(e.target.value)}
                />
                <i className="bx bx-search-alt search-icon" />
              </div>
            </div>
            <div className="search-box me-2 mb-2 d-inline-block">
              <div className="position-relative">
                <Link to="/userList/addUsers" className="btn btn-primary">
                  Add Users
                </Link>
              </div>
            </div>
          </Col>
        </Row> */}

        <Row>
          <Col xl="12">
            <div className="table-responsive">
              <BootstrapTable
                keyField="id"
                remote
                data={data}
                columns={columns}
                responsive
                bordered={false}
                striped={false}
                classes={"table align-middle table-nowrap"}
                headerWrapperClasses={"thead-light"}
                // pagination={paginationFactory({
                //   page,
                //   sizePerPage,
                //   totalSize,
                // })}
                // onTableChange={onTableChange}
                noDataIndication={() => {
                  if (users && users.length === 0 && !isSubmitting)
                    return (
                      <div>
                        <div colSpan="5" className="flex text-center">
                          <span className="align-center">
                            No data available
                          </span>
                        </div>
                      </div>
                    );
                }}
              />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    </div>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h1>Programs</h1>
            </div>
            <div className="col-md-6 text-end">
              <Link to={"."} className="btn btn-danger">
                <ArrowBackIcon className="mr-1" />
                Back
              </Link>
            </div>
          </div>
          <div>
            {users && users.length > 0 && (
              <RemoteAll
                data={users}
                // page={page}
                // sizePerPage={sizePerPage}
                // totalSize={totalSize}
                //   onTableChange={handleTableChange}
              />
            )}
          </div>
        </div>
        <Loader loading={isSubmitting} />
      </div>
    </React.Fragment>
  );
}

export { List };
