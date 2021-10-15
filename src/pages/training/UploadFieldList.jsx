import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { accountService, trainingService } from '../../services';

function UploadFieldList({ match }) {
    const { path } = match;
    const userDetails = accountService.userValue;    
    const [users, setUsers] = useState(null);

    useEffect(() => {        
        if (userDetails.role == "Admin") {            ;
            trainingService.getAll().then((x) => {
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

    /* if (userDetails.role === "user") {        
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
        <div className="container mt-5">
            <h1>Trainings</h1>
            {/* { userDetails.role == "Admin" && <div >          
            <Link to={`${path}/add`} className="btn btn-success btn-lg mb-2 mr-3 p-2">Upload Trainings</Link>
            <Link to={`${path}/add`} className="btn btn-secondary btn-lg mb-2 mr-3">Edit Trainings</Link>
            <Link to={`${path}/add`} className="btn btn-primary btn-lg mb-2 mr-3">My Trainings</Link>
            <Link to={`${path}/add`} className="btn btn-primary btn-lg mb-2 mr-3">View All</Link>
            </div>} */}
            <div className="table-responsive">
                <table className="table table-striped" >
                    <thead >
                        <tr>
                            <th></th>
                            <th className="traning-listing" >#</th>
                            <th className="traning-listing" >Training Name</th>
                            <th className="traning-listing" >Training Type</th>
                            <th className="traning-listing" >Start Date</th>
                            <th className="traning-listing" >End Date</th>
                            <th className="traning-listing" >Required Prerequisites</th>
                            <th className="traning-listing" >Nomination End Date</th>
                            {/* <th>Status</th>  */}

                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user, index) =>
                            <tr key={user.id}>
                                <td className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                    {userDetails.role == "Admin" && <div >
                                        {/* <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px', marginRight:'5px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button> */}
                                        <Link to={`/training/assign/${user.id}`} className="btn btn-sm btn-primary mr-1">Assign Training</Link>
                                    </div>}

                                </td>


                                {/* <td style={{ whiteSpace: 'nowrap', minWidth: '30%'}}>
                                { userDetails.role == "User" && <div >  
                                    <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Upload</Link>
                                </div>}                
                            </td> */}
                                <td className="traning-listing" style={{ minWidth: '40px' }}>{index + 1}</td>
                                <td className="traning-listing" style={{ minWidth: '200px' }}>{user.trainingName}</td>
                                <td className="traning-listing" style={{ minWidth: '200px' }}>{user.trainingType}</td>
                                <td className="traning-listing" style={{ minWidth: '200px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                                <td className="traning-listing" style={{ minWidth: '200px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>
                                <td className="traning-listing" style={{ minWidth: '200px' }}>{user.trainingPrequisites}</td>
                                <td className="traning-listing" style={{ minWidth: '200px' }}>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>
                                {/*  <td style={{ minWidth: '200px' }}>Pending</td> */}

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
    )
}


export { UploadFieldList };