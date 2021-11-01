import React, { useEffect, useState } from 'react';
import cellEditFactory from "react-bootstrap-table2-editor"
import moment from 'moment';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AllInclusive from '@material-ui/icons/AllInclusive';
import BootstrapTable from "react-bootstrap-table-next"
import { trainingService, accountService, alertService } from '../../services';
import Swal from 'sweetalert2'
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import BackupIcon from '@material-ui/icons/Backup';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import { IconButton } from '@material-ui/core';
import { Role } from '../../helpers';
var FormData = require('form-data');

function AddEdit({ history, match }) {
    const { path } = match;
    const userDetails = accountService.userValue;
    const user = accountService.userValue;
    const [users, setUsers] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectBtn, setSelectBtn] = useState(true)
    const [uploadBtn, setUploadBtn] = useState(false)
    const [successBtn, setSuccessBtn] = useState(false)
    const [errorBtn, setErrorBtn] = useState(false)
    useEffect(() => {
        trainingService.getAll().then(x => setUsers(x));
    }, []);

    const onFileChange = event => {
        let file = event.target.files[0];
        if (!file)
            alertService.error('Add excel file', { keepAfterRouteChange: false });
        else {

            setSelectedFile(file)
            setSelectBtn(false)
            setUploadBtn(true)
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            var formData = new FormData();
            if (!selectedFile) {
                return Swal.fire('Oops...', 'Please attach excel file!', 'error')
            }
            formData.append('filePath', selectedFile);//append the values with key, value pair 
            create(formData, user.id);
        } catch (error) {
            console.log("error == ", error);
        }
    }

    function create(formData, id) {
        trainingService.uploadExcel(formData, id)
            .then((data) => {
                setUploadBtn(false)
                setSuccessBtn(true)
                alertService.success('Success', { keepAfterRouteChange: true });
                Swal.fire('Training uploaded successfully.!')
                trainingService.getAll().then(x => setUsers(x));
            })
            .catch(error => {
                setUploadBtn(false)
                setErrorBtn(true)
                alertService.error(error);
            });
    }
    function updatedValue(e, index){
        console.log("index == ",index)
        console.log("e -- ",  e)              
        let value = e.target.value       
        trainingService.update(index,value).then((x) => {
            console.log("x == ",x)
           console.log("successfully updated value")
        });
    }    
    return (
        <>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <h1 className="header-text">Upload Training Records</h1>
                        </div>
                        <div className="col-md-4 text-end">
                            <form encType='multipart/form-data'>
                                <div className="form-group col-12 mt-2 p-0">
                                    <input type="file" display="none" name="" id="ExcelFile" className="form-control" onChange={onFileChange} hidden />
                                </div>
                            </form>
                            <div className="variantsPopUpFileUpload">
                                {selectBtn && <IconButton onClick={() => {
                                    document.getElementById('ExcelFile').click();
                                }}> <div className='filePopUpFileUpload '>
                                        <label htmlFor='input-file selectAndUpload'>
                                            <CloudQueueIcon />
                                            &nbsp;SelectFile & upload
                                        </label>
                                    </div>
                                </IconButton>
                                }
                                {uploadBtn && <IconButton onClick={handleSubmit}><div className='filePopUpFileUpload file--uploadingPopUpFileUpload'>
                                    <label htmlFor='input-file'>
                                        <BackupIcon />Upload
                                    </label>
                                </div></IconButton>}

                                {successBtn && <IconButton onClick={() => {
                                    setSuccessBtn(false)
                                    setSelectBtn(true)
                                }}><div className='filePopUpFileUpload file--successPopUpFileUpload'>
                                        <label htmlFor='input-file'>
                                            <CloudDoneIcon />Success
                                        </label>
                                    </div></IconButton>}

                                {errorBtn && <IconButton onClick={() => {
                                    setErrorBtn(false)
                                    setSelectBtn(true)
                                }} ><div className='filePopUpFileUpload file--dangerPopUpFileUpload'>
                                        <label htmlFor='input-file'>
                                            <CloudOffIcon />Error
                                        </label>
                                    </div></IconButton>}
                            </div>
                        </div>
                        <div className="col-md-4 text-end">
                            <Link to={'.'} className="btn btn-danger "><ArrowBackIcon className="mr-1" />Back</Link>
                        </div>

                    </div>
                </div>
                {/* <div className="data-table-div">
                    <div className="data-table">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>                                        
                                        <th className="traning-listing" >#</th>
                                        <th className="traning-listing" >Training Name</th>
                                        <th className="traning-listing" >Training Type</th>
                                        <th className="traning-listing" >Start Date</th>
                                        <th className="traning-listing" >End Date</th>
                                        <th className="traning-listing" >Required Prerequisites</th>
                                        <th className="traning-listing" >Stream</th>
                                        <th className="traning-listing" >Tool Name</th>
                                        <th className="traning-listing" >Created</th>
                                        <th className="traning-listing" >Nomination End Date</th>
                                        <th className="traning-listing" >Vacancies</th>                                        
                                        <th className="traning-listing" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users && users.map((user, index) =>
                                    
                                        <tr key={user.id}>                                           
                                            <td className="traning-listing" style={{ minWidth: '40px' }}>{index + 1}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }} >{user.trainingName}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{user.trainingType}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '120px' }}>{user.trainingPrequisites}</td>
                                            <td className="traning-listing" style={{ minWidth: '75px' }}>{user.stream}</td>
                                            <td className="traning-listing" style={{ minWidth: '100px' }}>{user.toolName}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.created).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>
                                            <div className="table-editable">
                                                <td className="traning-listing" style={{ minWidth: '150px' }} ><AllInclusive/></td>
                                            </div>
                                            
                                            <td className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                                {userDetails.role == "Admin" && <div >
                                                    <Link to={`/training/assign/${user.id}`} className="btn btn-sm btn-primary mr-1">Assign</Link>
                                                </div>}
                                            </td>
                                        </tr>                                    
                                )
                                }
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
                </div> */}
                <div className="card">
                    <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
                        Trainings
                    </h3>
                    <div className="card-body">
                        <div id="table" className="table-editable">
                            {/*  <span class="table-add float-right mb-3 mr-2"><a href="#!" class="text-success"
                            ><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a
                                ></span> */}
                            <table className="table table-bordered table-responsive-md table-striped text-center">
                                <thead>
                                    <tr>
                                        <th className="traning-listing" >#</th>
                                        <th className="traning-listing" >Training Name</th>
                                        <th className="traning-listing" >Training Type</th>
                                        <th className="traning-listing" >Start Date</th>
                                        <th className="traning-listing" >End Date</th>
                                        <th className="traning-listing" >Required Prerequisites</th>
                                        <th className="traning-listing" >Stream</th>
                                        <th className="traning-listing" >Tool Name</th>
                                        <th className="traning-listing" >Created</th>
                                        <th className="traning-listing" >Nomination End Date</th>
                                        <th className="traning-listing" >Slots</th>
                                        <th className="traning-listing" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map((user, index) =>
                                        <tr key={user.id}>
                                            <td className="pt-3-half" contentEditable="false" style={{ minWidth: '40px' }}>{index + 1}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '40px' }} >{user.trainingName}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '150px' }}>{user.trainingType}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '150px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '150px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '120px' }}>{user.trainingPrequisites}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '75px' }}>{user.stream}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '100px' }}>{user.toolName}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '150px' }}>{moment(user.created).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '150px' }}>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>                                            
                                            <td className="traning-listing" contentEditable="true" style={{ minWidth: '150px' }} onBlur={(e) => updatedValue(e,index+1)}>
                                            <input
                                                type="number"
                                                min="0"
                                                className="border-0"
                                                placeholder={user.slots ? user.slots : "N/A"}                                           
                                            />
                                            </td>  
                                            <td className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                                {userDetails.currentRole == Role.Admin && <div >
                                                    <Link to={`/training/assign/${user.id}`} className="btn btn-sm btn-primary mr-1">Assign</Link>
                                                </div>}
                                            </td>
                                        </tr>
                                    )
                                    }
                                    {!users &&
                                        <tr>
                                            <td colSpan="12" className="text-center">
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
        </>
    );
}

export { AddEdit };