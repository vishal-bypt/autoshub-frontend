import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { accountService, alertService, rfcService } from '../../services';


function EditedEntries({ match }) {
    const [users, setUsers] = useState(null);
    const userDetails = accountService.userValue;
    const filterType = 'edit';
    useEffect(() => {
        rfcService.getAll(filterType).then(x => setUsers(x));
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
            rfcService.exportData('edit').then((response) => {
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
        // <div className="container-fluid mt-5 p-5" >
        //     <h1>Edited Entries</h1>
        //     {/* <p>All RFP Records from secure (admin only) api end point:</p> */}
        //     <Link to={`/rfp/add`} className="btn btn-sm btn-success mb-2">Add</Link>
        //     &nbsp;
        //     {userDetails.role != "User" && <Link to="/rfp/all-entries" className="btn btn-sm btn-primary mb-2">All Entries</Link> }
        //     &nbsp;
        //     <Link to={`/rfp/my-entries`} className="btn btn-sm btn-primary mb-2">My Entries</Link>
        //     &nbsp;
        //     <button onClick={handleExportData} className="btn btn-sm btn-danger mb-2 text-right">Export</button>
        //     <div className="table-responsive">
        //     <table className="table table-striped">
        //         <thead>
                    // <tr>
                    //     <th>Sales CRM Oppourtunity ID</th>
                    //     <th>Month</th>
                    //     <th>Response Type</th>
                    //     <th>Client Name</th>
                    //     <th>Status</th>
                    //     <th>Stage</th>
                    //     {/* <th>Deal Type</th>
                    //     <th>Deal Term</th>
                    //     <th>ReceivedDate</th>
                    //     <th>RespondedDate</th>
                    //     <th>Geo</th>
                    //     <th>Location</th>
                    //     <th>GeoLeads</th>
                    //     <th>Delivery Heads</th>
                    //     <th>Bts Mo Lead</th>
                    //     <th>Sales Lead</th>
                    //     <th>Program Lead</th>
                    //     <th>Technical Lead</th>
                    //     <th>Delivery Led By</th>
                    //     <th>Automation Type</th>
                    //     <th>Rpa Platform</th>
                    //     <th>Development Resource</th>
                    //     <th>Support Resource</th>
                    //     <th>Total Resource</th>
                    //     <th>Currency</th>
                    //     <th>Margin</th>
                    //     <th>Total Pricing</th>
                    //     <th>Total Cash Value</th>
                    //     <th>Ebitda</th>
                    //     <th>Consideration</th>
                    //     <th>Benefits</th>
                    //     <th>ServerUsage</th>
                    //     <th>Platform</th>
                    //     <th>Project Start Date</th>
                    //     <th>Project End Date</th>
                    //     <th>Development Duration</th>
                    //     <th>Actual Cash Value</th> */}
                    //     <th>Created By</th>
                    //     <th>Actions</th>
                        
                    // </tr>
        //         </thead>
        //         <tbody>
                    // {users && users.map(user =>
                    //     <tr key={user.salesCrmOpportunityId}>
                    //     <td style={{ minWidth: '150px' }}>{user.id}</td>
                    //     <td style={{ minWidth: '150px' }}>{user.monthCalendar}</td>
                    //     <td style={{minWidth: '150px'}}>{user.responseType}</td>
                    //     <td style={{minWidth: '150px'}}>{user.clientName}</td>
                    //     <td>{user.status}</td>
                    //     <td style={{minWidth: '150px'}}>{user.stage}</td>
                    //     {/* <td style={{minWidth: '150px'}}>{user.dealType}</td>
                    //     <td style={{minWidth: '150px'}}>{user.dealTerm}</td>
                    //     <td style={{minWidth: '150px'}}>{user.rfpReceivedDate}</td>
                    //     <td style={{minWidth: '170px'}}>{user.rfpRespondedDate}</td>
                    //     <td>{user.geo}</td>
                    //     <td>{user.location}</td>
                    //     <td>{user.geoLeads}</td>
                    //     <td style={{minWidth: '150px'}}>{user.deliveryHeads}</td>
                    //     <td style={{minWidth: '150px'}}>{user.btsMoLead}</td>
                    //     <td style={{minWidth: '150px'}}>{user.salesLead}</td>
                    //     <td style={{minWidth: '150px'}}>{user.programLead}</td>
                    //     <td style={{minWidth: '150px'}}>{user.technicalLead}</td>
                    //     <td style={{minWidth: '150px'}}>{user.deliveryLedBy}</td>
                    //     <td style={{minWidth: '170px'}}>{user.automationType}</td>
                    //     <td style={{minWidth: '150px'}}>{user.rpaPlatform}</td>
                    //     <td style={{minWidth: '220px'}}>{user.developmentResource}</td>
                    //     <td style={{minWidth: '170px'}}>{user.supportResource}</td>
                    //     <td style={{minWidth: '150px'}}>{user.totalResource}</td>
                    //     <td>{user.currency}</td>
                    //     <td>{user.margin}</td>
                    //     <td style={{minWidth: '150px'}}>{user.totalPricing}</td>
                    //     <td style={{minWidth: '170px'}}>{user.totalCashValue}</td>
                    //     <td>{user.ebitda}</td>
                    //     <td>{user.consideration}</td>
                    //     <td>{user.benefits}</td>
                    //     <td style={{minWidth: '150px'}}>{user.serverUsage}</td>
                    //     <td>{user.platform}</td>
                    //     <td style={{minWidth: '180px'}}>{user.projectStartDate}</td>
                    //     <td style={{minWidth: '180px'}}>{user.projectEndDate}</td>
                    //     <td style={{minWidth: '220px'}}>{user.developmentDuration}</td>
                    //     <td style={{minWidth: '180px'}}>{user.actualCashValue}</td> */}
                    //     <td style={{minWidth: '180px'}}>{user.programLead}</td>
                    //     <td style={{ whiteSpace: 'nowrap' }}>
                    //         <Link to={`/rfp/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                    //         { (userDetails.role == "Manager" || userDetails.role == "Admin") && <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                    //             {user.isDeleting 
                    //                 ? <span className="spinner-border spinner-border-sm"></span>
                    //                 : <span>Delete</span>
                    //             }
                    //         </button>}
                    //     </td>
                        
                    // </tr>
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
        <div className="new-form" style={{overflow:'none !important'}}>
        <div className="img_bx"></div>
        <div className="button-div">
            <div className="row">
               
                <div className="container">
                    <div className="col-md-12">
                    <h1 className="header-text">Edited Entries</h1>
                    <Link to={`/rfp/add`} className="newbutton mb-2">Add</Link>
                    {userDetails.role !== "User" && <Link to={`/rfp/add`} className="newbutton mb-2">All Entries</Link>}
                    <Link to={`/rfp/my-entries`} className="newbutton mb-2">My Entries</Link>
                    <Link to="#" onClick={handleExportData} className="newbutton mb-2">Export</Link>
                    
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
                        <th>Sales CRM <br/>Opportunity ID</th>
                        <th>Month</th>
                        <th>Response Type</th>
                        <th>Client Name</th>
                        <th>Status</th>
                        <th>Stage</th>
                        {/* <th>Deal Type</th>
                        <th>Deal Term</th>
                        <th>ReceivedDate</th>
                        <th>RespondedDate</th>
                        <th>Geo</th>
                        <th>Location</th>
                        <th>GeoLeads</th>
                        <th>Delivery Heads</th>
                        <th>Bts Mo Lead</th>
                        <th>Sales Lead</th>
                        <th>Program Lead</th>
                        <th>Technical Lead</th>
                        <th>Delivery Led By</th>
                        <th>Automation Type</th>
                        <th>Rpa Platform</th>
                        <th>Development Resource</th>
                        <th>Support Resource</th>
                        <th>Total Resource</th>
                        <th>Currency</th>
                        <th>Margin</th>
                        <th>Total Pricing</th>
                        <th>Total Cash Value</th>
                        <th>Ebitda</th>
                        <th>Consideration</th>
                        <th>Benefits</th>
                        <th>ServerUsage</th>
                        <th>Platform</th>
                        <th>Project Start Date</th>
                        <th>Project End Date</th>
                        <th>Development Duration</th>
                        <th>Actual Cash Value</th> */}
                        <th>Created By</th>
                        <th>Actions</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.map(user =>
                        <tr key={user.salesCrmOpportunityId}>
                        <td style={{ minWidth: '150px' }}>{user.salesCrmOpportunityId}</td>
                        <td style={{ minWidth: '150px' }}>{moment(user.monthCalendar,'YYYY-MM-DD').format('MM/YYYY')}</td>
                        <td style={{minWidth: '150px'}}>{user.responseType}</td>
                        <td style={{minWidth: '150px'}}>{user.clientName}</td>
                        <td>{user.status}</td>
                        <td style={{minWidth: '150px'}}>{user.stage}</td>
                        {/* <td style={{minWidth: '150px'}}>{user.dealType}</td>
                        <td style={{minWidth: '150px'}}>{user.dealTerm}</td>
                        <td style={{minWidth: '150px'}}>{user.rfpReceivedDate}</td>
                        <td style={{minWidth: '170px'}}>{user.rfpRespondedDate}</td>
                        <td>{user.geo}</td>
                        <td>{user.location}</td>
                        <td>{user.geoLeads}</td>
                        <td style={{minWidth: '150px'}}>{user.deliveryHeads}</td>
                        <td style={{minWidth: '150px'}}>{user.btsMoLead}</td>
                        <td style={{minWidth: '150px'}}>{user.salesLead}</td>
                        <td style={{minWidth: '150px'}}>{user.programLead}</td>
                        <td style={{minWidth: '150px'}}>{user.technicalLead}</td>
                        <td style={{minWidth: '150px'}}>{user.deliveryLedBy}</td>
                        <td style={{minWidth: '170px'}}>{user.automationType}</td>
                        <td style={{minWidth: '150px'}}>{user.rpaPlatform}</td>
                        <td style={{minWidth: '220px'}}>{user.developmentResource}</td>
                        <td style={{minWidth: '170px'}}>{user.supportResource}</td>
                        <td style={{minWidth: '150px'}}>{user.totalResource}</td>
                        <td>{user.currency}</td>
                        <td>{user.margin}</td>
                        <td style={{minWidth: '150px'}}>{user.totalPricing}</td>
                        <td style={{minWidth: '170px'}}>{user.totalCashValue}</td>
                        <td>{user.ebitda}</td>
                        <td>{user.consideration}</td>
                        <td>{user.benefits}</td>
                        <td style={{minWidth: '150px'}}>{user.serverUsage}</td>
                        <td>{user.platform}</td>
                        <td style={{minWidth: '180px'}}>{user.projectStartDate}</td>
                        <td style={{minWidth: '180px'}}>{user.projectEndDate}</td>
                        <td style={{minWidth: '220px'}}>{user.developmentDuration}</td>
                        <td style={{minWidth: '180px'}}>{user.actualCashValue}</td> */}
                        <td style={{minWidth: '180px'}}>{user.programLead}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`/rfp/edit/${user.id}`} className="btn btn-sm edit-button mr-1">Edit</Link>
                            { (userDetails.role === "Manager" || userDetails.role === "Admin") && <button onClick={() => deleteUser(user.id)} className="btn btn-sm del-button "  disabled={user.isDeleting}>
                                {user.isDeleting 
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>}
                        </td>
                        
                    </tr>
                    )}
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

export { EditedEntries };
