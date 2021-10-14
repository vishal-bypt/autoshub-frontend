import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../../components/CustomSelect';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Swal from 'sweetalert2'
import { accountService, alertService, trainingService } from "../../services";

function AssignUsers({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const userDetails = accountService.userValue;
    const [temp, setTemp] = useState(null);
    const [users, setUsers] = useState(null);
    const [assignedUsers, setAssignedUsers] = useState(null);
    const user = accountService.userValue;
    const assignUserIds = [];
    let userDropDownData = [];
    //console.log("temp == ",temp);
    let userIdArray = []
    userDropDownData.push(                       
        {
            label:"All",
            value:0            
        }
    );
    useEffect(() => {
        if(userDetails.role == "Admin"){           
            accountService.getManagerList().then((x) => {
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
    }, []);
    //console.log("users == ",users);   
    const initialValues = {
        user: assignedUsers ? assignedUsers : '',
    };

    const validationSchema = Yup.object().shape({
       
    });

  /*   function onSubmit(fields, { setStatus, setSubmitting }) {
        console.log("fields", fields); 
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting);
        } else {
            updateUser(id, fields, setSubmitting);
        }
    } */

    function onSubmit(fields, { setStatus, setSubmitting }) {
        //console.log("fields == ",fields);
        
        if(userDetails.role == "Admin"){
            var result = fields.user.map(function (x) { 
                return parseInt(x, 10); 
              });
            const data  = {
                trainingId : id,
                assignedBy: user.id,
                assignedTo : result,
                type:1
            }           
            trainingService.assignTraining(data)
                .then(() => {
                    Swal.fire('Training successfully assigned to Manager')
                    alertService.success('Training successfully assigned to Manager', { keepAfterRouteChange: true });
                    history.push('/training/add');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
        }
        if(userDetails.role == "Manager"){
            var result = fields.user.map(function (x) { 
                return parseInt(x, 10); 
              });
            const data  = {
                trainingId : id,
                assignedBy: user.id,
                assignedTo : result,
                type:2
            }
            //console.log("data == > ",data);
            trainingService.assignTraining(data)
                .then(() => {
                    Swal.fire('Training successfully nominated to Employee.')
                    alertService.success('Training successfully nominated to Employee.', { keepAfterRouteChange: true });
                    
                    history.push('/training');
                })
                .catch(error => {
                    setSubmitting(false);
                    alertService.error(error);
                });
        }
    }
    
    function createUser(fields, setSubmitting) {
        accountService.create(fields)
            .then(() => {
                alertService.success('User added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        accountService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }
    
    return (
        <div className="new-form_white">
        <div className="img_bx_white"></div>
        <div className="new-form-height p-4 extra-padding" >
            {/* <div className="container">
                <h1 >RFP</h1>
            </div> */}
            <div className="back-btn-div">
                <div className="btn-width-div">
                    <Link to="." onClick={() => { history.goBack(); }} className="back-btn "><ArrowBackIcon className="mr-1" />Back</Link>
                </div>
            </div>
            <div className="container" >
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {               
                /* useEffect(() => {
                    const fields = ['user'];
                    fields.forEach(field => setFieldValue(field, assignUserIds, false));
                }, []); */

                return (
                    <div className="container" >
                    <Form>
                        <div style={{margin:"100px"}} className="formSection">
                        <h1 style={{textAlign:'center'}} className="blue-header">Assign Task</h1>
                        <div className="form-row mt-5">
                            <div className="form-group col-6">
                            {/* {userDetails.role == "Admin" && <div >
                            <h3>Assign To_Module</h3>
                                {/* <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Nominate</Link> 
                            </div>}  */}
                            {/* {userDetails.role == "Manager" && <div >
                            <h3>Nominate_Module</h3>
                                {/* <Link to={`${path}/uploadPrequisites`} className="btn btn-sm btn-primary mr-1">Nominate</Link> 
                            </div>}   */}                           
                            </div>
                        </div>
                        <div className="form-row" style={{display:"flex",justifyContent:'center'}}>
                            <div className="form-group col-6">
                                <label>Lead Name</label>
                                <Field
                                    className={'form-control custom-form-control' + (errors.user && touched.user ? ' is-invalid' : '')}
                                    name="user"
                                    options={temp}
                                    component={CustomSelect}
                                    isMulti={true}
                                    placeholder=""
                                    onChangeValue={value =>{
                                        console.log("Value == ",value)
                                        if(value.length>0){                                                                                       
                                            if(value.includes(0))
                                                setTemp([temp[0]])
                                        }
                                        else{                                            
                                            if(userDetails.role == "Admin"){
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
                                                    setTemp(userDropDownData);
                                                    //console.log("setTemp == ",setTemp);
                                                })   
                                            } else {
                                                accountService.getUserList().then((x) => {
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
                                                    setTemp(userDropDownData);
                                                })   
                                            }
                                        
                                        }
                                        console.log("value == ",value);
                                    }}
                                />
                                
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            
                            </div>                            
                        </div>
                            
                        <div className="form-group" style={{display:"flex",justifyContent:'center'}}>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Submit
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                        </div>
                        </div>
                    </Form>
                    </div>
                );
            }}
        </Formik>
        
                </div>
            </div>
        </div>
    );
}

export { AssignUsers };