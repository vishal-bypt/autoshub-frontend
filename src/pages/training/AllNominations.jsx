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
    //console.log("userDetails == ", userDetails);
    const [users, setUsers] = useState(null);
    let filteredData = []
    useEffect(() => {       
        if (userDetails.role == "Admin") {           
            trainingService.getActiveTrainingList().then((x) => {                
                for (let i = 0; i < x.length; i++) {
                    if (x[i].assignedByName != null && x[i].assignedToName != null) {
                        //console.log("x[1] == ", x[i]);
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"
                            //console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
                        }
                        filteredData.push(x[i])
                    }
                }
                setUsers(filteredData)
            });
        }
    }, []);

    //console.log("usr outside == ", users);    

    const viewPreRequisited = e => () => {
        let id = e.id;
        let userId = e.assignedToId;
        trainingService.viewPreRequisites(id, userId).then((data) => {
            //console.log("response data == ", data);
            /*  alertService.success('Successfully accepted training prerequisites', { keepAfterRouteChange: true });
             history.push('/training'); */
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
                //console.log("x == ", x.length);
                for (let i = 0; i < x.length; i++) {
                    if (x[i].assignedByName != null && x[i].assignedToName != null) {
                        //console.log("x[1] == ", x[i]);
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"
                            //console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
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
                        //console.log("x[1] == ", x[i]);
                        if (x[i].acceptRejectStatus == 1) {
                            x[i].acceptRejectStatus = "Completed"
                            //console.log("x[i].acceptRejectStatus == ", x[i].acceptRejectStatus);
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

        <div className="new-form" style={{ overflow: 'none !important' }}>
            <div className="img_bx"></div>
            <div className="back-btn-div">
                <div className="btn-width-div">
                    <Link to={'.'}   className="back-btn "><ArrowBackIcon className="mr-1" />Back</Link>
                </div>
            </div>
            <div className="button-div">
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
                            {/* <h1 className="header-text">All Training</h1> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="data-table-div">
                <div className="data-table">
                    <div className="table-responsive">
                        <table className="table">

                            <thead>
                                <tr>

                                    {/* <th></th> */}
                                    {/*  <th>Upload Prequisites</th> */}
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
                                    {/* { userDetails.role == "Admin" &&                                                       
                           <th style={{ fontSize:'15px'}}>No. of Nominations</th>
                       } 
                       { userDetails.role == "Admin" &&                                                       
                           <th style={{ fontSize:'15px'}}>No. of Attended</th>
                       }
                       { userDetails.role == "Admin" &&                                                       
                           <th style={{ fontSize:'15px'}}>No. of Absentees</th>
                       } */}
                                    {userDetails.role == "Manager" &&
                                        <th className="traning-listing" >Nomination End Date</th>
                                    }
                                    {/* <th>Status</th>   */}
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
                                {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr> */}
                                {users && users.map((user, index) =>
                                    <tr key={index}>

                                        {/* <td style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                            { userDetails.role == "Admin" && <div >                        
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px', marginRight:'5px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                                <Link to={`${path}/assign/${user.id}`} className="btn btn-sm btn-info mr-1">Assign Training</Link>
                                </div>}

                            </td>  */}


                                        {/*  <td style={{ whiteSpace: 'nowrap', minWidth: '30%'}}>
                                { userDetails.role == "User" && <div >  
                                    <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Upload</Link>
                                </div>}                
                            </td> */}
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
                                        {/* { userDetails.role == "Admin" &&                             
                                <td style={{ fontSize:'15px',minWidth: '150px' }}>1</td>
                            }   
                            { userDetails.role == "Admin" &&                             
                                <td style={{ fontSize:'15px',minWidth: '150px' }}>0</td>
                            } 
                            { userDetails.role == "Admin" &&                             
                                <td style={{ fontSize:'15px',minWidth: '150px' }}>0</td>
                            }    */}
                                        {userDetails.role == "Manager" &&
                                            <td>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>
                                        }
                                        {/* <td style={{ minWidth: '200px' }}>Pending</td> */}

                                        {userDetails.role == "Admin" &&
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>
                                                {user.preRequisites != "N/A" ? <a style={{ color: '#12f339',fontWeight:"bolder", textDecoration: 'underline' }} target="_blank" /* href={config.apiUrl + "/" + user.preRequisites} */ onClick={viewPreRequisited(user)} >Check</a>
                                                    :
                                                    "N/A"}</td>
                                        }
                                        {userDetails.role == "Admin" &&
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>
                                                {/* {user.acceptRejectStatus != "Pending" ?  user.acceptRejectStatus
                                    : 
                                    "Pending" } */}
                                                Pending
                                            </td>
                                        }
                                        {/* { userDetails.role == "Admin" &&                              
                                <td style={{ fontSize:'15px',minWidth: '150px' }}>Decline</td>
                            }  */}
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
                                                <Link className="traning-listing" to={`/training/assign/${user.id}`} className="btn btn-sm btn-info mr-1 link-color">Nominate</Link>
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













        // <div className="container-fluid p-0 extra-padding">
        //     { userDetails.role == "Admin" &&
        //         <h1 className="mb-5 text-center">Trainings</h1> 
        //     }             
        //     { userDetails.role == "User" &&
        //         <h1 className="mb-5 text-center">My Training</h1>  
        //     }   
        //     { userDetails.role == "Manager" &&
        //         <h1 className="mb-5 text-center">Training</h1>  
        //     } 
        //      { userDetails.role == "Admin" && <div className="mt-5">          
        //     <Link to={`training/add`} className="btn btn-success btn-lg mb-2 mr-3 p-2">Upload Trainings</Link>
        //     <Link to={`training/editList`} className="btn btn-secondary btn-lg mb-2 mr-3">Edit Trainings</Link>
        //     <Link to={`training/getAllByRole`} className="btn btn-primary btn-lg mb-2 mr-3">My Trainings</Link>
        //     <Link to={`training/getAll`} className="btn btn-info btn-lg mb-2 mr-3">View All</Link>
        //     </div>}
        //     <div className="table-responsive mt-5">
        //     <table className="table table-striped" >
        //         <thead >
        //             <tr>

        //                 {/* <th></th> */}
        //                {/*  <th>Upload Prequisites</th> */}
        //                 <th>#</th>
        //                 { userDetails.role == "Admin" && 
        //                     <th style={{ fontSize:'15px'}}>Nominated Employee</th>
        //                 }
        //                 { userDetails.role == "User" && 
        //                     <th style={{ fontSize:'15px'}}>Nominated Employee</th>
        //                 }
        //                 { userDetails.role == "Admin" && 
        //                     <th style={{ fontSize:'15px'}}>Nominated By</th>
        //                 }
        //                 { userDetails.role == "User" && 
        //                     <th style={{ fontSize:'15px'}}>Nominated By</th>
        //                 }
        //                 <th style={{ fontSize:'15px'}}>Training Name</th>     
        //                 { userDetails.role == "Manager" &&  
        //                     <th style={{ fontSize:'15px'}}>Training Type</th>
        //                 }                      
        //                 <th style={{ fontSize:'15px'}}>Start Date</th>
        //                 <th style={{ fontSize:'15px'}}>End Date</th>
        //                 <th style={{ fontSize:'15px'}}>Required Prerequisites</th> 
        //                 {/* { userDetails.role == "Admin" &&                                                       
        //                     <th style={{ fontSize:'15px'}}>No. of Nominations</th>
        //                 } 
        //                 { userDetails.role == "Admin" &&                                                       
        //                     <th style={{ fontSize:'15px'}}>No. of Attended</th>
        //                 }
        //                 { userDetails.role == "Admin" &&                                                       
        //                     <th style={{ fontSize:'15px'}}>No. of Absentees</th>
        //                 } */}
        //                 { userDetails.role == "Manager" &&                               
        //                     <th style={{ fontSize:'15px'}}>Nomination End Date</th>                               
        //                 }                      
        //                 {/* <th>Status</th>   */}  
        //                 { userDetails.role == "Admin" &&                                                       
        //                     <th style={{ fontSize:'15px'}}>Submitted Prerequisites</th>
        //                 } 
        //                 { userDetails.role == "User"  &&  
        //                     <th style={{ fontSize:'15px'}}>Status</th>   
        //                 } 
        //                 { userDetails.role == "Admin"  &&  
        //                     <th style={{ fontSize:'15px'}}>Status</th>   
        //                 }
        //                 { userDetails.role == "Admin" && 
        //                     <th style={{ fontSize:'15px'}}>Approve / Decline Prerequisites</th>    
        //                 } 

        //                 { userDetails.role == "User"  &&  
        //                     <th style={{ fontSize:'15px'}}>Upload Prequisites</th> 
        //                 }        
        //                  {userDetails.role == "Manager" && 
        //                     <th></th>
        //                 }        
        //             </tr>
        //             </thead>
        //             <tbody>
        //               {/* <tr>
        //                 <th scope="row">1</th>
        //                 <td>Mark</td>
        //                 <td>Otto</td>
        //                 <td>@mdo</td>
        //               </tr>
        //               <tr>
        //                 <th scope="row">2</th>
        //                 <td>Jacob</td>
        //                 <td>Thornton</td>
        //                 <td>@fat</td>
        //               </tr>
        //               <tr>
        //                 <th scope="row">3</th>
        //                 <td>Larry</td>
        //                 <td>the Bird</td>
        //                 <td>@twitter</td>
        //               </tr> */}
        //                            {users && users.map((user,index) =>
        //                 <tr key={user.id}>

        //                     {/* <td style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
        //                     { userDetails.role == "Admin" && <div >                        
        //                         <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
        //                         <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px', marginRight:'5px' }} disabled={user.isDeleting}>
        //                             {user.isDeleting 
        //                                 ? <span className="spinner-border spinner-border-sm"></span>
        //                                 : <span>Delete</span>
        //                             }
        //                         </button>
        //                         <Link to={`${path}/assign/${user.id}`} className="btn btn-sm btn-info mr-1">Assign Training</Link>
        //                         </div>}

        //                     </td>  */}    



        //                    {/*  <td style={{ whiteSpace: 'nowrap', minWidth: '30%'}}>
        //                         { userDetails.role == "User" && <div >  
        //                             <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Upload</Link>
        //                         </div>}                
        //                     </td> */}
        //                     <td style={{ fontSize:'15px',minWidth: '40px' }}>{index+1}</td>

        //                     { userDetails.role == "Admin" &&                                 
        //                             <td style={{ fontSize:'15px',minWidth: '100px' }}>{user.assignedToName} </td> 
        //                     }
        //                     { userDetails.role == "User" &&                                 
        //                             <td style={{ fontSize:'15px',minWidth: '100px' }}>{user.assignedToName} </td> 
        //                     }
        //                     { userDetails.role == "Admin" && 
        //                         <td style={{ fontSize:'15px',minWidth: '100px' }}>{user.assignedByName ? user.assignedByName : "NA"}</td>
        //                     } 
        //                     { userDetails.role == "User" &&                                 
        //                             <td style={{ fontSize:'15px',minWidth: '100px' }}>{user.assignedByName} </td> 
        //                     }
        //                     <td style={{ fontSize:'15px',minWidth: '150px' }}>{user.trainingName}</td>  
        //                     { userDetails.role == "Manager" &&                              
        //                         <td>{user.trainingType}</td>                               
        //                     }                            
        //                     <td style={{ fontSize:'15px',minWidth: '130px' }}>{moment(user.trainingStartDate).format("MM/DD/YYYY")}</td>
        //                     <td style={{ fontSize:'15px',minWidth: '130px' }}>{moment(user.trainingEndDate).format("MM/DD/YYYY")}</td>                            
        //                     <td style={{ fontSize:'15px',minWidth: '130px' }}>{user.trainingPrequisites}</td>
        //                     {/* { userDetails.role == "Admin" &&                             
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>1</td>
        //                     }   
        //                     { userDetails.role == "Admin" &&                             
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>0</td>
        //                     } 
        //                     { userDetails.role == "Admin" &&                             
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>0</td>
        //                     }    */}                                                    
        //                     { userDetails.role == "Manager" &&
        //                         <td>{moment(user.nominationEndDate).format("MM/DD/YYYY")}</td>                               
        //                     }    
        //                     {/* <td style={{ minWidth: '200px' }}>Pending</td> */}

        //                     { userDetails.role == "Admin" &&
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>
        //                             {user.preRequisites != "N/A" ? <a style={{ color:'#12f339',textDecoration: 'underline' }} target="_blank" href={config.apiUrl+"/"+user.preRequisites}  onClick={viewPreRequisited(user)} >Check</a> 
        //                             : 
        //                             "N/A" }</td>                                     
        //                     }
        //                     { userDetails.role == "Admin" &&  
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>
        //                             {user.acceptRejectStatus != "Pending" ?  user.acceptRejectStatus
        //                             : 
        //                             "Pending" }</td>                                     
        //                     }
        //                     {/* { userDetails.role == "Admin" &&                              
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>Decline</td>
        //                     }  */}
        //                     { userDetails.role == "Admin" &&                                  
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>
        //                             {user.preRequisites != "N/A" ?
        //                                 <div>
        //                                     {user.acceptRejectStatus == "Completed" ?                                                
        //                                         <a style={{ color:'#12f339',textDecoration: 'underline' }} onClick={handleClickReject(user)}>Decline</a> :
        //                                         <div>
        //                                             {user.acceptRejectStatus == "pending" ?  
        //                                                 <div>
        //                                                     <a style={{ color:'#12f339',textDecoration: 'underline' }} onClick={handleClickAccept(user)}> Approve</a> /<a style={{ color:'#12f339',textDecoration: 'underline' }} onClick={handleClickReject(user)}> Decline</a> 
        //                                                 </div> :

        //                                                 <a style={{ color:'#12f339',textDecoration: 'underline' }} onClick={handleClickAccept(user)}> Approve</a> }

        //                                         </div>

        //                                     }
        //                                 </div>:                                        
        //                                 "-"
        //                             }                    
        //                         </td>
        //                     } 
        //                     { userDetails.role == "User" &&                              
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>
        //                             {user.acceptRejectStatus == 0 ?
        //                                 "Pending" : "Completed"
        //                             }
        //                         </td>
        //                     }
        //                     { userDetails.role == "User" &&                                      
        //                             <td>
        //                                 {user.acceptRejectStatus != "1" ?
        //                                     <PopUpFileUpload id={user.id} userDetails={userDetails}/>:
        //                                     "-"
        //                                 }
        //                             </td>
        //                     }     


        //                     {userDetails.role == "Manager" && 
        //                         <td style={{ fontSize:'15px',minWidth: '150px' }}>
        //                             <Link to={`/training/assign/${user.id}`} style={{fontSize:'15px'}} className="btn btn-sm btn-info mr-1 link-color">Nominate</Link>
        //                         </td>                                
        //                     } 
        //                 </tr>
        //             )}
        //             {!users &&
        //                 <tr>
        //                     <td colSpan="4" className="text-center">
        //                         <span className="spinner-border spinner-border-lg align-center"></span>
        //                     </td>
        //                 </tr>
        //             }
        //             </tbody>

        //           </table>
        //         </div>
        //     </div>


        // <div className="container-fluid mt-5 p-0">
        //     <h1 className="mb-5 text-center">Training</h1>  
        //      { userDetails.role == "Admin" && <div className="mt-5">          
        //     <Link to={`training/add`} className="btn btn-success btn-lg mb-2 mr-3 p-2">Upload Trainings</Link>
        //     <Link to={`training/editList`} className="btn btn-secondary btn-lg mb-2 mr-3">Edit Trainings</Link>
        //     <Link to={`training/getAllByRole`} className="btn btn-primary btn-lg mb-2 mr-3">My Trainings</Link>
        //     <Link to={`training/getAll`} className="btn btn-info btn-lg mb-2 mr-3">View All</Link>
        //     </div>}
        //     <div className="table-responsive mt-5">
        //     <table className="table table-striped" >
        //         <thead >
        // <tr>

        //     {/* <th></th> */}
        //    {/*  <th>Upload Prequisites</th> */}
        //     <th>#</th>
        //     { userDetails.role == "Admin" && 
        //         <th style={{ fontSize:'15px'}}>Nominated Employee</th>
        //     }
        //     { userDetails.role == "Admin" && 
        //         <th style={{ fontSize:'15px'}}>Nominated By</th>
        //     }
        //     <th style={{ fontSize:'15px'}}>Training Name</th>     
        //     { userDetails.role == "Manager" &&  
        //         <th style={{ fontSize:'15px'}}>Training Type</th>
        //     }                      
        //     <th style={{ fontSize:'15px'}}>Training Start Date</th>
        //     <th style={{ fontSize:'15px'}}>Training End Date</th>
        //     <th style={{ fontSize:'15px'}}>Training Prequisites</th> 
        //     {/* { userDetails.role == "Admin" &&                                                       
        //         <th style={{ fontSize:'15px'}}>No. of Nominations</th>
        //     } 
        //     { userDetails.role == "Admin" &&                                                       
        //         <th style={{ fontSize:'15px'}}>No. of Attended</th>
        //     }
        //     { userDetails.role == "Admin" &&                                                       
        //         <th style={{ fontSize:'15px'}}>No. of Absentees</th>
        //     } */}
        //     { userDetails.role == "Manager" &&                               
        //         <th style={{ fontSize:'15px'}}>Nomination End Date</th>                               
        //     }                      
        //     {/* <th>Status</th>   */}  
        //     { userDetails.role == "Admin" &&                                                       
        //         <th style={{ fontSize:'15px'}}>View Prequisites</th>
        //     } 
        //     { userDetails.role == "Admin" && 
        //         <th style={{ fontSize:'15px'}}>Active / Decline Prequisites</th>    
        //     } 
        //     { userDetails.role == "User" &&  
        //         <th style={{ fontSize:'15px'}}>Status</th>   
        //     } 
        //     { userDetails.role == "User" &&  
        //         <th style={{ fontSize:'15px'}}>Upload Prequisites</th> 
        //     }        
        //      {userDetails.role == "Manager" && 
        //         <th></th>
        //     }        
        // </tr>
        //         </thead>
        //         <tbody>
        // {users && users.map((user,index) =>
        //     <tr key={user.id}>
        //         {/* <td style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
        //         { userDetails.role == "Admin" && <div >                        
        //             <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
        //             <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px', marginRight:'5px' }} disabled={user.isDeleting}>
        //                 {user.isDeleting 
        //                     ? <span className="spinner-border spinner-border-sm"></span>
        //                     : <span>Delete</span>
        //                 }
        //             </button>
        //             <Link to={`${path}/assign/${user.id}`} className="btn btn-sm btn-info mr-1">Assign Training</Link>
        //             </div>}

        //         </td>  */}    


        //        {/*  <td style={{ whiteSpace: 'nowrap', minWidth: '30%'}}>
        //             { userDetails.role == "User" && <div >  
        //                 <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Upload</Link>
        //             </div>}                
        //         </td> */}
        //         <td style={{ fontSize:'15px',minWidth: '40px' }}>{index+1}</td>

        //         { userDetails.role == "Admin" && 
        //                 <td style={{ fontSize:'15px',minWidth: '100px' }}>{user.assignedToName ? user.assignedToName : "NA"}</td>                                
        //         }
        //         { userDetails.role == "Admin" && 
        //             <td style={{ fontSize:'15px',minWidth: '100px' }}>{user.assignedByName ? user.assignedByName : "NA"}</td>
        //         } 
        //         <td style={{ fontSize:'15px',minWidth: '150px' }}>{user.trainingName}</td>  
        //         { userDetails.role == "Manager" &&                              
        //             <td>{user.trainingType}</td>                               
        //         }                            
        //         <td style={{ fontSize:'15px',minWidth: '130px' }}>{moment(user.trainingStartDate).format("MM/DD/YYYY")}</td>
        //         <td style={{ fontSize:'15px',minWidth: '130px' }}>{moment(user.trainingEndDate).format("MM/DD/YYYY")}</td>                            
        //         <td style={{ fontSize:'15px',minWidth: '130px' }}>{user.trainingPrequisites}</td>
        //         {/* { userDetails.role == "Admin" &&                             
        //             <td style={{ fontSize:'15px',minWidth: '150px' }}>1</td>
        //         }   
        //         { userDetails.role == "Admin" &&                             
        //             <td style={{ fontSize:'15px',minWidth: '150px' }}>0</td>
        //         } 
        //         { userDetails.role == "Admin" &&                             
        //             <td style={{ fontSize:'15px',minWidth: '150px' }}>0</td>
        //         }    */}                                                    
        //         { userDetails.role == "Manager" &&
        //             <td>{moment(user.nominationEndDate).format("MM/DD/YYYY")}</td>                               
        //         }    
        //         {/* <td style={{ minWidth: '200px' }}>Pending</td> */}
        //         { userDetails.role == "Admin" &&                             
        //             <td style={{ fontSize:'15px',minWidth: '150px' }}><a style={{ color:'#12f339',textDecoration: 'underline' }} >View Prequisites</a></td>
        //         }
        //         { userDetails.role == "Admin" &&  
        //             <td style={{ fontSize:'15px',minWidth: '150px' }}><a style={{ color:'#12f339',textDecoration: 'underline' }}  onClick={handleClickAccept(user)}>Accept</a> /<a style={{ color:'#12f339',textDecoration: 'underline' }} onClick={handleClickReject(user)}> Decline</a></td>
        //         } 
        //         { userDetails.role == "User" &&                              
        //             <td style={{ fontSize:'15px',minWidth: '150px' }}>Complete</td>
        //         }
        //         { userDetails.role == "User" &&                             

        //          <td><PopUpFileUpload id={user.id} userDetails={userDetails}/></td>
        //         }     

        //         {userDetails.role == "Manager" && 
        //             <td style={{ fontSize:'15px',minWidth: '150px' }}>
        //                 <Link to={`/training/assign/${user.id}`} style={{fontSize:'15px'}} className="btn btn-sm btn-info mr-1">Nominate</Link>
        //             </td>                                
        //         } 
        //     </tr>
        // )}
        // {!users &&
        //     <tr>
        //         <td colSpan="4" className="text-center">
        //             <span className="spinner-border spinner-border-lg align-center"></span>
        //         </td>
        //     </tr>
        // }
        //         </tbody>
        //     </table>
        //     </div>
        // </div>
    );
}

export { AllNominations };
