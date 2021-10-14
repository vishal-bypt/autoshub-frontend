import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { trainingService, accountService, alertService } from '../../services';
import Swal from 'sweetalert2'
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import BackupIcon from '@material-ui/icons/Backup';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import { IconButton } from '@material-ui/core';
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
        //console.log("event.target.files[0] == ", event.target.files[0]);
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
            //console.log("e == ", e)
            e.preventDefault();
            var formData = new FormData();
            if (!selectedFile) {
                //return alert("Please add file first")
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
                //history.push('/training/add');
                //alert("Your file is uploaded!")
                Swal.fire('Training uploaded successfully.!')
                trainingService.getAll().then(x => setUsers(x));
                // window.location.reload();
            })
            .catch(error => {
                setUploadBtn(false)
                setErrorBtn(true)
                alertService.error(error);
            });

    }
    //console.log("users == ", users);
    return (
        <>
            {/* <div className="p-4">
            <div className="container extra-padding">   
                <div className="row" style={{justifyContent:'space-between'}}>
                    <div>
                        <h1>Import Training Records</h1>
                        <form encType='multipart/form-data'>
                            <div className="form-group col-12">
                                <label>Upload Excel File</label>
                                <input type="file"  name="" id=""  className="form-control" onChange={onFileChange} />
                            
                            </div>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Save
                            </button>                
                        </form>
                    </div>
                    <div>
                        <Link to={'.'} className="btn btn-info btn-lg">Back</Link>
                    </div>
                
                
                    </div>         
            <div>

               </div>
            </div>
            

        </div>

    <div className="container-fluid">
    <div className="table-responsive">
    <table className="table table-striped extra-table" >
        <thead >
            <tr>
                
                {/* <th>Upload Prequisites</th>  */}
            {/* <th style={{ fontSize:'15px'}}>#</th>
                <th style={{ fontSize:'15px'}}>Training Name</th>
                <th style={{ fontSize:'15px'}}>Training Type</th>
                <th style={{ fontSize:'15px'}}>Start Date</th>
                <th style={{ fontSize:'15px'}}>End Date</th>
                <th style={{ fontSize:'15px'}}>Required Prerequisites</th>
                <th style={{ fontSize:'15px'}}>Nomination End Date</th>  */}
            {/* <th>Status</th> */}
            {/* <th style={{ fontSize:'15px'}}></th> */}

            {/* </tr> */}
            {/* </thead> */}
            {/* <tbody>
        {users && users.map((user,index) =>        
                <tr key={user.id}>
                          */}


            {/*  <td style={{ whiteSpace: 'nowrap', minWidth: '30%'}}>
                        { userDetails.role == "User" && <div >  
                            <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Upload</Link>
                        </div>}                
                    </td> */}
            {/* <td style={{ fontSize:'15px',minWidth: '40px' }}>{index+1}</td>
                    <td style={{ fontSize:'15px',minWidth: '150px' }}>{user.trainingName}</td>
                    <td style={{ fontSize:'15px',minWidth: '150px' }}>{user.trainingType}</td>
                    <td style={{ fontSize:'15px',minWidth: '150px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                    <td style={{ fontSize:'15px',minWidth: '150px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>                            
                    <td style={{ fontSize:'15px',minWidth: '150px' }}>{user.trainingPrequisites}</td>
                    <td style={{ fontSize:'15px',minWidth: '150px' }}>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>                              */}
            {/* <td style={{ minWidth: '200px' }}>Pending</td> */}
            {/* <td style={{ fontSize:'15px',whiteSpace: 'nowrap', minWidth: '30%' }}> */}
            {/* { userDetails.role == "Admin" && <div >                         */}
            {/* <Link to={`/training/assign/${user.id}`} className="btn btn-sm btn-info mr-1">Assign</Link> */}
            {/* </div>} */}

            {/* </td>  */}

            {/* </tr> */}
            {/* )}
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
    </div> */}
            <div className="new-form" style={{ overflow: 'none !important' }}>
                <div className="img_bx"></div>
                <div className="back-btn-div">
                    <div className="btn-width-div">
                        {/* <Link onClick={() => { history.push('.'); }}  className="back-btn "><ArrowBackIcon className="mr-1" />Back</Link> */}
                    </div>
                </div>
                <div className="button-div">
                    <div className="row">

                        <div className="container">
                            <div className="col-md-12">
                                <h1 className="header-text">Upload Training Records</h1>
                                <form encType='multipart/form-data'>
                                    <div className="form-group col-12 newformmargin p-0">
                                        {/* <label style={{ fontWeight: "500", color: "#fff" }}>Upload Excel File</label> */}
                                        <input type="file" display="none" name="" id="ExcelFile" className="form-control" onChange={onFileChange} hidden />

                                    </div>
                                    {/* <button className="btn btn-info" onClick={handleSubmit}>
                                        Submit
                                    </button> */}
                                </form>
                                <div className="variantsPopUpFileUpload">
                                    {selectBtn && <IconButton onClick={() => {
                                        // <input id='input-file' type='file' />

                                        document.getElementById('ExcelFile').click();
                                        // setUploadFileBtn(true)
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
                                        {/* <input id='input-file' type='file' /> */}
                                    </div></IconButton>}

                                    {successBtn && <IconButton onClick={() => {
                                        setSuccessBtn(false)
                                        setSelectBtn(true)
                                    }}><div className='filePopUpFileUpload file--successPopUpFileUpload'>
                                            <label htmlFor='input-file'>
                                                <CloudDoneIcon />Success
                                            </label>
                                            {/* <input id='input-file' type='file' /> */}
                                        </div></IconButton>}

                                    {errorBtn && <IconButton onClick={() => {
                                        setErrorBtn(false)
                                        setSelectBtn(true)
                                    }} ><div className='filePopUpFileUpload file--dangerPopUpFileUpload'>
                                            <label htmlFor='input-file'>
                                                <CloudOffIcon />Error
                                            </label>
                                            {/* <input id='input-file' type='file' /> */}
                                        </div></IconButton>}


                                </div>




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
                                        {/* <th>Upload Prequisites</th>  */}
                                        <th className="traning-listing" >#</th>
                                        <th className="traning-listing" >Training Name</th>
                                        <th className="traning-listing" >Training Type</th>
                                        <th className="traning-listing" >Start Date</th>
                                        <th className="traning-listing" >End Date</th>
                                        <th className="traning-listing" >Required Prerequisites</th>
                                        <th className="traning-listing" >Stream</th>
                                        <th className="traning-listing" >Tool Name</th>
                                        <th className="traning-listing" >Nomination End Date</th>
                                        {/* <th>Status</th> */}
                                        <th className="traning-listing" ></th>
                                    </tr>
                                </thead>


                                <tbody>
                                {users && users.map((user, index) =>
                                    
                                        <tr key={user.id}>



                                            {/*  <td style={{ whiteSpace: 'nowrap', minWidth: '30%'}}>
                        { userDetails.role == "User" && <div >  
                            <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Upload</Link>
                        </div>}                
                    </td> */}
                                            <td className="traning-listing" style={{ minWidth: '40px' }}>{index + 1}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{user.trainingName}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{user.trainingType}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.trainingStartDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.trainingEndDate).format("DD/MM/YYYY")}</td>
                                            <td className="traning-listing" style={{ minWidth: '120px' }}>{user.trainingPrequisites}</td>
                                            <td className="traning-listing" style={{ minWidth: '75px' }}>{user.stream}</td>
                                            <td className="traning-listing" style={{ minWidth: '100px' }}>{user.toolName}</td>
                                            <td className="traning-listing" style={{ minWidth: '150px' }}>{moment(user.nominationEndDate).format("DD/MM/YYYY")}</td>
                                            {/* <td style={{ minWidth: '200px' }}>Pending</td> */}
                                            <td className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                                {userDetails.role == "Admin" && <div >
                                                    <Link to={`/training/assign/${user.id}`} className="btn btn-sm btn-info mr-1">Assign</Link>
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

                </div>

            </div>
        </>
    );
}

export { AddEdit };