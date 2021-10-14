import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { accountService, trainingService } from '../../services';

function GetTrainingByRole({ match }) {
    const { path } = match;
    const userDetails = accountService.userValue;    
    const [users, setUsers] = useState(null);

    useEffect(() => {        
        if (userDetails.role == "Admin" || userDetails.role == "Manager" ) {           
            trainingService.getTrainingByRole().then((x) => {
                //console.log("x == ", x);
                setUsers(x)
            });

        }
        if (userDetails.role == "User") {
            let userData = [];
            trainingService.listTaskToUser().then((x) => {
                x.map((data) => {
                    x = data.training
                    userData.push(x);
                })
                setUsers(userData)
            });
        }
    }, []);

    /* if(userDetails.role === "user"){
        console.log("role is a user");
        useEffect(() => {
            trainingService.listTaskToUser().then(x => setUsers(x));
        }, []);
    } */
    function deleteUser(id) {        
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        trainingService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));            
        });
    }
    //console.log("users -== ", users);

    return (
        // <div className="container-fluid mt-5">
        //     <div className="row" style={{justifyContent:'space-between'}}>
        //         <div className="col-11">
        //             <h1 className="text-center mb-5">My Training</h1>  
        //         </div>
        //         <div className="col-1">
        //             <Link to={'.'} className="btn btn-info btn-lg mb-2 mr-3 p-2">Back</Link>    
        //         </div>                
        //     </div>  
        //     {/*  { userDetails.role == "Admin" && <div >          
        //     <Link to={`${path}/add`} className="btn btn-success btn-lg mb-2 mr-3 p-2">Upload Trainings</Link>
        //     <Link to={`${path}/editList`} className="btn btn-secondary btn-lg mb-2 mr-3">Edit Trainings</Link>
        //     <Link to={`${path}/getAll`} className="btn btn-primary btn-lg mb-2 mr-3">My Trainings</Link>
        //     <Link to={`${path}/add`} className="btn btn-info btn-lg mb-2 mr-3">View All</Link>
        //     </div>} */}
        //     <div className="table-responsive">
        //     <table className="table table-striped" >
        //         <thead >
        // <tr>
        //     {/* <th></th> */}
        //    {/*  <th>Upload Prequisites</th> */}
        //     <th>#</th>
        //     <th>Nominated Employee</th>
        //     <th>Nominated By</th>
        //     <th>Training Name</th>                        
        //     <th>Training Start Date</th>
        //     <th>Training End Date</th>
        //     <th>Training Prequisites</th>                       

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
        //         <td style={{ minWidth: '40px' }}>{index+1}</td>
        //         <td style={{ minWidth: '200px' }}>{user.assignedToName}</td>
        //         <td style={{ minWidth: '200px' }}>{user.assignedByName}</td>
        //         <td style={{ minWidth: '200px' }}>{user.trainingName}</td>                            
        //         <td style={{ minWidth: '200px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
        //         <td style={{ minWidth: '200px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>                            
        //         <td style={{ minWidth: '200px' }}>{user.trainingPrequisites}</td>                                                         




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
        <div className="new-form" style={{ overflow: 'none !important' }}>
            <div className="img_bx"></div>
            <div className="back-btn-div">
                <div className="btn-width-div">
                    <Link to={'.'} className="back-btn "><ArrowBackIcon className="mr-1" />Back</Link>
                </div>
            </div>
            <div className="button-div">

                <div className="row">

                    <div className="container">
                        <div className="col-md-12">
                            <h1 className="header-text">My Trainings</h1>

                            {/* <a onClick={()=>{history.push('/training/add');}}  href="javascript:void" className="newbutton ">Back</a> */}


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
                                    <th className="traning-listing" >#</th>
                                    <th className="traning-listing" >Nominated Employee</th>
                                    <th className="traning-listing" >Nominated By</th>
                                    <th className="traning-listing" >Training Name</th>
                                    <th className="traning-listing" >Start Date</th>
                                    <th className="traning-listing" >End Date</th>
                                    <th className="traning-listing" >Required Prerequisites</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user, index) =>
                                    <tr key={user.id}>
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
                                        <td className="traning-listing" style={{ minWidth: '200px' }}>{user.assignedToName}</td>
                                        <td className="traning-listing" style={{ minWidth: '200px' }}>{user.assignedByName}</td>
                                        <td className="traning-listing" style={{ minWidth: '200px' }}>{user.trainingName}</td>
                                        <td className="traning-listing" style={{ minWidth: '200px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                                        <td className="traning-listing" style={{ minWidth: '200px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>
                                        <td className="traning-listing" style={{ minWidth: '200px' }}>{user.trainingPrequisites}</td>




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

export { GetTrainingByRole };