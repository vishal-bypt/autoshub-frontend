import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import {
  setCurrentUserRole,
  Role,
  hasExecView,
  hasAdminView,
  hasManagerView,
  hasUserView,
} from "../../helpers";
import execView from "../../assets/images/tiles/ExecView.jpeg";
import adminView from "../../assets/images/tiles/AdminView.jpeg";
import managerView from "../../assets/images/tiles/ManagerView.jpeg";
import userView from "../../assets/images/tiles/UserView.jpeg";

import { useHistory } from "react-router-dom";

const TileComponent = (props) => {
  const { userRoleInfo } = props;
  let history = useHistory();
  const tileView = (tileRole) => {
    let tileImage = userView;
    let path = "/training/list";
    if (tileRole == Role.Exec) {
      tileImage = execView;
      path = "/dashboard";
    } else if (tileRole == Role.Admin) {
      tileImage = adminView;
    } else if (tileRole == Role.Manager) {
      tileImage = managerView;
    } else if (tileRole == Role.User) {
      tileImage = userView;
    }

    return (
      <Col xl="3" sm="6">
        <Card className="text-center">
          <img
            src={tileImage}
            alt={tileRole}
            onClick={() => {
              setCurrentUserRole(tileRole);
              history.push(path);
            }}
          />
          <div className="text-center">{tileRole}</div>
        </Card>
      </Col>
    );
  };

  return <React.Fragment>{tileView(userRoleInfo)}</React.Fragment>;
};

TileComponent.propTypes = {
  userRoleInfo: PropTypes.object,
};

export default TileComponent;
