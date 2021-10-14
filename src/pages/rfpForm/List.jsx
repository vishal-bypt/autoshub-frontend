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
            // history.push('/rfp');
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
                    //setUsers(x);
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

        <div className="new-form" style={{ overflow: 'none !important' }}>
            <div className="img_bx"></div>
            <div className="button-div-rfp">
                <div className="row">
                    {/* <div className="container">
            <div className="col-md-12">
              <h1 className="header-text">RFP</h1>
              {/* <p>All RFP Records from secure (admin only) api end point:</p> */}
                    {/* <Link to={`/rfp/add`} className="newbutton">
                Add
              </Link>
              &nbsp;
              <Link to={`/rfp/my-entries`} className="newbutton">
                My Entries
              </Link>
              &nbsp; */}
                    {/* <Link to={`/rfp/edited-entries`} className="btn btn-sm btn-info mb-2">Edited Entries</Link>
            &nbsp; */}
                    {/* <button
                onClick={handleExportData}
                className="newbutton text-right"
              >
                Export
              </button>
            </div>
          </div> */}


                    <div className="container">
                        <div className="col-md-12">
                            <h1 className="header-text">Request For Proposal</h1>
                            <Link to={`/rfp/add`} className="newbutton mb-2">Add</Link>
                            <Link to={`/rfp/landing-entries`} className="newbutton mb-2">Landing Page</Link>
                            <Link to={`/rfp/my-entries`} className="newbutton mb-2">My Entries</Link>
                            <Link to="#" onClick={handleExportData} className="newbutton mb-2">Export</Link>
                            {(userDetails.role == "Manager" || userDetails.role == "Admin") && <Link to="#" onClick={recoverEntry} className="newbutton mb-2">Recover Entry</Link>}

                        </div>
                    </div>

                </div>
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
                                        //user?.ageing = dynemicAgeing

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

                                                {/* <td style={{ minWidth: "150px" }}>
                                                {user.salesCrmOpportunityId
                                                    ? user.salesCrmOpportunityId
                                                    : ""}
                                            </td> */}
                                                <td style={{ whiteSpace: "nowrap" }}>
                                                    <Link to={`/rfp/edit/${user.id}`} className="btn btn-sm edit-button mr-1">
                                                        Edit
                                                    </Link>
                                                    {/* {(userDetails.role == "Manager" ||
                                                    userDetails.role == "Admin") && (
                                                        <button
                                                            onClick={() => deleteUser(user.id)}
                                                            className="btn btn-sm del-button"
                                                            disabled={user.isDeleting}
                                                        >
                                                            {user.isDeleting ? (
                                                                <span className="spinner-border spinner-border-sm"></span>
                                                            ) : (
                                                                <span>Delete</span>
                                                            )}
                                                        </button>
                                                    )} */}
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
