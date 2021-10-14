import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../helpers';
import moment from "moment";
import { accountService, rfcService, alertService } from '../../services';

function LandingEntries({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    const userDetails = accountService.userValue;

    useEffect(() => {
        rfcService.getAll('latest').then(x => setUsers(x));
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
            rfcService.exportData('latest').then((response) => {
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
        <div className="new-form" style={{ overflow: 'none !important' }}>
            <div className="img_bx"></div>
            <div className="button-div-rfp">
                <div className="row">
                    <div className="container">
                        <div className="col-md-12">
                            <h1 className="header-text">Request For Proposal</h1>
                            <Link to="/rfp/add" className="newbutton">Add</Link>
                            <Link to={`/rfp/my-entries`} className="newbutton mb-2">My Entries</Link>
                            <Link to="/rfp/all-entries" className="newbutton">All Entries</Link>
                            <Link to="#" onClick={handleExportData} className="newbutton">Export</Link>

                        </div>
                    </div>
                </div>
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
                                                <Link to={`/rfp/edit/${user.id}`} className="btn btn-sm edit-button mr-1">Edit</Link>
                                                {/* {(userDetails.role == "Manager" || userDetails.role == "Admin") && <button onClick={() => deleteUser(user.id)} className="btn btn-sm del-button" disabled={user.isDeleting}>
                                                {user.isDeleting
                                                    ? <span className="spinner-border spinner-border-sm"></span>
                                                    : <span>Delete</span>
                                                }
                                            </button>} */}
                                            </td>
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

export { LandingEntries };
