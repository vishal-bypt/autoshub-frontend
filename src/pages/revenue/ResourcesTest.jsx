import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../_components/CustomSelect';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Swal from 'sweetalert2';
import moment from 'moment'
import { accountService, alertService, trainingService, prog, programService } from '@/_services';

function ResourcesTest({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const userDetails = accountService.userValue;
    const [temp, setTemp] = useState(null);
    const [users, setUsers] = useState(null);
    const [assignedUsers, setAssignedUsers] = useState(null);
    const user = accountService.userValue;
    const assignUserIds = [];
    let userDropDownData = [];
    var date = getCurrentDate('-');
    console.log("date == ",date)
    let userIdArray = []

    function getCurrentDate(separator = '') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        console.log("date == ",`${year}${separator}${month < 10 ? `0${month}` : `${month}`}`)
        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}`
    }   
    
    useEffect(() => {
        if (userDetails.role == "Admin") {
            programService.getAll().then((x) => {
                console.log("x == ", x)

                x && x.map((programData, index) => {
                    console.log("userData == ", programData);
                    console.log("userData ==>> ", programData.programName);
                    userDropDownData.push(
                        {
                            label: programData.programName,
                            value: programData.programName
                        }
                    );
                });
                setTemp(userDropDownData);
                console.log("temo === ", temp)
            })
        }
    }, []);
    console.log("users == ", users);
    console.log("temp == ", temp);
    const validationSchema = Yup.object().shape({
        programName: Yup.string(),
        month: Yup.string()
    });

    const initialValues = {
        programName: '',
        month: ''
    }

    function onSubmit(fields, { setStatus, setSubmitting }) {
        console.log("fields == ", fields.month);
       
        var oneDate = moment(fields.month);
        var monthName = oneDate.format('MMMM-YYYY');
        console.log("month name == ",monthName);       
    }

    return (
        <div className="new-form_white" style={{ overflowY: 'scroll' }}>
            <div className="img_bx_white"></div>
            <div className="new-form-height p-4 extra-padding" >
                {userDetails.role == "Admin" &&
                    <>
                        <Link to={`/revenue/addProgram`} className="newbutton">Add Program</Link>
                        <Link to={`/revenue/allProgram`} className="newbutton">All Program</Link>
                    </>
                }
                <div className="back-btn-div">
                    <div className="btn-width-div">
                        <Link to="." onClick={() => { history.goBack(); }} className="back-btn "><ArrowBackIcon className="mr-1" />Back</Link>
                    </div>
                </div>
                <div className="container" >
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ errors, touched, isSubmitting, setFieldValue, setTouched }) => {
                            return (
                                <div className="container" >
                                    <Form>
                                        <div style={{ margin: "100px" }} className="formSection">
                                            <h1 style={{ textAlign: 'center' }} className="blue-header">Select values</h1>

                                            <div className="form-row" style={{ display: "flex", justifyContent: 'center' }}>
                                                <div className="form-group col-6">
                                                    <label>Project Name</label>
                                                    <Field
                                                        className={'form-control custom-form-control' + (errors.programName && touched.programName ? ' is-invalid' : '')}
                                                        name="programName"
                                                        options={temp}
                                                        component={CustomSelect}
                                                        isMulti={false}
                                                        placeholder="Select Program"
                                                        onChangeValue={form => {
                                                            console.log("Value == ", form)
                                                        }}
                                                    />
                                                    <ErrorMessage name="programName" component="div" className="invalid-feedback" />
                                                </div>
                                                <div className="form-group col-6">
                                                    <label>Month</label>
                                                    <Field
                                                        name="month"
                                                        data-date-format="DD MMMM YYYY"
                                                        placeholder="Enter month"
                                                        type="month"
                                                        max={date}
                                                        className={'form-control' + (errors.month && touched.month ? ' is-invalid' : '')}
                                                    />
                                                    <ErrorMessage name="month" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="form-group" style={{ display: "flex", justifyContent: 'center' }}>
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

export { ResourcesTest };