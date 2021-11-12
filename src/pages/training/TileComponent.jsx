import PropTypes from "prop-types";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Col } from "reactstrap";
import { Role, setCurrentUserRole } from "../../helpers";

const adminView = "/assets/images/tiles/AdminView.jpeg";
const execView = "/assets/images/tiles/ExecView.jpeg";
const managerView = "/assets/images/tiles/ManagerView.jpeg";
const userView = "/assets/images/tiles/UserView.jpeg";

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
      tileImage = "/assets/images/tiles/AdminView.jpeg";
    } else if (tileRole === Role.Manager) {
      tileImage = managerView;
    } else if (tileRole === Role.User) {
      path = "/training/myTraining";
      tileImage = userView;
    }

    return (
      <Col xl="3" sm="6">
        <Card style={{ borderColor: "transparent", width: "90%" }}>
          <img
            src={tileImage}
            alt={tileRole}
            style={{
              borderRadius: "10px",
              boxShadow: "0px 5px 20px rgba(0,0,0,0.5)",
            }}
            onClick={() => {
              setCurrentUserRole(tileRole);
              setTimeout(() => {
                history.push(path);
              }, 1000);
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
