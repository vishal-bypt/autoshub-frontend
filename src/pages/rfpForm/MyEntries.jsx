import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../helpers';
import moment from "moment";
import { accountService, rfcService, alertService } from '../../services';

function MyEntries({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    const userDetails = accountService.userValue;

    useEffect(() => {
        rfcService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        rfcService.delete(id).then((data) => {
            setUsers(users => users.filter(x => x.id !== id));
            alertService.success(data.message, { keepAfterRouteChange: true });
            // history.push('/rfp');
        });


    }

    const handleExportData = () => {
        try {
            rfcService.exportData('all').then((response) => {
                //setUsers(x);
                const link = document.createElement('a');
                link.href = response.exportPath;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        } catch (error) {
            console.log("error", error);
        }

    }

    return (

        // <div className="container-fluid mt-5 p-5">
        //     <h1>My Entries</h1>
        //     {/* <p>All RFP Records from secure (admin only) api end point:</p> */}
        //     <Link to={`/rfp/add`} className="btn btn-sm btn-success mb-2">Add</Link>
        //     &nbsp;
        //     {userDetails.role != "User" && <Link to="/rfp/all-entries" className="btn btn-sm btn-primary mb-2">All Entries</Link> }
        //     &nbsp;
        //     {/* <Link to="/rfp/edited-entries" className="btn btn-sm btn-primary mb-2">Edited Entries</Link>
        //     &nbsp; */}
        //     <button onClick={handleExportData} className="btn btn-sm btn-danger mb-2 text-right">Export</button>
        //     <div className="table-responsive">
        //     <table className="table table-striped extra-new-table" style={{color: '#000 !important'}}>
        //         <thead>
        //             <tr style={{color: '#000 !important'}}>
        //                 <th>Sales CRM Oppourtunity ID</th>
        //                 <th >Month</th>
        //                 <th>Response Type</th>
        //                 <th>Client Name</th>
        //                 <th>Status</th>
        //                 <th>Stage</th>
        //                 <th>Created By</th>
        //                 <th >Actions</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        // {users && users.map(user =>
        //     <tr key={user.id} style={{color: '#000 !important'}}>
        //         <td>{user.salesCrmOpportunityId}</td>
        //         <td>{user.monthCalendar}</td>
        //         <td>{user.responseType}</td>
        //         <td>{user.clientName}</td>
        //         <td>{user.status}</td>
        //         <td>{user.stage}</td>
        //         <td style={{minWidth: '180px'}}>{user.programLead}</td>
        //         <td style={{ whiteSpace: 'nowrap' }}>
        //             <Link to={`/rfp/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
        //             { (userDetails.role == "Manager" || userDetails.role == "Admin") && <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
        //                 {user.isDeleting 
        //                     ? <span className="spinner-border spinner-border-sm"></span>
        //                     : <span>Delete</span>
        //                 }
        //             </button> }
        //         </td>
        //     </tr>
        // )}
        // {!users &&
        //     <tr>
        //         <td colSpan="8" className="text-center">
        //             <span className="spinner-border spinner-border-lg align-center"></span>
        //         </td>
        //     </tr>
        // }
        //         </tbody>
        //     </table>
        //     </div>        
        // </div>

        <div className="page-content">            
            <div className="container-fluid">
                <div className="row">                    
                    <div className="col-md-6">
                        <h1 className="header-text">Request For Proposal</h1>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/rfp/add" className="btn btn-primary">Add</Link>
                        <Link to={`/rfp/landing-entries`} className="btn btn-primary ml-1">Landing Page</Link>
                        <Link to="/rfp/all-entries" className="btn btn-primary ml-1">All Entries</Link>
                        <Link to="#" onClick={handleExportData} className="btn btn-primary ml-1">Export</Link>
                    </div>                    
                </div>
                <div className="row">&nbsp;</div>
            </div>
            <div className="data-table-div">
                <div className="data-table">
                    <div className="table-responsive">
                        <table className="table">

                            <thead>
                                <tr style={{ color: '#000 !important' }}>
                                    <th className="traning-listing">Client Name</th>
                                    <th className="traning-listing">Response Type</th>
                                    <th className="traning-listing" style={{ minWidth: "200px !important" }}>Month</th>
                                    <th className="traning-listing">Program Lead</th>
                                    <th className="traning-listing">Status</th>
                                    <th className="traning-listing">Stage</th>
                                    {(userDetails.role == "Manager" ||
                                        userDetails.role == "Admin") && <th className="traning-listing" >Ageing Days</th>}
                                    < th className="traning-listing" >Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(user => {
                                    var ageingDate = moment(user?.rfpRespondedDate, "YYYY-MM-DD").add(60, 'days');
                                    const finalDays = moment().diff(ageingDate, 'days')
                                    let dynemicAgeing = finalDays > 0 ? finalDays : ""
                                    return (
                                        <tr key={user.id} style={{ color: '#000 !important' }}>

                                            <td className="traning-listing" style={{ minWidth: "150px" }}>{user.clientName}</td>
                                            <td className="traning-listing" style={{ minWidth: "150px" }}>{user.responseType}</td>
                                            <td className="traning-listing" style={{ minWidth: "150px" }}>
                                                {moment(user.monthCalendar, "YYYY-MM-DD").format("MM/YYYY")}
                                            </td>
                                            <td className="traning-listing" style={{ minWidth: "180px" }}>{user.programLead}</td>
                                            <td className="traning-listing" >{user.status}</td>
                                            <td className="traning-listing" style={{ minWidth: "150px" }}>{user.stage}</td>
                                            {(userDetails.role == "Manager" ||
                                                userDetails.role == "Admin") && <td className="traning-listing" style={{ textAlign: 'center', minWidth: "150px" }}>{dynemicAgeing}</td>}
                                            <td className="traning-listing" style={{ whiteSpace: 'nowrap' }}>
                                                <Link to={`/rfp/edit/${user.id}`} className="btn btn-warning">Edit</Link>
                                                {/* {(userDetails.role == "Manager" || userDetails.role == "Admin") && <button onClick={() => deleteUser(user.id)} className="btn btn-sm del-button" disabled={user.isDeleting}>
                                                {user.isDeleting
                                                    ? <span className="spinner-border spinner-border-sm"></span>
                                                    : <span>Delete</span>
                                                }
                                            </button>} */}
                                            </td>


                                            {/* <td>{user.salesCrmOpportunityId}</td>
                                        <td>{moment(user.monthCalendar, 'YYYY-MM-DD').format('MM/YYYY')}</td>
                                        <td>{user.responseType}</td>
                                        <td>{user.clientName}</td>
                                        <td>{user.status}</td>
                                        <td>{user.stage}</td>
                                        <td style={{ minWidth: '180px' }}>{user.programLead}</td> */}

                                        </tr>
                                    )
                                })}
                                {!users &&
                                    <tr>
                                        <td colSpan="8" className="text-center">
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

export { MyEntries };
