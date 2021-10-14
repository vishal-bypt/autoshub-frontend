import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import { accountService, alertService, trainingService } from '../../services';

function EditTraining({ history, match }) {
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


        // var r = confirm("Are you sure you want to delete this records?");
        // if (r == true) {
        //     trainingService.delete(id).then((data) => {
        //         alertService.success(data.message, { keepAfterRouteChange: true });
        //         history.push("/training/editList");
        //     });

        // } else {
        //     //alertService.success(data.message, { keepAfterRouteChange: true });
        //     //history.goBack();
        // }

        // confirmAlert({
        // 	customUI: ({ onClose }) => {
        // 		return (
        // 			<div className='custom-ui'>
        // 				<div className="exclamation"><i className="fa fa-trash" aria-hidden="true"></i></div>
        // 				<h3>Delete customer confirmation</h3>
        // 				<p>Are you sure want to delete this customer?</p>
        // 				<button onClick={onClose}>Cancel</button>
        // 				<button onClick={() => {
        // 					this.onClickRemove(index, track_id)
        // 					onClose()
        // 				}}>Delete</button>
        // 			</div>
        // 		)
        // 	}
        // });
        console.log("API call is pending");
    }

    return (
        <div className="new-form_white">
            <div className="img_bx_white"></div>
            <div className="new-form-height p-4 extra-padding" >
                {/* <div className="container">
                    <h1 >RFP</h1>
                </div> */}
                <div className="back-btn-div">
                    <div className="btn-width-div-rfp">
                        <Link to="." onClick={() => { history.goBack(); }} className="back-btn "><ArrowBackIcon className="mr-1" />Back</Link>
                    </div>
                </div>
                <div className="container">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                /* useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        trainingService.getById(id).then(user => {
                            const fields = ['trainingName', 'trainingType', 'trainingStartDate', 'trainingEndDate', 'trainingPrequisites', 'nominationEndDate'];
                            fields.forEach(field => setFieldValue(field, user[field], false));
                        });
                    }
                }, []); */

                return (
                    <div className="container"  >
                        <Form>
                            {/*  <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1> */}
                            <div className="formSection">

                            <h1 className="blue-header" style={{textAlign:"center"}}>Edit Training</h1>
                            <div className="form-row mt-5">
                                <div className="form-group col-6">
                                    <label>Training Name</label>
                                    <Field name="trainingName" type="text" className={'form-control' + (errors.trainingName && touched.trainingName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="trainingName" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-6">
                                    <label>Training Type</label>
                                    <Field name="trainingType" type="text" className={'form-control' + (errors.trainingType && touched.trainingType ? ' is-invalid' : '')} />
                                    <ErrorMessage name="trainingType" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
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
                            <div className="form-row">
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
                            <div className="form-group" style={{display:"flex",justifyContent: "end"}}> 
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <Link to="#" onClick={(e) => handleDelete(id)} className="btn del-button">Delete</Link>
                                <Link to={'/training/editList'} className="btn assign-button">Cancel</Link>
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

export { EditTraining };