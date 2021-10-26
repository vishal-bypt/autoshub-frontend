import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Card, CardBody, Col, Row } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Loader from "../../../components/Common/Loader";
import { accountService } from "../../../services";

function List({ history, match }) {
  const [userData, setUserData] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAllUser(sizePerPage, 0, searchValue);
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

  function getAllUser(sizePerPage, currentOffset, searchValue) {
    setIsSubmitting(true);
    accountService
      .getAll(sizePerPage, currentOffset, searchValue)
      .then((data) => {
        setUserData(data.accounts);
        setTotalSize(data.count);
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  }
  const openAddEditUser = (user) => {
    history.push("/userList/editUser", { user: user });
  };

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
            className="d-flex justify-content-between"
          >
            <div className="search-box me-2 mb-2 d-inline-block">
              <div className="position-relative">
                {/* <SearchBar searchText={searchValue} onSearch={onSearch} /> */}
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
        </Row>

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
                pagination={paginationFactory({
                  page,
                  sizePerPage,
                  totalSize,
                })}
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

  const handleTableChange = (type, { page, sizePerPage }) => {
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
}

export default List;
