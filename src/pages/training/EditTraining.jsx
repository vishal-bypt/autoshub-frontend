import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import { accountService, alertService, trainingService } from '../../services';
let aFormik = null;

function EditTraining({ history, match  }) {
    const user = accountService.userValue;
    const { id } = match.params;    
    const isAddMode = !id;

    const initialValues = {
        trainingName: '',
        trainingType: '',
        trainingStartDate: '',
        trainingEndDate: '',
        trainingPrequisites: '',
        nominationEndDate: ''
    };

    const validationSchema = Yup.object().shape({
        trainingName: Yup.string()
            .required('Training Name is required'),
        trainingType: Yup.string()
            .required('Training Type Name is required'),
        trainingStartDate: Yup.string()
            .required('Training Start Date is required'),
        trainingEndDate: Yup.string()
            .required('Training End Date is required'),
        trainingPrequisites: Yup.string()
            .required('Required Prerequisites is required'),
        nominationEndDate: Yup.string()
            .required('Nomination End Date is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        const data = { ...fields, userId: user.id }
        if (isAddMode) {
            createUser(data, setSubmitting);
        } else {
            updateUser(id, data, setSubmitting);
        }
    }
    
    useEffect((values, setFieldValue) => {
        if (!isAddMode) {
            // get user and set form fields
            trainingService.getById(id).then(user => {                             
                const fields = ['trainingName', 'trainingType', 'trainingStartDate', 'trainingEndDate', 'trainingPrequisites', 'nominationEndDate'];
                fields.map((field) => {
                    console.log("user == ",user)
                    console.log("values == ",values)
                    aFormik && aFormik.setFieldValue(field, user[field], false)
                    console.log("Formik.values == ",aFormik)
                });                
            });
        }
    }, []);

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
        trainingService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('/training/editList');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this Training?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                trainingService.delete(id).then((data) => {
                    alertService.success(data.message, { keepAfterRouteChange: true });
                    history.push("/training/editList");
                });
                Swal.fire(
                    'Deleted!',
                    'Your record has been deleted successfully',
                    'success'
                )
            }
        })
    }

    return (
        <div className="page-content">            
            <div className="container-fluid">                
                <div className="row">
                    <div className="col-md-6">
                        <h1>Edit Training</h1>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to={'.'} className="btn btn-danger"><ArrowBackIcon className="mr-1" />Back</Link>
                    </div>
                </div>
                <div >
        <Formik ref={p => (aFormik = p)}  initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors,values, touched, isSubmitting, setFieldValue }) => {
                
                return (                    
                        <Form>                            
                            <>                            
                            <div className="row mt-5">
                                <div className="form-group col-md-6">
                                    <label>Training Name</label>
                                    <Field name="trainingName" value="hi" type="text" className={'form-control' + (errors.trainingName && touched.trainingName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="trainingName" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Training Type</label>
                                    <Field name="trainingType" type="text" className={'form-control' + (errors.trainingType && touched.trainingType ? ' is-invalid' : '')} />
                                    <ErrorMessage name="trainingType" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Training Start</label>
                                    <Field name="trainingStartDate" type="text" className={'form-control' + (errors.trainingStartDate && touched.trainingStartDate ? ' is-invalid' : '')} />
                                    <ErrorMessage name="trainingStartDate" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-6">
                                    <label>Training End Date</label>
                                    <Field name="trainingEndDate" type="text" className={'form-control' + (errors.trainingEndDate && touched.trainingEndDate ? ' is-invalid' : '')} />
                                    <ErrorMessage name="trainingEndDate" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Required Prerequisites</label>
                                    <Field name="trainingPrequisites" type="text" className={'form-control' + (errors.trainingPrequisites && touched.trainingPrequisites ? ' is-invalid' : '')} />
                                    <ErrorMessage name="trainingPrequisites" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-6">
                                    <label>Nomination End Date</label>
                                    <Field name="nominationEndDate" type="text" className={'form-control' + (errors.nominationEndDate && touched.nominationEndDate ? ' is-invalid' : '')} />
                                    <ErrorMessage name="nominationEndDate" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="row">&nbsp;</div>
                            <div className="row">
                            <div className="form-group text-end" > 
                                <Link disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm "></span>}
                                    Save
                                </Link>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <Link to="#" onClick={(e) => handleDelete(id)} className="btn btn-danger">Delete</Link>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <Link to={'/training/editList'} className="btn btn-light mr-1">Cancel</Link>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                            </div>
                            </div>
                            </>
                        </Form>                   
                );
            }}
        </Formik>
        </div>
    </div>
</div>
    );
}

export { EditTraining };