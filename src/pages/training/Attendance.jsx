import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Role } from "../../helpers";
import { accountService, alertService, trainingService } from "../../services";
import PopUpFileUpload from "./PopUpFileUpload";

import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../assets/scss/custom/components/_tableblur.scss";

function Attendance({ history, match }) {
  const userDetails = accountService.userValue;
  const [users, setUsers] = useState(null);
  let filteredData = [];
  useEffect(() => {
    if (userDetails.currentRole === Role.Admin) {
      trainingService.getAcceptedAdminTrainingList().then((x) => {               
        setUsers(x);
      });
    }
  }, []);

  const attendClick = (e) =>{    
    let params = {
      id: e.id,
      isAttendanceApproved: 1
    };    
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully training attendance accepted", {
        keepAfterRouteChange: true,
      });
      setUsers(data)
      // history.push('/training');
    });

  }

  const rejectClick = (e) => {    
    let params = {
      id: e.id,
      isAttendanceApproved: 2
    };    
    trainingService.acceptOrRejectPreRequisites(params).then((data) => {
      alertService.success("Successfully training attendance accepted", {
        keepAfterRouteChange: true,
      });
      setUsers(data)
      // history.push('/training');
    });
  }
 
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7">
            {userDetails.currentRole === Role.Admin && (
              <h1 className="text-end font-weight-bold mb-5 text-danger">Attendance Trainings</h1>
            )}           
          </div>
          <div className="col-md-5 text-end">
            <Link to={"."} className="btn btn-danger ">
              <ArrowBackIcon className="mr-1" />
              Back
            </Link>
          </div>
        </div>        
      </div>      
      <div className="data-table-div">
        <div className="data-table">
          <div className="table-responsive">
            <Table
              id="tech-companies-1"
              className="table tableBlur table-bordered"
            >
              <Thead>
                <Tr>
                  <Th>#</Th>
                  {userDetails.currentRole === Role.Admin && (
                    <>
                      <Th>Nominated Employee</Th>
                      <Th>Nominated By</Th>
                      <Th>Start Date</Th>
                      <Th>End Date</Th>
                      <Th>Training Name</Th>
                      <Th>ToolName</Th>                      
                      <Th>Stream</Th>
                      <Th>Action</Th>
                    </>
                  )}   
                </Tr>
              </Thead>
              <Tbody>
                {users?.length>0 &&
                  users?.map((user, index) => (
                    <Tr key={index}>
                      <Td className="traning-listing" style={{ minWidth: "40px" }}>
                        {index + 1}
                      </Td>
                      {userDetails.currentRole === Role.Admin && (
                        <>
                          <Td className="traning-listing" style={{ minWidth: "100px" }}>
                            {user.assignTo.firstName} {user.assignTo.lastName}
                          </Td>
                          <Td className="traning-listing" style={{ minWidth: "100px" }}>
                            {user.assignBy.firstName}  {user.assignBy.lastName}
                          </Td>
                          <Td className="traning-listing" style={{ minWidth: "150px" }}>
                            {moment(user.training.trainingStartDate).format("DD/MM/YYYY")}
                          </Td>
                          <Td className="traning-listing" style={{ minWidth: "130px" }}>
                            {moment(user.training.trainingEndDate).format("DD/MM/YYYY")}
                          </Td>                          
                          <Td className="traning-listing" style={{ minWidth: "130px" }}>
                            {user.training.trainingName}
                          </Td>                          
                          <Td className="traning-listing" style={{ minWidth: "150px" }}>
                            {user.training.toolName}
                          </Td>
                          <Td className="traning-listing" style={{ minWidth: "150px" }}>
                            {user.training.stream}
                          </Td>
                          <Td style={{ minWidth: "150px" }}>     
                          {user?.isAttendanceApproved == 1 ? (
                            <div>Attended</div> ):(
                              <div>
                                {user?.isAttendanceApproved == 2 ?(
                                <div>Absent</div> ):(
                                <div>                       
                                  <Link onClick={() => {
                                      attendClick(user)
                                      }} to={`#`} className="btn btn-primary mr-1">
                                      Attended
                                  </Link>
                                    {/* <Link onClick={attendRejectClick(user)} type="button" className="btn btn-primary mr-1">
                                      Attended
                                    </Link> */}
                                  <Link onClick={() => {
                                      rejectClick(user)
                                    }} to={`#`} type="button" className="btn btn-danger ml-1">
                                      Absent
                                  </Link>
                                </div>
                              )}
                              </div>
                            )}                            
                          </Td>
                          </>
                      )} 
                    </Tr>
                  ))}
                {!users && (
                  <tr>
                    <Td colSpan="10" className="text-center">
                      <span className="spinner-border spinner-border-lg align-center"></span>
                    </Td>
                  </tr>
                )}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Attendance };
