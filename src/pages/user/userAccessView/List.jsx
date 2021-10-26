import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Card, CardBody, Col, Row } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Loader from "../../../components/Common/Loader";
import {
  hasAdminView,
  hasExecView,
  hasManagerView,
  hasUserView,
} from "../../../helpers";
import { accountService } from "../../../services";

const List = ({ history }) => {
  const [userData, setUserData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [limit, setLimit] = useState(10);
  const [totalSize, setTotalSize] = useState(0);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAllUser(sizePerPage, 0, searchValue);
  }, []);

  const columns = [
    {
      dataField: "firstName",
      text: "Users",
      formatter: (cellContent, row) => (
        <div>{getUserName(row.firstName, row.lastName)}</div>
      ),
    },
    {
      dataField: "lastName",
      hidden: true,
    },
    {
      dataField: "email",
      hidden: true,
    },
    {
      dataField: "empId",
      text: "EmpId",
      hidden: false,
      align: "center",
      headerAlign: "center",
      formatter: (cellContent, row) => (
        <div>{row.empId ? row.empId : "N/A"}</div>
      ),
    },
    {
      dataField: "managerId",
      hidden: true,
    },
    {
      dataField: "execId",
      hidden: true,
    },
    {
      dataField: "executiveView",
      text: "ExecutiveView",
      align: "center",
      headerAlign: "center",
      formatter: (cellContent, row) => (
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            id="formCheck1"
            checked={row.executiveView}
            onChange={() => onPermissionChange(row.id, 0)}
          />
        </div>
      ),
    },
    {
      dataField: "adminView",
      text: "AdminView",
      align: "center",
      headerAlign: "center",
      formatter: (cellContent, row) => (
        <input
          className="form-check-input"
          type="checkbox"
          id="formCheck1"
          checked={row.adminView}
          onChange={() => onPermissionChange(row.id, 1)}
        />
      ),
    },
    {
      dataField: "managerView",
      text: "ManagerView",
      align: "center",
      headerAlign: "center",
      formatter: (cellContent, row) => (
        <input
          className="form-check-input"
          type="checkbox"
          id="formCheck1"
          checked={row.managerView}
          onChange={() => onPermissionChange(row.id, 2)}
        />
      ),
    },
    {
      dataField: "userView",
      text: "UserView",
      align: "center",
      headerAlign: "center",
      formatter: (cellContent, row) => (
        <input
          className="form-check-input"
          type="checkbox"
          id="formCheck1"
          checked={row.userView}
          onChange={() => onPermissionChange(row.id, 3)}
        />
      ),
    },
  ];

  function onPermissionChange(id, type) {
    let newObject = userData.find((item) => item.id === id);
    const index = userData.findIndex((item) => item.id === id);
    if (type === 0) {
      newObject.executiveView = newObject.executiveView === 1 ? 0 : 1;
    } else if (type === 1) {
      newObject.adminView = newObject.adminView === 1 ? 0 : 1;
    } else if (type === 2) {
      newObject.managerView = newObject.managerView === 1 ? 0 : 1;
    } else if (type === 3) {
      newObject.userView = newObject.userView === 1 ? 0 : 1;
    }
    userData[index] = newObject;
    setUserData([...userData]);
    updateUserData(newObject);
  }

  function updateUserData(updateData) {
    let binaryValue = `${updateData.executiveView}${updateData.adminView}${updateData.managerView}${updateData.userView}`;
    var decimalValue = parseInt(binaryValue, 2);
    updateData.userRole = decimalValue;
    accountService
      .update(updateData.id, updateData)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUserName(firstName, lastName) {
    if (firstName !== "" || firstName !== null) {
      const userName = firstName + " " + lastName;
      return userName;
    } else if (lastName !== "" || lastName !== null) {
      return lastName;
    } else {
      return "Anonymous";
    }
  }
  function getAllUser(sizePerPage, currentOffset, searchValue) {
    setIsSubmitting(true);
    accountService
      .getAll(sizePerPage, currentOffset, searchValue)
      .then((accounts) => {
        let data = accounts.accounts;
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (hasExecView(element.userRole)) {
              element["executiveView"] = 1;
            } else {
              element["executiveView"] = 0;
            }

            if (hasAdminView(element.userRole)) {
              element["adminView"] = 1;
            } else {
              element["adminView"] = 0;
            }

            if (hasManagerView(element.userRole)) {
              element["managerView"] = 1;
            } else {
              element["managerView"] = 0;
            }

            if (hasUserView(element.userRole)) {
              element["userView"] = 1;
            } else {
              element["userView"] = 0;
            }

            if (i === data.length - 1) {
              setUserData(data);
              setTotalSize(accounts.count);
              setIsSubmitting(false);
            }
          }
        } else {
          setUserData(data);
          setTotalSize(accounts.count);
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  }

  function onSearch(value) {
    setSearchValue(value);
    if (value.length > 3) {
      getAllUser(sizePerPage, 0, value);
    } else if (value === "" || value === null) {
      getAllUser(sizePerPage, 0, value);
    }
  }

  const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
    <div>
      <React.Fragment>
        <Row className="mb-2">
          <Col
            // md="4"
            className="d-flex justify-content-start"
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
          </Col>
        </Row>

        <Row>
          <Col xl="12">
            <div className="table-responsive">
              <BootstrapTable
                remote
                keyField="id"
                data={data}
                columns={columns}
                filter={filterFactory()}
                pagination={paginationFactory({ page, sizePerPage, totalSize })}
                onTableChange={onTableChange}
                noDataIndication={() => {
                  if (userData.length === 0 && !isSubmitting)
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

  const handleTableChange = (
    type,
    { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
  ) => {
    const currentOffset = (page - 1) * sizePerPage;
    getAllUser(sizePerPage, currentOffset, searchValue);
    setPage(page);
    setSizePerPage(sizePerPage);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="List" breadcrumbItem={"User Access View"} />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <RemoteAll
                    data={userData}
                    page={page}
                    sizePerPage={sizePerPage}
                    totalSize={totalSize}
                    onTableChange={handleTableChange}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Loader loading={isSubmitting} />
      </div>
    </React.Fragment>
  );
};

export default List;
