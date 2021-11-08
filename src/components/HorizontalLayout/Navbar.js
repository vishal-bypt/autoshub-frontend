import classname from "classnames";
//Import Icons
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
//i18n
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "reactstrap";
import { Role, setCurrentUserRole } from "../../helpers";
import { accountService } from "../../services";

const Navbar = props => {
  const userDetails = accountService.userValue;
  const [app, setapp] = useState(false);

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });
  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link className="nav-link arrow-none" to="/landing">
                    <FeatherIcon
                      icon="home"
                    />
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault();
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <FeatherIcon
                      icon="users"
                    />
                    {props.t("Training")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    {userDetails &&
                      userDetails.userRoleArray &&
                      userDetails.userRoleArray.map((tileRole, key) => {
                        if (tileRole === Role.Exec) {
                          return (
                            <Link to="/dashboard" className="dropdown-item">
                              {props.t(Role.Exec)}
                            </Link>
                          )
                        } else if (tileRole === Role.Admin) {
                          return (
                            <div onClick={() => {
                              setCurrentUserRole(tileRole);
                              setTimeout(() => {
                                props.history.push("/training/list");
                              }, 1000);
                            }} className="dropdown-item">
                              {props.t(Role.Admin)}
                            </div>
                          )
                        } else if (tileRole === Role.Manager) {
                          return (
                            <div onClick={() => {
                              setCurrentUserRole(tileRole);
                              setTimeout(() => {
                                props.history.push("/training/list");
                              }, 1000);
                            }} className="dropdown-item">
                              {props.t(Role.Manager)}
                            </div>
                          )
                        } else if (tileRole === Role.User) {
                          return (
                            <div onClick={() => {
                              setCurrentUserRole(tileRole);
                              setTimeout(() => {
                                props.history.push("/training/list");
                              }, 1000);
                            }} className="dropdown-item">
                              {props.t(Role.User)}
                            </div>
                          )
                        }
                      })}
                  </div>
                </li>

                {/* <li className="nav-item dropdown">
                  <Link
                    to="/"
                    className="nav-link arrow-none"
                  >
                    <FeatherIcon
                      icon="briefcase"
                    />
                    {props.t("RFC")}
                  </Link>
                </li> */}

                {/* <li className="nav-item dropdown">
                  <Link
                    to="/revenue"
                    className="nav-link arrow-none"
                  >
                    <FeatherIcon
                      icon="file-text"
                    />
                    {props.t("Revenue")}
                  </Link>
                </li> */}

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault();
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <FeatherIcon
                      icon="users"
                    />
                    {props.t("Users")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="/userList" className="dropdown-item">
                      {props.t("User List")}
                    </Link>
                    <Link to="/userAccessView" className="dropdown-item">
                      {props.t("User Access View")}
                    </Link>
                  </div>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
);
