import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
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
    const [click, setClick] = useState(true)
    let userDropDownData = [];
    const assignUserIds = [];
    
    const [assignedUsers, setAssignedUsers] = useState(null);
    const [perManager, setPerManager] = useState()
    const [finalValue, setFinalValue] = useState(0)
    const [final, setFinal] = useState(null)
    console.log("main temmp == ",temp);
    console.log("users == ",users)
    useEffect(() => {
        if(userDetails.currentRole == Role.Admin){ 
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
        if(userDetails.currentRole == Role.Manager){            
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
            console.log("in submit")
            debugger;
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

    function create(data) {
        console.log("formData == ",data) 
              var formData = new FormData();                
                formData.append('data1',data) 
                trainingService.assignTraining(data)        
            .then((data) => {               
                alertService.success('Success', { keepAfterRouteChange: true });
                Swal.fire('Training Assign successfully.!')
                //trainingService.getAll().then(x => setUsers(x));
            })
            .catch(error => {                
                alertService.error(error);
            });
    }
    function updatedValue(e, index){   
        ///console.log("index == ",index)              
        let value = parseInt(e.target.value)  

        //console.log("plaveholder == ",e.target.placeholder)  
        //.log("updated value == ",value)       
        for(let i=0;i<temp.length;i++){
            if((index-1)==i){
                temp[i].numberOfTraining=value
            }            
        }
        let totalSlot = trainingData.slots 
        //console.log("totalSlot == ",totalSlot)

        let minus = totalSlot-e.target.placeholder
        //console.log("minus == ",minus)

        let lastValue = minus+value

        setFinalValue(lastValue)
       
        //console.log("lastValue = ",lastValue)
        if(lastValue>totalSlot || lastValue<totalSlot){
            console.log("lastValue inside == ",lastValue)
            setClick(false)
        }
    }  

    useEffect(() => {          
        if(trainingData.slots){               
            let slotData = parseInt((trainingData?.slots)/(temp?.length))  
            let userData=[]
            setPerManager(slotData)
            let totalAssignedTraining = slotData*(temp?.length) 
            for(let i=0;i<temp?.length;i++){
                let data=temp[i];             
                data = { 
                    numberOfTraining:slotData?slotData:0,
                    managerName: temp[i].label,
                    id: temp[i].value,
                    trainingId: parseInt(id)
                }                
                userData[i]=(data);        
                console.log(" userData[i] == ", userData[i])         
            }; 
            setTemp(userData)  
            //setTemp(userData)
            let diffenceInSlot=0; 
            if(trainingData?.slots){            
                diffenceInSlot = trainingData.slots-totalAssignedTraining
            }           
                    
            let modifiedData=userData            
            if(diffenceInSlot>0){            
                for(let j = 0; j < userData?.length; j++){
                    if(diffenceInSlot<=0){                    
                        break;
                    } 
                    let data=userData[j];   
                    //console.log("data == ",data)              
                    data = {
                        managerName: userData[j].managerName,                        
                        numberOfTraining:(slotData?slotData:0)+1, 
                        id: userData[j].id,
                        trainingId: parseInt(id)
                    }
                    modifiedData[j]=(data);                       
                    diffenceInSlot--  
                }   
                //console.log("modified Data?? = ",modifiedData)          
                setTemp(modifiedData)                    
            } else {
                setTemp(modifiedData)
            }
        }
        else{            
            let userData=[];
            setPerManager("N/A")
            for(let i=0;i<temp?.length;i++){
                let data=temp[i];                         
                data = { 
                    numberOfTraining:0,
                    managerName: temp[i].label,
                    trainingId: parseInt(id),
                    id: temp[i].id,
                }               
                userData[i]=(data);                 
            }; 
            setTemp(userData)           
        }
    },[trainingData])

    const handleChange = (e) => {        
        const { name, checked } = e.target;        
        if (name === "allSelect") {            
            let tempUser = temp.map((user) => {
                return { ...user, isChecked: checked };
            });            
            setTemp(tempUser);
        } 
        else {            
            let tempUser = temp.map((user) =>
                user.managerName === name ? { ...user, isChecked: checked } : user
            );            
            setTemp(tempUser);
            }
    };
    /* if(temp){
        let finalTest[];
        for(let i=0;i<temp.length;i++){
            if(temp[i].isChecked == true){
                finalTest.push(temp[i])
            }
        }
        setFinal(finalTest)
    } */
    function submitClick(e){
        try {
            e.preventDefault();  
            create(temp);
        } catch (error) {
            console.log("error == ", error);
        }
    }

    return (
        <div className="page-content">
                <div className="container-fluid">
                    <div className="row"> 
                        <div className="col-md-12 text-end">
                            <Link to={'/training/add'} className="btn btn-danger "><ArrowBackIcon className="mr-1" />Back</Link>
                        </div>
                    </div>
                </div>  
                <div className="card">
                    <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
                        Assign Training
                    </h3>
                    <div className="card-header">
                        <h6>Total number of Slots:- <b>{trainingData?.slots ? trainingData.slots : "N/A"}</b></h6>
                        <h6>Total Reporting Managers:- <b>{temp?.length? temp.length : "N/A"}</b></h6>
                        <h6>Slot for each reporing manager :-  <b>{Math.floor(perManager ? perManager : 0)}</b>&nbsp;</h6>
                    </div>
                </div>
            <div className="card-body mt-5">
                <div id="table" className="table-editable">
                    <table className="table table-bordered table-responsive-md  text-center">
                        <thead>
                            <tr>
                                <th className="traning-listing" >#</th>
                                <th className="traning-listing" >Manager Name</th>
                                <th className="traning-listing" >Assigned Training</th>  
                                <th className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>                                                
                                    <div className="form-check">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input" 
                                            name="allSelect"  
                                            checked={!temp.some((user) => user?.isChecked !== true)}                                            
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label ms-2">All Select</label>
                                    </div>
                                </th>  
                            </tr>
                        </thead>
                        <tbody>
                            {temp && temp.map((user, index) =>
                                <tr key={user.id}>
                                     <td className="pt-3-half" contentEditable="false" style={{ minWidth: '40px' }}>{index + 1}</td>
                                    <td className="traning-listing" contentEditable="false" style={{ minWidth: '40px' }} >{user.managerName}</td>                                    
                                    {user.numberOfTraining>0 ?                                                                             
                                        <td className="traning-listing" contentEditable="false" style={{ minWidth: '150px' }} onBlur={(e) => updatedValue(e,index+1)}>
                                        <input
                                            disabled
                                            type="number"
                                            min="0"
                                            className="border-0"
                                            placeholder={user.numberOfTraining ? user.numberOfTraining : "N/A"}                                           
                                        />
                                        </td>  : <td className="traning-listing" contentEditable="false" style={{ minWidth: '150px' }}>
                                        <input                                                
                                            disabled placeholder={user.numberOfTraining ? user.numberOfTraining : "N/A"}                                           
                                        />
                                        </td>
                                    }
                                    <td className="traning-listing" style={{ whiteSpace: 'nowrap', minWidth: '30%' }}>
                                        <div className="form-check" key={index}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name={user.managerName}
                                                checked={user?.isChecked || false}
                                                onChange={handleChange}
                                                />
                                        </div>
                                    </td>
                                </tr>                                
                            )}                             
                        </tbody>                        
                    </table>
                    <div className="text-end mt-3">

                        <button type="submit" onClick={submitClick} className="btn btn-warning">Submit                                    
                        </button>                                
                    </div>
                </div>
            </div>
        </div>
    )
}

export {AssignUsers}
