import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      let localData = localStorage.getItem("authUser")
      console.log("localData::", localData)
      console.log("props::", props.history.location.pathname)
      console.log("condition::", (isAuthProtected && !localData) || (localData && !localData["jwtToken"] && (props.history.location && props.history.location.pathname !== "/page-two-step-verification")))
      console.log("condition::1", (isAuthProtected && !localData))
      console.log("condition::2", (localData && localData["jwtToken"] === null))
      console.log("condition::3", props.history.location)
      console.log("condition::4", props.history.location.pathname !== "/page-two-step-verification")
      console.log("condition::5", (localData && !localData["jwtToken"] && props.history.location && props.history.location.pathname !== "/page-two-step-verification"))
      //console.log("isAuthProtected == ",isAuthProtected)
      if ((isAuthProtected && !localData) || (localData && localData["jwtToken"] === null && props.history.location && props.history.location.pathname !== "/page-two-step-verification")) {
        console.log("login::")
        localStorage.clear()
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
      console.log("outside login::")

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
