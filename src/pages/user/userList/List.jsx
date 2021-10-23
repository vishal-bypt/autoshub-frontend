import React, { useEffect, useState } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import MetaTags from "react-meta-tags";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { Card, CardBody, Col, Row, Modal } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import { accountService, alertService } from "../../../services";

function List({ history, match }) {
  const { path } = match;
  const userDetails = accountService.userValue;
  const [users, setUsers] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    getAllUser();
  }, []);

  const columns = [
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "firstName",
      text: "First Name",
    },
    {
      dataField: "lastName",
      text: "Last Name",
    },
    {
      dataField: "empId",
      text: "Employee Id",
      formatter: (cellContent, row) => (
        <div>{row.empId ? row.empId : "N/A"}</div>
      ),
    },
    {
      dataField: "managerId",
      text: "Manager Id",
      formatter: (cellContent, row) => (
        <div>{row.managerId ? row.managerId : "N/A"}</div>
      ),
    },
    {
      dataField: "execId",
      text: "General Manager - Exec Id",
      formatter: (cellContent, row) => (
        <div>{row.execId ? row.execId : "N/A"}</div>
      ),
    },
    {
      dataField: "",
      text: "",
      formatter: (cellContent, row) => (
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => openAddEditUser(row)}
        >
          Edit
        </button>
      ),
    },
  ];

  function getAllUser() {
    accountService.getAll().then((data) => {
      setUsers(data.accounts);
      setTotalSize(data.count);
    });
  }
  const openAddEditUser = (user) => {
    history.push("/userList/editUser", { user: user });
  };

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
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        columns={columns}
                        data={users}
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col
                                // md="4"
                                className="d-flex justify-content-between"
                              >
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <Link
                                      to="/userList/addUsers"
                                      className="btn btn-primary"
                                    >
                                      Add Users
                                    </Link>
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
      </div>
    </React.Fragment>
  );
}

export default List;
