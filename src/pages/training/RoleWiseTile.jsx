/* eslint-disable react/style-prop-object */
import React from "react";
import { accountService } from "../../services";
import { Container, Row } from "reactstrap";
import TileComponent from "./TileComponent";

const RoleWiseTile = (props) => {
  const userDetails = accountService.userValue;
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row style={{ justifyContent: "center" }}>
            {userDetails &&
              userDetails.userRoleArray &&
              userDetails.userRoleArray.map((userRole, key) => (
                <TileComponent userRoleInfo={userRole} key={"_user_" + key} />
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};
export { RoleWiseTile };
