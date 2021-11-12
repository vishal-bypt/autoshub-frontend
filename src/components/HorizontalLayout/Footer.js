import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer position-fixed">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © Auto S Hub.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by
                <a href="https://www.techmahindra.com/en-in/business-process-services/" className="ms-1 text-decoration-underline">
                  AUTO S HUB
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
