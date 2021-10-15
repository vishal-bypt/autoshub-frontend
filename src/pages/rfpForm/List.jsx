import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { history } from '../../helpers';
import Swal from 'sweetalert2'
import { accountService, rfcService, alertService } from "../../services";
import moment from "moment";

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    const userDetails = accountService.userValue;

    useEffect(() => {
        rfcService.getAll("all").then((x) => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(
            users.map((x) => {
                if (x.id === id) {
                    x.isDeleting = true;
                }
                return x;
            })
        );
        rfcService.delete(id).then((data) => {
            setUsers((users) => users.filter((x) => x.id !== id));
            alertService.success(data.message, { keepAfterRouteChange: true });            
        });
    }

    const recoverEntry = () => {
        try {
            Swal.fire({
                title: 'Please enter Recovery ID',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Recover',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {                
                if (result.isConfirmed) {
                    let recoverId = result.value;
                    if (recoverId) {
                        if (userDetails.role == "Admin") {
                            rfcService.update(recoverId, { userId: userDetails?.id, isEdit: 3 })
                                .then(() => {
                                    rfcService.getAll("latest").then((x) => setUsers(x));
                                    Swal.fire({ title: `Your RFP record recovered successfully` })
                                })
                                .catch(error => {
                                    console.log("API error", error);
                                    Swal.fire({
                                        title: `Error while recovering RFP record`,
                                    })
                                    Swal.showValidationMessage(`${error}`)
                                });
                        }
                        else {
                            Swal.showValidationMessage(`You do not have sufficient rights`)
                        }
                    }
                    else {
                        Swal.fire({
                            title: `Error while recovering RFP record`,
                        })
                        Swal.showValidationMessage(`Please enter RecoveryId`)
                    }
                }
            })
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleExportData = () => {
        try {
            rfcService.getAll("all").then((x) => {
                rfcService.exportData("all").then((response) => {                   
                    const link = document.createElement("a");
                    link.href = response.exportPath;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="page-content">            
            <div className="container-fluid">
                <div className="row"> 
                    <div className="col-md-6">
                        <h1 className="header-text">Request For Proposal</h1>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to={`/rfp/add`} className="btn btn-primary">Add</Link>
                        <Link to={`/rfp/landing-entries`} className="btn btn-primary ml-1">Landing Page</Link>
                        <Link to={`/rfp/my-entries`} className="btn btn-primary ml-1">My Entries</Link>
                        <Link to="#" onClick={handleExportData} className="btn btn-primary ml-1">Export</Link>
                        {(userDetails.role == "Manager" || userDetails.role == "Admin") && <Link to="#" onClick={recoverEntry} className="btn btn-primary ml-1">Recover Entry</Link>}
                    </div>                    
                </div>
                <div className="row">&nbsp;</div>
            </div>
            <div className="data-table-div">
                <div className="data-table">
                    <div className="table-responsive">
                        <table className="table table-striped allEntries extra-black-table">
                            <thead>
                                <tr>
                                    <th className="traning-listing" >Client Name</th>
                                    <th className="traning-listing" >Response Type</th>
                                    <th className="traning-listing" style={{ minWidth: "200px !important" }}>Month</th>
                                    <th className="traning-listing" >Program Lead</th>
                                    <th className="traning-listing" >Status</th>
                                    <th className="traning-listing" >Stage</th>
                                    {(userDetails.role == "Manager" ||
                                        userDetails.role == "Admin") && <th className="traning-listing" >Ageing Days</th>}
                                    < th className="traning-listing" >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((user, index) => {
                                        var ageingDate = moment(user?.rfpRespondedDate, "YYYY-MM-DD").add(60, 'days');
                                        const finalDays = moment().diff(ageingDate, 'days')
                                        let dynemicAgeing = finalDays > 0 ? finalDays : ""
                                        return (
                                            <tr key={index + "HomeList"}>
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
                                                <td style={{ whiteSpace: "nowrap" }}>
                                                    <Link to={`/rfp/edit/${user.id}`} className="btn btn-warning">
                                                        Edit
                                                    </Link>                                                    
                                                </td>
                                            </tr>
                                        )
                                    })}
                                {!users && (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            <span className="spinner-border spinner-border-lg align-center"></span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export { List };
