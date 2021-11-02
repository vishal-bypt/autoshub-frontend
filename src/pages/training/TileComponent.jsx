import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Col } from "reactstrap";
import adminView from "../../assets/images/tiles/AdminView.jpeg";
import execView from "../../assets/images/tiles/ExecView.jpeg";
import managerView from "../../assets/images/tiles/ManagerView.jpeg";
import userView from "../../assets/images/tiles/UserView.jpeg";
import { Role, setCurrentUserRole } from "../../helpers";

const TileComponent = (props) => {
  const { userRoleInfo } = props;
  let history = useHistory();
  const tileView = (tileRole) => {
    let tileImage = userView;
    let path = "/training/list";
    if (tileRole === Role.Exec) {
      tileImage = execView;
      path = "/dashboard";
    } else if (tileRole === Role.Admin) {
      tileImage = adminView;
    } else if (tileRole === Role.Manager) {
      tileImage = managerView;
    } else if (tileRole === Role.User) {
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
              setTimeout(() => {
                history.push(path);
              }, 1000);
              // setCurrentUserRole(tileRole).then(() => {
              //   console.log("first::");
              //   history.push(path, { tileRole: tileRole });
              // });
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
  userRoleInfo: PropTypes.string,
};

export default TileComponent;
