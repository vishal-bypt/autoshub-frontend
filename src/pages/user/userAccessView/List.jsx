import React, { useEffect, useState } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import MetaTags from "react-meta-tags";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { Card, CardBody, Col, Row, Modal } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import {
  hasAdminView,
  hasExecView,
  hasManagerView,
  hasUserView,
  rolesArray,
} from "../../../helpers";
import { accountService, alertService } from "../../../services";

const List = ({ history }) => {
  const [userData, setUserData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalOffset, setTotalOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    getAllUser();
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
            // onChange={() => onPermissionChangeNew(row.id, 0)}
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
          // onChange={() => onPermissionChangeNew(row.id, 1)}
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
          // onChange={() => onPermissionChangeNew(row.id, 2)}
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
          // onChange={() => onPermissionChangeNew(row.id, 3)}
        />
      ),
    },
  ];

  function getAllUser() {
    accountService.getAll(limit, currentOffset).then((accounts) => {
      let data = accounts.accounts;
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
        }
      }
    });
  }

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
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: totalSize,
    custom: true,
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
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={columns}
                    data={userData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        columns={columns}
                        data={userData}
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"id"}
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    classes={"table align-middle table-nowrap"}
                                    headerWrapperClasses={"thead-light"}
                                    noDataIndication={() => (
                                      <div>
                                        <div
                                          colSpan="5"
                                          className="text-center"
                                        >
                                          <span className="spinner-border spinner-border-lg align-center"></span>
                                        </div>
                                      </div>
                                    )}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="align-items-md-center mt-30">
                              <Col className="inner-custom-pagination d-flex">
                                <div className="d-inline">
                                  <SizePerPageDropdownStandalone
                                    {...paginationProps}
                                  />
                                </div>
                                <div className="text-md-right ms-auto">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                    // onPageChange={onPageChange}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal className="d-none" isOpen={isSubmitting}></Modal>
      </div>
    </React.Fragment>
  );
};

export default List;
