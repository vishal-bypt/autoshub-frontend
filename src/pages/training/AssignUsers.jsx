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
var FormData = require('form-data');

function AssignUsers({ history, match }) {
    const { id } = match.params;    
    const userDetails = accountService.userValue;
    const user = accountService.userValue;
    const [users, setUsers] = useState(null);
    const [trainingData, setTrainingData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectBtn, setSelectBtn] = useState(true)
    const [temp, setTemp] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(false)
    const [successBtn, setSuccessBtn] = useState(false)
    const [errorBtn, setErrorBtn] = useState(false)
    const [click, setClick] = useState(false)
    let userDropDownData = [];
    const assignUserIds = [];
    const [assignedUsers, setAssignedUsers] = useState(null);
    const [perManager, setPerManager] = useState()
    console.log("main temmp == ",temp);
    useEffect(() => {
        if(userDetails.role == "Admin"){ 
            trainingService.getById(id).then((x)=>{
                setTrainingData(x)
            })   
            accountService.getManagerList().then((x) => {
                setUsers(x);                
                x && x.map((userdata, index) => {   
                    console.log("userData == ",userdata);                 
                    userDropDownData.push(
                        {
                            label: userdata.firstName + " " + userdata.lastName,
                            value: userdata.id
                        }
                    );
                });  
                console.log("userDropDownData == ", userDropDownData);              
                setTemp(userDropDownData);                
            })                   
            trainingService.getUserByTrainingId(id).then((x) => {
                x.map((row) => {
                    console.log("rows == ",row);
                    assignUserIds.push(row.assignedTo);
                });
            });
            setAssignedUsers(assignUserIds);
        }     

        if(userDetails.role == "Manager"){            
            accountService.getUserList().then((x) => {
                setUsers(x);                
                x && x.map((userdata, index) => {
                    //console.log("userData == ",userdata);                   
                    userDropDownData.push(                       
                        {
                            label: userdata.firstName + " " + userdata.lastName,
                            value: userdata.id
                        }
                    );
                });               
                setTemp(userDropDownData);
            })        
            trainingService.getUserByTrainingId(id).then((x) => {
                x.map((row) => {
                    //console.log("rows == ",row);
                    assignUserIds.push(row.assignedTo);
                });
            });
            setAssignedUsers(assignUserIds);
        } 

        let data = parseInt(trainingData?.slots/(temp?.length))        
        setPerManager(data)        
    }, []);   
    

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

    useEffect(() => {          
        if(trainingData.slots){
        console.log("in useEffect", trainingData);      
        let slotData = parseInt((trainingData?.slots)/(temp?.length))       
        console.log("slotData == ",slotData);
        console.log("before loop :-= ", temp); 
        let userData=[]
        setPerManager(slotData)
        let totalAssignedTraining = slotData*(temp?.length) 
        for(let i=0;i<temp?.length;i++){
            let data=temp[i];             
            data = { 
                numberOfTraining:slotData?slotData:0,
                managerName: temp[i].label
            }
            console.log("data == ",data);
            userData[i]=(data); 
            console.log("user[i] == ",userData);
        }; 
        setTemp(userData)
        
        console.log("outside loop == ",userData);     
        //setTemp(userData)
        let diffenceInSlot=0; 
        if(trainingData?.slots){            
            diffenceInSlot = trainingData.slots-totalAssignedTraining
        }            
        console.log("diffenceInSlot == ",diffenceInSlot);        
        let modifiedData=userData
        console.log("modifiedData == ",modifiedData);
        if(diffenceInSlot>0){            
            for(let j = 0; j < userData?.length; j++){
                if(diffenceInSlot<=0){                    
                    break;
                } 
                let data=userData[j];                 
                data = {
                    managerName: userData[j].managerName,                        
                    numberOfTraining:(slotData?slotData:0)+1                    
                }
                modifiedData[j]=(data);                       
                diffenceInSlot--  
            }             
            setTemp(modifiedData=>({modifiedData}))                    
        } else {
            setTemp(modifiedData=>({modifiedData}))
        }

        console.log("temp ==>>> ",temp);
    }
    },[trainingData])

   
    
    /* let totalAssignedTraining = perManager*(temp?.length)   
    let diffenceInSlot=0; 
    if(trainingData?.slots){
         diffenceInSlot = trainingData.slots-totalAssignedTraining
    } */

    /* if(diffenceInSlot>0){
        console.log("diffenceInSlot == ",diffenceInSlot)
    } */
    
    console.log("last temp == ",temp);
    console.log("length == ",temp?.modifiedData?.length);
    function selectAll(){
        console.log("all select click");
        setClick("checked")
    }
    console.log("check == ",click);
    return (
        <>
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row"> 
                        <div className="col-md-12 text-end">
                            <Link to={'.'} className="btn btn-danger "><ArrowBackIcon className="mr-1" />Back</Link>
                        </div>
                    </div>
                </div>                
                <div className="card">
                    <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
                        Assign Training
                    </h3>
                    <div className="card-header">
                    <h6>Total number of Slots:- <b>{trainingData?.slots ? trainingData.slots : "N/A"}</b></h6>
                    <h6>Total Reporting Managers:- <b>{temp?.modifiedData?.length? temp.modifiedData.length : "N/A"}</b></h6>
                    <h6>Slot for each reporing manager :-  <b>{Math.floor(perManager ? perManager : 0)}</b>&nbsp;</h6>
                    </div>
                    <div className="card-body">
                        <div id="table" className="table-editable">
                            {/*  <span class="table-add float-right mb-3 mr-2"><a href="#!" class="text-success"
                            ><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a
                                ></span> */}
                            <table className="table table-bordered table-responsive-md table-striped text-center">
                                <thead>
                                    <tr>
                                        <th className="traning-listing" >#</th>
                                        <th className="traning-listing" >Manager Name</th>
                                        <th className="traning-listing" >Assigned Training</th>  
                                        <th className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                                {/* {userDetails.role == "Admin" && <div >
                                                    <Link to={`/training/assign/${user.id}`} className="btn btn-sm btn-primary mr-1">Assign</Link>
                                                </div>} */}
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input"  checked={click} onChange={()=>setClick(!click)}/>
                                                    <label className="custom-control-label" for="customCheck1"></label>
                                                </div>
                                            </th>                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {temp?.modifiedData && temp?.modifiedData.map((user, index) =>
                                        <tr key={user.id}>
                                            <td className="pt-3-half" contentEditable="false" style={{ minWidth: '40px' }}>{index + 1}</td>
                                            <td className="traning-listing" contentEditable="false" style={{ minWidth: '40px' }} >{user.managerName}</td>
                                            {/* <td className="traning-listing" contentEditable="true" style={{ minWidth: '150px' }}>{user.trainingType}</td>  */}                                                                                      
                                            <td className="traning-listing" contentEditable="true" style={{ minWidth: '150px' }} onBlur={(e) => updatedValue(e,index+1)}>
                                            <input
                                                type="number"
                                                min="0"
                                                className="border-0"
                                                placeholder={user.numberOfTraining ? user.numberOfTraining : "N/A"}                                           
                                            />
                                            </td>  
                                            <td className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" unchecked/>
                                                    <label className="custom-control-label" for="customCheck1"></label>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    }
                                    {!users &&
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                            <Link className="btn btn-primary">
                                                <span className="spinner-border spinner-border-sm "></span>
                                                Save
                                            </Link>
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

export { AssignUsers };