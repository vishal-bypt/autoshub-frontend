import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Swal from 'sweetalert2'
import moment from 'moment';
import { accountService, trainingService, alertService, } from '../../services';
import PopUpFileUpload from './PopUpFileUpload';

function AllNominations({ history, match }) {
    const { path } = match;
    const userDetails = accountService.userValue;    
    const [users, setUsers] = useState(null);
    let filteredData = []
    useEffect(() => {       
        if (userDetails.role == "Admin") {           
            trainingService.getActiveTrainingList().then((x) => {                
                for (let i = 0; i < x.length; i++) {
                    if (x[i].assignedByName != null && x[i].assignedToName != null) {                        
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"                            
                        }
                        filteredData.push(x[i])
                    }
                }
                setUsers(filteredData)
            });
        }
    }, []);   

    const viewPreRequisited = e => () => {
        let id = e.id;
        let userId = e.assignedToId;
        trainingService.viewPreRequisites(id, userId).then((data) => {            
        })
    }

    const handleClickAccept = e => () => {        
        let params = {
            trainingId: e.id,
            userId: e.assignedToId,
            isAccept: 1,
            managerId: e.assignedById
        }
        trainingService.acceptOrRejectPreRequisites(params).then((data) => {
            alertService.success('Successfully accepted training prerequisites', { keepAfterRouteChange: true });
            Swal.fire(                
                'Submitted Prerequisite of the employee has been approved.'                
              )
            trainingService.getActiveTrainingList().then((x) => {                
                for (let i = 0; i < x.length; i++) {
                    if (x[i].assignedByName != null && x[i].assignedToName != null) {                        
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"                           
                        }
                        filteredData.push(x[i])
                    }
                }
                setUsers(filteredData)
            });
            history.push('/training/getAllNominations');
        })
    }

    const handleClickReject = e => () => {       
        let params = {
            trainingId: e.id,
            userId: e.assignedToId,
            isAccept: 2,
            managerId: e.assignedById
        }
        trainingService.acceptOrRejectPreRequisites(params).then((data) => {
            alertService.success('Successfully rejected training prerequisites', { keepAfterRouteChange: true });
            Swal.fire(                
                'Submitted Prerequisite of the employee has been declined.'                
              )
            trainingService.getActiveTrainingList().then((x) => {                
                for (let i = 0; i < x.length; i++) {
                    if (x[i].assignedByName != null && x[i].assignedToName != null) {                        
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"                            
                        }
                        filteredData.push(x[i])
                    }
                }
                setUsers(filteredData)
            });
            history.push('/training/getAllNominations');
        })
    }
    return (
        <div className="page-content">           
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        {userDetails.role == "Admin" &&
                            <h1 className="header-text">Nominated Trainings</h1>
                        }
                        {userDetails.role == "User" &&
                            <h1 className="header-text">My Trainings</h1>
                        }
                        {userDetails.role == "Manager" &&
                            <h1 className="header-text">Trainings</h1>
                        } 
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to={'.'}   className="btn btn-danger "><ArrowBackIcon className="mr-1" />Back</Link>
                    </div>
                </div>
                <div>&nbsp;</div>
            </div>
            {/* <div className="button-div">
                <div className="row">
                    <div className="container">
                        <div className="col-md-12">
                            {userDetails.role == "Admin" &&
                                <h1 className="header-text">Nominated Trainings</h1>
                            }
                            {userDetails.role == "User" &&
                                <h1 className="header-text">My Trainings</h1>
                            }
                            {userDetails.role == "Manager" &&
                                <h1 className="header-text">Trainings</h1>
                            }                            
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="data-table-div">
                <div className="data-table">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {userDetails.role == "Admin" &&
                                        <th className="traning-listing">Nominated Employee</th>
                                    }
                                    {userDetails.role == "User" &&
                                        <th className="traning-listing" >Nominated Employee</th>
                                    }
                                    {userDetails.role == "Admin" &&
                                        <th className="traning-listing" >Nominated By</th>
                                    }
                                    {userDetails.role == "User" &&
                                        <th className="traning-listing" >Nominated By</th>
                                    }
                                    <th className="traning-listing" >Training Name</th>
                                    {userDetails.role == "Manager" &&
                                        <th className="traning-listing" >Training Type</th>
                                    }
                                    <th className="traning-listing" >Start Date</th>
                                    <th className="traning-listing" >End Date</th>
                                    <th className="traning-listing" >Required Prerequisites</th>                                    
                                    {userDetails.role == "Manager" &&
                                        <th className="traning-listing" >Nomination End Date</th>
                                    }                                    
                                    {userDetails.role == "Admin" &&
                                        <th className="traning-listing" >Submitted Prerequisites</th>
                                    }
                                    {userDetails.role == "User" &&
                                        <th className="traning-listing" >Status</th>
                                    }
                                    {userDetails.role == "Admin" &&
                                        <th className="traning-listing">Status</th>
                                    }
                                    {userDetails.role == "Admin" &&
                                        <th className="traning-listing" >Approve / Decline Prerequisites</th>
                                    }

                                    {userDetails.role == "User" &&
                                        <th className="traning-listing" >Upload Prequisites</th>
                                    }
                                    {userDetails.role == "Manager" &&
                                        <th></th>
                                    }
                                </tr>
                            </thead>
                            <tbody>                                
                                {users && users.map((user, index) =>
                                    <tr key={index}>                                        
                                        <td className="traning-listing" style={{ minWidth: '40px' }}>{index + 1}</td>
                                        {userDetails.role == "Admin" &&
                                            <td className="traning-listing" style={{ minWidth: '100px' }}>{user.assignedToName} </td>
                                        }
                                        {userDetails.role == "User" &&
                                            <td className="traning-listing" style={{ minWidth: '100px' }}>{user.assignedToName} </td>
                                        }
                                        {userDetails.role == "Admin" &&
                                            <td className="traning-listing" style={{ minWidth: '100px' }}>{user.assignedByName ? user.assignedByName : "NA"}</td>
                                        }
                                        {userDetails.role == "User" &&
                                            <td className="traning-listing" style={{ minWidth: '100px' }}>{user.assignedByName} </td>
                                        }
                                        <td className="traning-listing" style={{ minWidth: '150px' }}>{user.trainingName}</td>
                                        {userDetails.role == "Manager" &&
                                            <td className="traning-listing">{user.trainingType}</td>
                                        }
                                        <td className="traning-listing" style={{ minWidth: '130px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                                        <td className="traning-listing" style={{ minWidth: '130px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>
                                        <td className="traning-listing" style={{ minWidth: '130px' }}>{user.trainingPrequisites}</td>
                                        {userDetails.role == "Manager" &&
                                            <td>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>
                                        } 
                                        {userDetails.role == "Admin" &&
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>
                                                {user.preRequisites != "N/A" ? <a style={{ color: '#12f339',fontWeight:"bolder", textDecoration: 'underline' }} target="_blank" /* href={config.apiUrl + "/" + user.preRequisites} */ onClick={viewPreRequisited(user)} >Check</a>
                                                    :
                                                    "N/A"}</td>
                                        }
                                        {userDetails.role == "Admin" &&
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>
                                                Pending
                                            </td>
                                        }                                        
                                        {userDetails.role == "Admin" &&
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>
                                                {user.preRequisites != "N/A" ?
                                                    <div>
                                                        {user.acceptRejectStatus == "Completed" ?
                                                            <a style={{ color: '#12f339',fontWeight:"bolder", textDecoration: 'underline' }} onClick={handleClickReject(user)}>Decline</a> :
                                                            <div>
                                                                {user.acceptRejectStatus == "Pending" ?
                                                                    <div>
                                                                        <a style={{ color: '#12f339',fontWeight:"bolder", textDecoration: 'underline' }} onClick={handleClickAccept(user)}> Approve</a> / <a style={{ color: '#12f339', textDecoration: 'underline' }} onClick={handleClickReject(user)}> Decline</a>
                                                                    </div> :
                                                                    <a style={{ color: '#12f339',fontWeight:"bolder", textDecoration: 'underline' }} onClick={handleClickAccept(user)}> Approve</a>}
                                                            </div>
                                                        }
                                                    </div> :
                                                    "-"
                                                }
                                            </td>
                                        }
                                        {userDetails.role == "User" &&
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>
                                                {user.acceptRejectStatus == 0 ?
                                                    "Pending" : "Completed"
                                                }
                                            </td>
                                        }
                                        {userDetails.role == "User" &&
                                            <td>
                                                {user.acceptRejectStatus != "1" ?
                                                    <PopUpFileUpload id={user.id} userDetails={userDetails} /> :
                                                    "-"
                                                }
                                            </td>
                                        }
                                        {userDetails.role == "Manager" &&
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>
                                                <Link className="traning-listing" to={`/training/assign/${user.id}`} className="btn btn-sm btn-primary mr-1 link-color">Nominate</Link>
                                            </td>
                                        }
                                    </tr>
                                )}
                                {!users &&
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <span className="spinner-border spinner-border-lg align-center"></span>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>       
    );
}

export { AllNominations };
