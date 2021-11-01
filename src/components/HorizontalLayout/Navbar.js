import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//Import Icons
import FeatherIcon from "feather-icons-react";

//i18n
import { withTranslation } from "react-i18next";
import SimpleBar from "simplebar-react"
import { connect } from "react-redux";
import { accountService } from "../../services";

const Navbar = props => {

  const [ui, setui] = useState(false);
  const [app, setapp] = useState(false);
  const [email, setemail] = useState(false);
  const [contact, setcontact] = useState(false);
  const [component, setcomponent] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [extra, setextra] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [auth, setauth] = useState(false);
  const [utility, setutility] = useState(false);

  const ref = useRef()
  const userDetails = accountService.userValue;

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

                <li>
                  <Link
                    to="/training"
                    // onClick={e => {
                    //   e.preventDefault();
                    //   setui(!ui);
                    // }}
                    className="nav-link arrow-none"
                  >
                    <FeatherIcon
                      icon="users"
                    />
                    {props.t("Training")}
                  </Link>
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
                    {/* <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault();
                          setemail(!email);
                        }}
                      >
                        {props.t("Email")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: email })}
                      >
                        <Link to="/email-inbox" className="dropdown-item">
                          {props.t("Inbox")}
                        </Link>
                        <Link to="/email-read" className="dropdown-item">
                          {props.t("Read Email")}
                        </Link>
                      </div>
                    </div> */}
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
