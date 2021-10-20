import React, { useEffect, useState } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import MetaTags from "react-meta-tags";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { Card, CardBody, Col, Row, Modal } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { decimalTobinary } from "../../helpers";
import { accountService, alertService } from "../../services";

const List = ({ history }) => {
  const [userData, setUserData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    alertService.success("Alert", { keepAfterRouteChange: true });

    getAllUser();
  }, []);

  function getAllUser() {
    accountService.getAll().then((data) => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const rolesArray = decimalTobinary(element.userRole);
        if (rolesArray.includes("executive")) {
          element["executiveView"] = 1;
        } else {
          element["executiveView"] = 0;
        }

        if (rolesArray.includes("admin")) {
          element["adminView"] = 1;
        } else {
          element["adminView"] = 0;
        }

        if (rolesArray.includes("manager")) {
          element["managerView"] = 1;
        } else {
          element["managerView"] = 0;
        }

        if (rolesArray.includes("user")) {
          element["userView"] = 1;
        } else {
          element["userView"] = 0;
        }

        if (i === data.length - 1) {
          setUserData(data);
        }
      }
    });
  }

  function onPermissionChange(id, type) {
    let updatedArray = userData.map((item) => {
      if (item.id === id) {
        if (type === 0) {
          item.executiveView = item.executiveView === 1 ? 0 : 1;
        } else if (type === 1) {
          item.adminView = item.adminView === 1 ? 0 : 1;
        } else if (type === 2) {
          item.managerView = item.managerView === 1 ? 0 : 1;
        } else if (type === 3) {
          item.userView = item.userView === 1 ? 0 : 1;
        }
      }
      return item;
    });
    setUserData(updatedArray);
  }

  function onSubmit() {
    setIsSubmitting(true);
    let tempUserData = userData.map((item) => ({ ...item }));
    for (let i = 0; i < tempUserData.length; i++) {
      const element = tempUserData[i];
      let binaryValue = `${element.userView}${element.managerView}${element.adminView}${element.executiveView}`;
      var decimalValue = parseInt(binaryValue, 2);
      element.userRole = decimalValue;
      delete element.executiveView;
      delete element.adminView;
      delete element.managerView;
      delete element.userView;
      updateUser(element.id, element, i, tempUserData.length);
    }
  }

  function updateUser(id, item, index, length) {
    accountService
      .update(id, item)
      .then(() => {
        if (index === length - 1) {
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        alertService.error(error);
        setIsSubmitting(false);
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

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="List" breadcrumbItem={"Users"} />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="table-rep-plugin">
                    <div className="table-responsive mb-0">
                      <Table className="table table-striped table-bordered">
                        <Thead>
                          <Tr>
                            <Th>Users</Th>
                            <Th className="text-center">Executive View</Th>
                            <Th className="text-center">Admin View</Th>
                            <Th className="text-center">Manager View</Th>
                            <Th className="text-center">User View</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {userData &&
                            userData.length > 0 &&
                            userData.map((item, index) => {
                              return (
                                <Tr key={index}>
                                  <Td>
                                    <label>
                                      {getUserName(
                                        item.firstName,
                                        item.lastName
                                      )}
                                    </label>
                                  </Td>
                                  <Td className="text-center">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="formCheck1"
                                      checked={item.executiveView}
                                      onChange={() =>
                                        onPermissionChange(item.id, 0)
                                      }
                                    />
                                  </Td>
                                  <Td className="text-center">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="formCheck1"
                                      checked={item.adminView}
                                      onChange={() =>
                                        onPermissionChange(item.id, 1)
                                      }
                                    />
                                  </Td>
                                  <Td className="text-center">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="formCheck1"
                                      checked={item.managerView}
                                      onChange={() =>
                                        onPermissionChange(item.id, 2)
                                      }
                                    />
                                  </Td>
                                  <Td className="text-center">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="formCheck1"
                                      checked={item.userView}
                                      onChange={() =>
                                        onPermissionChange(item.id, 3)
                                      }
                                    />
                                  </Td>
                                </Tr>
                              );
                            })}
                          {userData.length === 0 && (
                            <tr>
                              <td colSpan="5" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                              </td>
                            </tr>
                          )}
                        </Tbody>
                      </Table>
                    </div>
                    <div className="text-end mt-3">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="btn btn-primary btn-lg w-md"
                        onClick={onSubmit}
                      >
                        {isSubmitting && (
                          <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        )}
                        {"Save"}
                      </button>
                    </div>
                  </div>
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
