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
      tileImage = userView;
    }

    return (
      <Col xl="3" sm="6">
        <div className="tile-div text-center ">
          
          <img
            src={tileImage}
            alt={tileRole}
            style={{width:'300px', heigth: '300px', cursor:'pointer'}}
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
          
        </div>
      </Col>
    );
  };

  return <React.Fragment>{tileView(userRoleInfo)}</React.Fragment>;
};

TileComponent.propTypes = {
  userRoleInfo: PropTypes.string,
};

export default TileComponent;
