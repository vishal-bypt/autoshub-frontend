import PropTypes from "prop-types"
import React, { useEffect, useRef, useCallback } from "react"

//Import Icons
import FeatherIcon from "feather-icons-react";

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { accountService } from "../../services";
import { Role, setCurrentUserRole } from "../../helpers";

const SidebarContent = props => {
  const userDetails = accountService.userValue;

  const ref = useRef()

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/landing" className="">
                <FeatherIcon
                  icon="home"
                />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/training" className="has-arrow">
                <FeatherIcon
                  icon="users"
                />
                <span>{props.t("Training")}</span>
              </Link>
              <ul className="sub-menu">
                {userDetails &&
                  userDetails.userRoleArray &&
                  userDetails.userRoleArray.map((tileRole, key) => {
                    if (tileRole === Role.Exec) {
                      return (
                        <li>
                          <Link to="/dashboard" className="">
                            <FeatherIcon
                              icon="file-text"
                            />
                            <span>{props.t(Role.Exec)}</span>
                          </Link>
                        </li>
                      )
                    } else if (tileRole === Role.Admin) {
                      return (
                        <li>
                          <Link to="/#"
                            onClick={e => {
                              e.preventDefault();
                            }} className="">
                            <div onClick={() => {
                              setCurrentUserRole(tileRole);
                              setTimeout(() => {
                                props.history.push("/training/list");
                              }, 1000);
                            }}>
                              <FeatherIcon
                                icon="file-text"
                              />
                              <span>{props.t(Role.Admin)}</span>
                            </div>
                          </Link>
                        </li>
                      )
                    } else if (tileRole === Role.Manager) {
                      return (
                        <li>
                          <Link to="/#"
                            onClick={e => {
                              e.preventDefault();
                            }} className="">
                            <div onClick={() => {
                              setCurrentUserRole(tileRole);
                              setTimeout(() => {
                                props.history.push("/training/list");
                              }, 1000);
                            }}>
                              <FeatherIcon
                                icon="file-text"
                              />
                              <span>{props.t(Role.Manager)}</span>
                            </div>
                          </Link>
                        </li>
                      )
                    } else if (tileRole === Role.User) {
                      return (
                        <li>
                          <Link to="/#"
                            onClick={e => {
                              e.preventDefault();
                            }} className="">
                            <div onClick={() => {
                              setCurrentUserRole(tileRole);
                              setTimeout(() => {
                                props.history.push("/training/myTraining");
                              }, 1000);
                            }}>
                              <FeatherIcon
                                icon="file-text"
                              />
                              <span>{props.t(Role.User)}</span>
                            </div>
                          </Link>
                        </li>
                      )
                    }
                  })}

              </ul>
            </li>
            {/* <li>
              <Link to="/" className="">
                <FeatherIcon
                  icon="file-text"
                />
                <span>{props.t("RFC")}</span>
              </Link>
            </li>
            <li>
              <Link to="/revenue" className="">
                <FeatherIcon
                  icon="file-text"
                />
                <span>{props.t("Revenue")}</span>
              </Link>
            </li> */}
            {
              (userDetails && userDetails.role && userDetails.role === "Admin") &&
              <li>
                <Link to="/#" className="has-arrow ">
                  <FeatherIcon
                    icon="users"
                  />
                  <span>{props.t("Users")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/userList" className="">
                      <FeatherIcon
                        icon="file-text"
                      />
                      <span>{props.t("User List")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/userAccessView" className="">
                      <FeatherIcon
                        icon="users"
                      />
                      <span>{props.t("User Access View")}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            }
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
