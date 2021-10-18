import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, FastField, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { rfcService, alertService, accountService } from '../../services';
import CustomSelect from '../../components/CustomSelect';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import Swal from 'sweetalert2'
import Breadcrumbs from "../../components/Common/Breadcrumb"


function AddEditPage({ history, match }) {
    const user = accountService.userValue;
    const { id } = match.params;
    const [countries, setCountries] = useState(null);
    const [geo, setGeo] = useState(null);
    const [geoOptions, setGeoOptions] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const isAddMode = !id;
    var nowY = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var beforeMonth = Number(currentMonth) - 3;
    if (beforeMonth < 10) {
        beforeMonth = "0" + beforeMonth;
    }
    var today = new Date();
    var date = getCurrentDate('-');
    var before3Month = nowY + '-' + beforeMonth + '-' + '01';
    var nextMonthDate = nowY + '-' + (Number(currentMonth) + 1) + '-' + '01';
    let locationData = [];
    let geoData = [];

    const [editedUser, setEditedUser] = useState(null);
    useEffect(() => {
        rfcService.getCountries().then(x => {

            let location = Object.keys(x.Location);
            locationData = [];
            location.map((country) => {
                locationData.push({ label: country, value: country });
            });
            setCountries(locationData);
            setGeo(x.Location);
            x.GEO.map((g) => {
                geoData.push({ label: g, value: g })
            });
            setGeoOptions(geoData);
        });
    }, []);
    let options = [];
    for (var Y = nowY; Y >= 1980; Y--) {
        options.push(Y);
    }
    const initialValues = {
        userId: 0,
        month: '',
        monthCalendar: '',
        year: '',
        responseType: '',
        clientName: '',
        status: '',
        stage: '',
        dealType: '',
        dealTypeStatus: '',
        dealTerm: '',
        rfpReceivedDate: '',
        rfpRespondedDate: '',

        geo: '',
        location: '',
        geoLeads: '',
        deliveryHeads: '',
        btsMoLead: '',
        salesLead: '',
        programLead: '',
        technicalLead: '',
        deliveryLedBy: '',

        automationType: '',
        rpaPlatform: '',
        developmentResource: '',
        supportResource: '',
        totalResource: '',
        currency: '',
        currency2: '',
        margin: '',
        actualCashValue: '',
        totalCashValue: '',
        ebitda: '',

        consideration: '',
        benefits: '',
        serverUsage: '',
        platform: '',
        projectStartDate: '',
        projectEndDate: '',
        developmentDuration: '',
        salesCrmOpportunityId: '',
        saleType: '',
        domain: '',
        competency: '',
        startDate: '',
        endDate: '',
        comments: '',
        customerDemo: ''
    };

    const platformOptions = [
        {
            label: ".Net",
            value: ".Net"
        },
        {
            label: "Blue Prism",
            value: "Blue Prism"
        },
        {
            label: "Automation Anywhere",
            value: "Automation Anywhere"
        },
        {
            label: "UiPath",
            value: "UiPath"
        },
        {
            label: "Power Automate",
            value: "Power Automate"
        },
        {
            label: "Pega",
            value: "Pega"
        }
    ];

    const cloudOptions = [
        {
            label: "",
            value: ""
        },
        {
            label: "Amazon Web Services",
            value: "Amazon Web Services"
        },
        {
            label: "Microsoft Azure",
            value: "Microsoft Azure"
        },
        {
            label: "Google Cloud Platform",
            value: "Google Cloud Platform"
        },
        {
            label: "IBM Cloud",
            value: "IBM Cloud"
        },
        {
            label: "Oracle",
            value: "Oracle"
        },
        {
            label: "Salesforce",
            value: "Salesforce"
        },
        {
            label: "SAP",
            value: "SAP"
        },
        {
            label: "Dell Technologies Cloud",
            value: "Dell Technologies Cloud"
        },

    ];

    const programLead = [
        {
            label: "",
            value: ""
        },
        {
            label: "Sagar Paul",
            value: "Sagar Paul"
        },
        {
            label: "Nelson Francis",
            value: "Nelson Francis"
        },
        {
            label: "Kalpesh Mistry",
            value: "Kalpesh Mistry"
        },
        {
            label: "Noman Sayed",
            value: "Noman Sayed"
        },
        {
            label: "Imran Kothia",
            value: "Imran Kothia"
        },
    ];

    let stageOptionsMain = [
        {
            label: "",
            value: ""
        },
        {
            label: "Proposal Submission",
            value: "Proposal Submission"
        },
        {
            label: "RFP Defense",
            value: "RFP Defense"
        },
        {
            label: "BAFO",
            value: "BAFO"
        },
        {
            label: "Lost",
            value: "Lost"
        },
        {
            label: "Tailwind",
            value: "Tailwind"
        },
        {
            label: "Tailwind-Transformation-Delivery",
            value: "Tailwind-Transformation-Delivery"
        },
        {
            label: "Tailwind-Due Dilligence",
            value: "Tailwind-Due Dilligence"
        },
        {
            label: "Won",
            value: "Won"
        },

    ];

    const currencyIcon = [
        {
            "currency": "USD",
            "icon": "$"
        },
        {
            "currency": "GBP",
            "icon": "£"
        },
        {
            "currency": "INR",
            "icon": "₹"
        }

    ];

    let stageOptions = {
        'Open': [
            "Proposal Submission",
            "RFP Defense",
            "BAFO"
        ],
        'Closed': [
            "Won",
            "Tailwind",
            "Lost"
        ],
        "Work in Progress": [
            "Tailwind-Transformation-Delivery",
            "Tailwind-Due Dilligence"
        ]
    };

    const validationSchema = Yup.object().shape({
        monthCalendar: Yup.string(),
        clientName: Yup.string().required('Client name is mandatory').min(2, 'Client Name should be minimum 2 characters').max(50, 'Client Name should be maximum 50 characters')
            .matches(
                /^[a-zA-Z0-9 _]*$/,
                "Client Name should contains characters and numbers"
            ),
        status: Yup.string().required('Mandatory to select one of the options'),
        geo: Yup.string().required('Geo selection is mandatory'),
        location: Yup.string().required('Location selection is mandatory'),

        technicalLead: Yup.string().max(20, 'Technical Lead should be 20 characters max'),
        margin: Yup.number().required('Margin value update is mandatory').min(-100, 'Margin should be minimum -100').max(100, 'Margin should be maximum 100').test(
            'is-decimal',
            'Margin should be maximum 2 decimal number',
            value => (value + "").match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
        ).test(
            "maxDigitsAfterDecimal",
            "Margin field must have 2 digits after decimal or less",
            (number) => Number.isInteger(number * (10 ** 2))
        ),
        ebitda: Yup.number().required('Ebitda value update is mandatory').min(-100, 'Ebitda should be minimum -100').max(100, 'Ebitda should be maximum 100').test(
            'is-decimal',
            'Ebitda should be maximum 2 decimal number',
            value => (value + "").match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
        ).test(
            "maxDigitsAfterDecimal",
            "Ebitda field must have 2 digits after decimal or less",
            (number) => Number.isInteger(number * (10 ** 2))
        ),
        actualCashValue: Yup.number().required('Actual Cash Value update is mandatory')
            //.min(-100, 'ActualCashValue should be minimum -100').max(100, 'ActualCashValue should be maximum 100')
            .test(
                'is-decimal',
                'ActualCashValue should be maximum 2 decimal number',
                value => (value + "").match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
            ).test(
                "maxDigitsAfterDecimal",
                "ActualCashValue field must have 2 digits after decimal or less",
                (number) => Number.isInteger(number * (10 ** 2))
            ),
        totalCashValue: Yup.number().required('Total Cash Value update is mandatory')
            //   .min(-100, 'TotalCashValue should be minimum -100').max(100, 'TotalCashValue should be maximum 100')
            .test(
                'is-decimal',
                'TotalCashValue should be maximum 2 decimal number',
                value => (value + "").match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
            ).test(
                "maxDigitsAfterDecimal",
                "TotalCashValue field must have 2 digits after decimal or less",
                (number) => Number.isInteger(number * (10 ** 2))
            ),
        developmentResource: Yup.number().required('Cannot be left blank - Resource update is mandatory').integer('Development Resource should be numeric values not decimal.'),
        supportResource: Yup.number().required('Cannot be left blank - Resource update is mandatory').integer('Support Resource should be numeric values not decimal.'),
        totalResource: Yup.number(),
        automationType: Yup.string().required('Cannot be left blank - Automation Type selection is mandatory'),
        rpaPlatform: Yup.string()
            .when('automationType', (automationType) => {
                if (automationType == "RPA") {
                    return Yup.string()
                        .required('Cannot be left blank - RPA Platform selection is mandatory')
                        .typeError('Cannot be left blank - RPA Platform selection is mandatory')
                }
            }),
        currency: Yup.string().required('Box to be highlighted in Red and should not proceed further'),
        // totalPricing: Yup.number().required('Total pricing update is mandatory').test(
        //     "maxDigitsAfterDecimal",
        //     "Total Pricing field must have 2 digits after decimal or less",
        //     (number) => Number.isInteger(number * (10 ** 2))
        // ),

        consideration: Yup.string().required('Stack field selection is mandatory'),
        //   consideration : Yup.string().required('Cannot be left blank - Technology consideration update is mandatory').matches(
        //     /^[a-zA-Z0-9_]*$/,
        //     "Consideration should contains characters and numbers"
        //   ),
        // benefits: Yup.number().required(' Technology Benefits update is mandatory').test(
        //     "maxDigitsAfterDecimal",
        //     "Benefits field must have 2 digits after decimal or less",
        //     (number) => Number.isInteger(number * (10 ** 2))
        // ),
        benefits: Yup.string().required(' Benefit is mandatory').min(2, "Benefit should have minimum 2 characters").max(50, "Benefit should have maximum 50 characters"),
        serverUsage: Yup.string().required('Hosting Infrastructure field is required'),
        //platform: Yup.string().required('Platform filed is required'),
        //( values.stage == "Tailwind" || values.stage == "Tailwind-Transformation-Delivery" || values.stage == "Tailwind-Due Dilligence" || values.stage == "Won" )
        projectStartDate: Yup.date().when('stage', (stage) => {
            if (stage == "Tailwind" || stage == "Tailwind-Transformation-Delivery" || stage == "Tailwind-Due Dilligence" || stage == "Won") {
                return Yup.string()
                    .required('Cannot be left blank -Date Selection is mandatory')
                    .typeError('Cannot be left blank -Date Selection is mandatory')
            }
        }),
        projectEndDate: Yup.date().min(
            Yup.ref('projectStartDate'),
            "Project End Date can't be before Project Start Date"
        ).when('stage', (stage) => {
            if (stage == "Tailwind" || stage == "Tailwind-Transformation-Delivery" || stage == "Tailwind-Due Dilligence" || stage == "Won") {
                return Yup.string()
                    .required('Cannot be left blank -Date Selection is mandatory')
                    .typeError('Cannot be left blank -Date Selection is mandatory')
            }
        }),
        developmentDuration: Yup.number().required('Cannot be left blank - Resource update is mandatory'),
        programLead: Yup.string().required('Program Lead selection is mandatory'),
        deliveryHeads: Yup.string().required('Delivery Head selection is mandatory'),
        btsMoLead: Yup.string().required('BTS / MO Lead selection is mandatory'),
        salesLead: Yup.string().required('Sales Lead selection is mandatory'),
        technicalLead: Yup.string().required('Technical Lead selection is mandatory'),
        deliveryLedBy: Yup.string().required('Its mandatory to select one option'),
        responseType: Yup.string().required('Mandatory to select one of the options'),
        stage: Yup.string().required('Stage parameter cannot be left blank'),
        dealType: Yup.string().required('Selection between Embeded or Standalone is Mandatory'),
        dealTypeStatus: Yup.string().required('Selection of secondry option is Mandatory'),
        dealTerm: Yup.string().required('Deal Term selection is mandatory').matches(
            /^[a-zA-Z0-9 ._]*$/,
            "DealTerm should contains characters and numbers"
        ),
        rfpReceivedDate: Yup.date().required('Cannot be left blank -RFP received date selection is mandatory')
        .when("startDate",
                    (startDate, yup) => startDate && yup.min(startDate, "Received Date should greater than Start Date"))
        ,
        rfpRespondedDate: Yup.date().required('Responded date selection is mandatory').min(
            Yup.ref('rfpReceivedDate'),
            "Response Date can't be before Received Date"
        ),
        comments: Yup.string().min(2, "Deal Brief should be maximum 100 characters").max(100, "Deal Brief should be maximum 100 characters")
            .matches(
                /^[a-zA-Z0-9 _]*$/,
                "Deal Brief should contains characters and numbers"
            ),
        salesCrmOpportunityId: Yup.number().test(
            "maxDigitsAfterDecimal",
            "Sales Crm Opportunity Id field must have 6 digits",
            (number) => { 
                //let num = number.toString();
                let num = Math.ceil(Math.log(number + 1) / Math.LN10);
                return num === 6
            }
        ),
        saleType: Yup.string().required("Mandatory to select one of the options"),
        domain: Yup.string().required("Mandatory to select one of the options"),
        competency: Yup.string().required("Mandatory to select one of the options"),
        customerDemo: Yup.string().required("Mandatory to select one of the options"),
        startDate: Yup.date().required("Cannot be left blank - Start date selection is mandatory"),
        endDate: Yup.date().required("End date selection is mandatory"),
        // title: Yup.string()
        //     .required('Title is required'),
        // firstName: Yup.string()
        //     .required('First Name is required'),
        // lastName: Yup.string()
        //     .required('Last Name is required'),
        // email: Yup.string()
        //     .email('Email is invalid')
        //     .required('Email is required'),
        // role: Yup.string()
        //     .required('Role is required'),
        // password: Yup.string()
        //     .concat(isAddMode ? Yup.string().required('Password is required') : null)
        //     .min(6, 'Password must be at least 6 characters'),
        // confirmPassword: Yup.string()
        //     .when('password', (password, schema) => {
        //         if (password) return schema.required('Confirm Password is required');
        //     })
        //     .oneOf([Yup.ref('password')], 'Passwords must match')
    });   

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                rfcService.delete(id).then((data) => {
                    alertService.success(data.message, { keepAfterRouteChange: true });
                    history.push("/rfp");
                });
              Swal.fire(
                'Deleted!',
                'Your record has been deleted successfully.',
                'success'
              )
            }
          })        
    }

    useEffect(() => {                                
        if (!isAddMode) {            
            rfcService.getById(id).then(user => {
                if (currencySymbol == null) {
                    if (user.currency == "USD") {

                        setCurrencySymbol("$");

                    } else if (user.currency == "GBP") {
                        setCurrencySymbol("£");
                    } else {
                        setCurrencySymbol("₹");
                    }
                }
                setEditedUser(user);
                const fields = ['monthCalendar', 'responseType', 'clientName', 'status', 'stage', 'dealType', 'dealTypeStatus', 'dealTerm', 'rfpReceivedDate', 'rfpRespondedDate', 'geo', 'location', 'geoLeads', 'deliveryHeads', 'btsMoLead', 'salesLead', 'programLead', 'technicalLead', 'deliveryLedBy', 'automationType', 'rpaPlatform', 'developmentResource', 'supportResource', 'totalResource', 'currency', 'margin', 'totalCashValue', 'ebitda', 'consideration', 'benefits', 'serverUsage', 'platform', 'projectStartDate', 'projectEndDate', 'developmentDuration', 'comments', 'actualCashValue', 'salesCrmOpportunityId', 'saleType', 'domain', 'competency', 'customerDemo', 'startDate', 'endDate', 'ageing', 'cloudOffering'];
                fields.map((field) => {
                    Formik.setFieldValue(field, user[field], false)
                })  
            });
        }
    }, []);

    function onSubmit(fields, { setStatus, setSubmitting }) {
        const platform = typeof fields?.platform != 'string' ? fields?.platform?.join() : fields?.platform;
        const consideration = typeof fields?.consideration != 'string' ? fields?.consideration?.join() : fields?.consideration;
        let data = { ...fields, monthCalendar: fields.monthCalendar, consideration: consideration, platform: platform, geoLeads: '0' }
        setStatus();
        if (isAddMode) {
            data.userId = user.id;
            create(data, setSubmitting);
        } else {
            if (editedUser && editedUser.userId != 0) {
                data.userId = editedUser.userId;
            }
            else {
                data.userId = user.id;
            }
            update(id, data, setSubmitting);
        }
    }

    function create(fields, setSubmitting) {
        rfcService.create(fields)
            .then((data) => {
                alertService.success('Success', { keepAfterRouteChange: true });
                history.push('/rfp');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function update(id, fields, setSubmitting) {
        rfcService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('/rfp');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        
        <div className="page-content">           
            <div className="container-fluid" >               
                <div className="row">
                    <div className="col-md-12 text-end">
                        <Link to="." onClick={() => { history.goBack(); }} className="btn btn-warning"><ArrowBackIcon className="mr-1" />Back</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <Breadcrumbs title="Forms" breadcrumbItem="PROJECT DETAILS" />
                        </div>
                        <Formik  initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
                        onValidationError={errorValues => {                            
                        }}
                    >
                        {({ errors, values, touched, isSubmitting, setFieldValue, handleBlur, setTouched }) => {
                            return (   
                        <div className="p-4 card-body">
                        
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Sales CRM Opportunity ID</label>
                                    <FastField  name="salesCrmOpportunityId" type="number" className={'form-control' + (errors.salesCrmOpportunityId && touched.salesCrmOpportunityId ? ' is-invalid' : '')} 
                                        onChange={e => {
                                            let  salesCrmOpportunityId = e.target.value;
                                            if(salesCrmOpportunityId.toString().length < 7) {
                                            setFieldValue('salesCrmOpportunityId', salesCrmOpportunityId);
                                            }           
                                        }}
                                    />
                                    <ErrorMessage name="salesCrmOpportunityId" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Sale Type</label>
                                    <FastField 
                                        className={(errors.saleType && touched.saleType ? ' is-invalid' : '')}
                                        name="saleType"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: "",
                                                value: ""
                                            },
                                            {
                                                label: "Existing Expansion",
                                                value: "Existing Expansion"
                                            },
                                            {
                                                label: "Existing New",
                                                value: "Existing New"
                                            },
                                            {
                                                label: "Net New",
                                                value: "Net New"
                                            },
                                            {
                                                label: "To Be Updated",
                                                value: "To Be Updated"
                                            },
                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    //placeholder="Select Automation Type"
                                    />                                                
                                    <ErrorMessage name="saleType" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Response Type</label>
                                    <FastField 
                                        className={ (errors.responseType && touched.responseType ? ' is-invalid' : '')}
                                        name="responseType"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: "",
                                                value: ""
                                            },
                                            {
                                                label: "Proactive Pitch",
                                                value: "Proactive Pitch"
                                            },
                                            {
                                                label: "RFP",
                                                value: "RFP"
                                            },
                                            {
                                                label: "RFQ",
                                                value: "RFQ"
                                            },
                                            {
                                                label: "RFI",
                                                value: "RFI"
                                            },
                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    
                                    />                                                
                                    <ErrorMessage name="responseType" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">                                    
                                    <label>Client Name</label>
                                    <FastField  name="clientName" type="text" className={'form-control' + (errors.clientName && touched.clientName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="clientName" component="div" className="invalid-feedback" />
                                </div> 
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-lable">Domain</label>
                                    <FastField 
                                        className={(errors.domain && touched.domain ? ' is-invalid' : '')}
                                        name="domain"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: "",
                                                value: ""
                                            },
                                            {
                                                label: "BFSI",
                                                value: "BFSI"
                                            },
                                            {
                                                label: "CME",
                                                value: "CME"
                                            },
                                            {
                                                label: "TTL",
                                                value: "TTL"
                                            },
                                            {
                                                label: "Retail",
                                                value: "Retail"
                                            },
                                            {
                                                label: "Energy & Utilities",
                                                value: "Energy & Utilities"
                                            },
                                            {
                                                label: "HLS",
                                                value: "HLS"
                                            },
                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    //placeholder="Select Automation Type"
                                    />                                                
                                    <ErrorMessage name="domain" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Competency</label>
                                    <FastField 
                                        className={(errors.competency && touched.competency ? ' is-invalid' : '')}
                                        name="competency"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: " ",
                                                value: ""
                                            },
                                            {
                                                label: "BPS",
                                                value: "BPS"
                                            },
                                            {
                                                label: "IT",
                                                value: "IT"
                                            },
                                            {
                                                label: "BPS+IT",
                                                value: "BPS+IT"
                                            },
                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    //placeholder="Select Automation Type"
                                    />
                                    <ErrorMessage name="competency" component="div" className="invalid-feedback" /> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Deal Type</label>
                                    <FastField 
                                        className={(errors.dealType && touched.dealType ? ' is-invalid' : '')}
                                        name="dealType"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: " ",
                                                value: ""
                                            },
                                            {
                                                label: "Embeded",
                                                value: "Embeded"
                                            },
                                            {
                                                label: "Standalone",
                                                value: "Standalone"
                                            },
                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    //placeholder="Select Automation Type"
                                    />
                                    <ErrorMessage name="dealType" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">
                                    <label>Deal Type Status</label>
                                    <FastField 
                                        className={(errors.dealTypeStatus && touched.dealTypeStatus ? ' is-invalid' : '')}
                                        name="dealTypeStatus"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: " ",
                                                value: ""
                                            },
                                            {
                                                label: "CC With Transformation",
                                                value: "CC With Transformation"
                                            },
                                            {
                                                label: "Transformation Only",
                                                value: "Transformation Only"
                                            },
                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    //placeholder="Select Automation Type"
                                    />                                                
                                    <ErrorMessage name="dealTypeStatus" component="div" className="invalid-feedback" />
                                </div>
                            </div>  
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Deal Term <span className="small">( In Years )</span></label>
                                    <FastField 
                                        className={(errors.dealTerm && touched.dealTerm ? ' is-invalid' : '')}
                                        name="dealTerm"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: " ",
                                                value: ""
                                            },
                                            {
                                                label: "1",
                                                value: "1"
                                            },
                                            {
                                                label: "2",
                                                value: "2"
                                            },
                                            {
                                                label: "3",
                                                value: "3"
                                            },
                                            {
                                                label: "4",
                                                value: "4"
                                            },
                                            {
                                                label: "5",
                                                value: "5"
                                            },
                                            {
                                                label: "6",
                                                value: "6"
                                            },
                                            {
                                                label: "7",
                                                value: "7"
                                            },

                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    />                                                
                                    <ErrorMessage name="dealTerm" component="div" className="invalid-feedback" />
                                </div>  
                                <div className="col-md-6">                                    
                                    <label>Deal Brief</label>
                                    <FastField  as="textarea" className="form-control" id="comments" name="comments"></FastField>
                                    <ErrorMessage name="comments" component="div" className="invalid-feedback" />                                   
                                </div>
                            </div>                            
                        </div>   
                                                                 
                            );
                        }}
                    </Formik>
                    </div>
                </div>
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <Breadcrumbs title="Forms" breadcrumbItem="SCHEDULE" />
                        </div>
                        <Formik  initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
                        onValidationError={errorValues => {                            
                        }}
                    >
                        {({ errors, values, touched, isSubmitting, setFieldValue, handleBlur, setTouched }) => {
                            return (   
                        <div className="p-4 card-body">                        
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Start Date</label>
                                    <Field  name="startDate" data-date-format="DD MMMM YYYY" placeholder="" min={before3Month} max={date} type="date" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                                    <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">
                                    <label>Received Date</label>
                                    <Field  name="rfpReceivedDate" type="date" min={before3Month} max={date} className={'form-control' + (errors.rfpReceivedDate && touched.rfpReceivedDate ? ' is-invalid' : '')} 
                                    onChange={e => {
                                        // call the built-in handleBur
                                        values.rfpReceivedDate = e.target.value;
                                        setFieldValue('monthCalendar', e.target.value);
                                        
                                    }}
                                    />
                                    <ErrorMessage name="rfpReceivedDate" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Responded Date</label>
                                    <Field  name="rfpRespondedDate" type="date" min={values.rfpReceivedDate} max={date} className={'form-control' + (errors.rfpRespondedDate && touched.rfpRespondedDate ? ' is-invalid' : '')} 
                                    onChange={e => {
                                        // call the built-in handleBur
                                        values.rfpRespondedDate = e.target.value;                                                    
                                        if(user.role == "Admin"){                                                       
                                            if (values.status == "Open" && e.target.value != "") {
                                                var new_date = moment(values.rfpRespondedDate, "YYYY-MM-DD").add(60, 'days');
                                                const dateA = moment(values.endDate, 'YYYY-MM-DD');
                                                const dateB = moment(new Date(), 'YYYY-MM-DD');
                                                const diffDays = dateB.diff(dateA, 'days');
                                                const finalDays = diffDays + 60;
                                                setFieldValue('ageing', finalDays > 0 ? finalDays : "");
                                            } else {
                                                setFieldValue('ageing', '');
                                            }
                                        }                                        
                                    }}
                                    />
                                    <ErrorMessage name="rfpRespondedDate" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">                                    
                                   <label>End Date</label>
                                    <Field  name="endDate" type="date" min={values.rfpRespondedDate} className={'form-control' + (errors.endDate && touched.endDate ? ' is-invalid' : '')}
                                        onChange={e => {
                                            // call the built-in handleBur
                                            values.endDate = e.target.value;
                                            if (user.role == "User" && values.status == "Open" && e.target.value != "") {
                                                values.endDate = e.target.value;
                                                const dateA = moment(values.endDate, 'YYYY-MM-DD');
                                                const dateB = moment(new Date(), 'YYYY-MM-DD');
                                                const diffDays = dateB.diff(dateA, 'days');
                                                setFieldValue('ageing', diffDays > 0 ? diffDays : "");
                                            } else {
                                                setFieldValue('ageing', '');
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="endDate" component="div" className="invalid-feedback" />
                                </div> 
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Month</label>                                                
                                    <Field  name="monthCalendar" type="date" readOnly value={values.rfpReceivedDate} min={before3Month} max={nextMonthDate} className={'form-control' + (errors.monthCalendar && touched.monthCalendar ? ' is-invalid' : '')} 
                                    />
                                    <ErrorMessage name="monthCalendar" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">
                                    <label>Status</label>
                                    <FastField 
                                        className={(errors.status && touched.status ? ' is-invalid' : '')}
                                        name="status"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: " ",
                                                value: ""
                                            },
                                            {
                                                label: "Open",
                                                value: "Open"
                                            },
                                            {
                                                label: "Closed",
                                                value: "Closed"
                                            },
                                            {
                                                label: "Work in Progress",
                                                value: "Work in Progress"
                                            },
                                        ]}
                                        component={CustomSelect}
                                        onChangeValue={value => {                                                        
                                            values.status = value;
                                            if(user.role == "Admin"){
                                                if (value != "Open") {
                                                    setFieldValue('ageing', '');
                                                }
                                                if (values.status == "Open") {
                                                    if (values.rfpRespondedDate) { console.log("rfpRespondedDate", values.rfpRespondedDate);

                                                        var dateA = moment(values.rfpRespondedDate).add(60, 'd');                                                                    
                                                        var newDateA = moment(dateA).format('YYYY-MM-DD');
                                                        const dateB = moment(new Date(), 'YYYY-MM-DD');
                                                        console.log("dateA", newDateA);
                                                        console.log("Curr dateB", moment(dateB).format('YYYY-MM-DD'));
                                                        const finalDays = dateB.diff(dateA, 'days');
                                                        setFieldValue('ageing', finalDays > 0 ? finalDays : ''); 
                                                    }
                                                }
                                            }                                                        

                                            let stageArr = [];                                                        
                                            stageOptions[values.status].forEach((stage) => {
                                                stageArr.push({ label: stage, value: stage });
                                            });
                                            stageOptionsMain = stageArr;
                                            setFieldValue('stage', stageArr, false)
                                        }}
                                    />
                                    <ErrorMessage name="status" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Stage</label>
                                    <FastField 
                                        className={(errors.stage && touched.stage ? ' is-invalid' : '')}
                                        name="stage"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={stageOptionsMain}
                                        component={CustomSelect}
                                        placeholder=""
                                    />
                                    <ErrorMessage name="stage" component="div" className="invalid-feedback" />
                                </div>
                                <div className="col-md-6">
                                    <label>Customer Demo <span className="small"></span></label>
                                    <FastField 
                                        className={(errors.customerDemo && touched.customerDemo ? ' is-invalid' : '')}
                                        name="customerDemo"
                                        onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                        options={[
                                            {
                                                label: " ",
                                                value: ""
                                            },
                                            {
                                                label: "Yes",
                                                value: "Yes"
                                            },
                                            {
                                                label: "No",
                                                value: "No"
                                            },
                                            {
                                                label: "Not Applicable",
                                                value: "Not Applicable"
                                            },

                                        ]}
                                        placeholder=""
                                        component={CustomSelect}
                                        isMulti={false}
                                    /> 
                                    <ErrorMessage name="customerDemo" component="div" className="invalid-feedback" />
                                </div>                               
                            </div>                              
                        </div>
                        
                        

                                            
                                
                                    
                                                
                                            
                                       
                                            /* 
                                            
                                            
                                            
                                            
                                            
                                                                                      
                                        </div>
                                    </div>

                                    <div className="formSection">
                                        <div className="pt-4 blue-header"><h6>SCHEDULE</h6></div>
                                        <div className="form-row" id="firstNewSection">
                                        <div className="form-group col-4">
                                                <label>Start Date</label>
                                                <Field  name="startDate" data-date-format="DD MMMM YYYY" placeholder="" min={before3Month} max={date} type="date" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                                                <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                                            </div>
                                           
                                            <div className="form-group col-4">
                                                <label>Received Date</label>
                                                <Field  name="rfpReceivedDate" type="date" min={before3Month} max={date} className={'form-control' + (errors.rfpReceivedDate && touched.rfpReceivedDate ? ' is-invalid' : '')} 
                                                onChange={e => {
                                                    // call the built-in handleBur
                                                    values.rfpReceivedDate = e.target.value;
                                                    setFieldValue('monthCalendar', e.target.value);
                                                    
                                                }}
                                                />
                                                <ErrorMessage name="rfpReceivedDate" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Responded Date</label>
                                                <Field  name="rfpRespondedDate" type="date" min={values.rfpReceivedDate} max={date} className={'form-control' + (errors.rfpRespondedDate && touched.rfpRespondedDate ? ' is-invalid' : '')} 
                                                onChange={e => {
                                                    // call the built-in handleBur
                                                    values.rfpRespondedDate = e.target.value;                                                    
                                                    if(user.role == "Admin"){                                                       
                                                        if (values.status == "Open" && e.target.value != "") {
                                                            var new_date = moment(values.rfpRespondedDate, "YYYY-MM-DD").add(60, 'days');
                                                            const dateA = moment(values.endDate, 'YYYY-MM-DD');
                                                            const dateB = moment(new Date(), 'YYYY-MM-DD');
                                                            const diffDays = dateB.diff(dateA, 'days');
                                                            const finalDays = diffDays + 60;
                                                            setFieldValue('ageing', finalDays > 0 ? finalDays : "");
                                                        } else {
                                                            setFieldValue('ageing', '');
                                                        }
                                                    }
                                                    
                                                }}
                                                />
                                                <ErrorMessage name="rfpRespondedDate" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                
                                            </div>
                                            <div className="form-group col-4">
                                                
                                            </div>
                                            <div className="form-group col-4">
                                                
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Stage</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.stage && touched.stage ? ' is-invalid' : '')}
                                                    name="stage"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={stageOptionsMain}
                                                    component={CustomSelect}
                                                    placeholder=""
                                                />
                                                <ErrorMessage name="stage" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                
                                            </div>   
                                        </div>
                                    </div>

                                    <div className="formSection">
                                        <div className="pt-4 blue-header"><h6>GEO & OWNER</h6></div>
                                        <div className="form-row" id="secondSection">
                                        <div className="form-group col-4">
                                                <label>Sales Lead</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.salesLead && touched.salesLead ? ' is-invalid' : '')}
                                                    name="salesLead"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={[
                                                        {
                                                            label: " ",
                                                            value: ""
                                                        },
                                                        {
                                                            label: "Taranvir Jouhal",
                                                            value: "Taranvir Jouhal"
                                                        },
                                                        {
                                                            label: "Bhuvan Jain",
                                                            value: "Bhuvan Jain"
                                                        },
                                                        {
                                                            label: "Romy Sukumaran",
                                                            value: "Romy Sukumaran"
                                                        },
                                                        {
                                                            label: "Alok Anand",
                                                            value: "Alok Anand"
                                                        },
                                                        {
                                                            label: "Amit Dhingra",
                                                            value: "Amit Dhingra"
                                                        },
                                                        {
                                                            label: "Amar Akatrai",
                                                            value: "Amar Akatrai"
                                                        },
                                                        {
                                                            label: "Shane D'costa",
                                                            value: "Shane D'costa"
                                                        },
                                                        {
                                                            label: "Abhishek Kumar",
                                                            value: "Abhishek Kumar"
                                                        },
                                                    ]}
                                                    placeholder=""
                                                    component={CustomSelect}
                                                //placeholder="Select multi platform"
                                                />                                               
                                                <ErrorMessage name="salesLead" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>BTS / MO Lead</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.btsMoLead && touched.btsMoLead ? ' is-invalid' : '')}
                                                    name="btsMoLead"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={[
                                                        {
                                                            label: " ",
                                                            value: ""
                                                        },
                                                        {
                                                            label: "Rahul Agarwal",
                                                            value: "Rahul Agarwal"
                                                        },
                                                        {
                                                            label: "Amit Bhalla",
                                                            value: "Amit Bhalla"
                                                        },
                                                        {
                                                            label: "Eshank Bahuguna",
                                                            value: "Eshank Bahuguna"
                                                        },
                                                        {
                                                            label: "Rakesh Ranjan Tiwari",
                                                            value: "Rakesh Ranjan Tiwari"
                                                        },
                                                        {
                                                            label: "Sumit More",
                                                            value: "Sumit More"
                                                        },
                                                        {
                                                            label: "Nikhil Pereira",
                                                            value: "Nikhil Pereira"
                                                        },
                                                        {
                                                            label: "Sachin Vora",
                                                            value: "Sachin Vora"
                                                        },
                                                        {
                                                            label: "Rashmi Jolly",
                                                            value: "Rashmi Jolly"
                                                        },
                                                        {
                                                            label: "Suman Shrivastava",
                                                            value: "Suman Shrivastava"
                                                        },
                                                        {
                                                            label: "Bhavdeep Bhajwa",
                                                            value: "Bhavdeep Bhajwa"
                                                        },
                                                        {
                                                            label: "Subrahmanyan Nandakrishnan",
                                                            value: "Subrahmanyan Nandakrishnan"
                                                        },
                                                    ]}
                                                    component={CustomSelect}
                                                    placeholder=""
                                                />                                                
                                                <ErrorMessage name="btsMoLead" component="div" className="invalid-feedback" />
                                            </div> 
                                            <div className="form-group col-4">
                                                <label>Program Lead</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.programLead && touched.programLead ? ' is-invalid' : '')}
                                                    name="programLead"
                                                    placeholder=""
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={programLead}
                                                    component={CustomSelect}
                                                //placeholder="Select multi platform"
                                                />                                                
                                                <ErrorMessage name="programLead" component="div" className="invalid-feedback" />
                                            </div>  

                                            <div className="form-group col-4">
                                                <label>Technical Lead</label>
                                                <FastField  name="technicalLead" type="text" className={'form-control' + (errors.technicalLead && touched.technicalLead ? ' is-invalid' : '')} />
                                                <ErrorMessage name="technicalLead" component="div" className="invalid-feedback" />
                                            </div> 

                                            <div className="form-group col-4">
                                                <label>Delivery Led By</label>                                               
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.deliveryLedBy && touched.deliveryLedBy ? ' is-invalid' : '')}
                                                    name="deliveryLedBy"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={[
                                                        {
                                                            label: " ",
                                                            value: ""
                                                        },
                                                        {
                                                            label: "Client",
                                                            value: "Client"
                                                        },
                                                        {
                                                            label: "TechM",
                                                            value: "TechM"
                                                        },
                                                    ]}
                                                    placeholder=""
                                                    component={CustomSelect}
                                                    isMulti={false}
                                                //placeholder="Select Automation Type"
                                                />
                                                <ErrorMessage name="deliveryLedBy" component="div" className="invalid-feedback" />
                                            </div>

                                            <div className="form-group col-4">
                                                <label>Delivery Head</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.deliveryHeads && touched.deliveryHeads ? ' is-invalid' : '')}
                                                    name="deliveryHeads"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={[
                                                        {
                                                            label: " ",
                                                            value: ""
                                                        },
                                                        {
                                                            label: "Amit Sikdar",
                                                            value: "Amit Sikdar"
                                                        },
                                                        {
                                                            label: "Miteshkumar Mistry",
                                                            value: "Miteshkumar Mistry"
                                                        },
                                                    ]}
                                                    placeholder=""
                                                    component={CustomSelect}
                                                //placeholder="Select multi platform"
                                                />                                               
                                                <ErrorMessage name="deliveryHeads" component="div" className="invalid-feedback" />
                                            </div>
                                            
                                            <div className="form-group col-4">
                                                <label>Location</label>                                                
                                                <Field 
                                                    className={'form-control custom-form-control' + (errors.location && touched.location ? ' is-invalid' : '')}
                                                    name="location"
                                                    options={countries}
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    component={CustomSelect}
                                                    //placeholder="Select Location"
                                                    onChangeValue={value => {                                                        
                                                        values.location = value;
                                                        values.geo = null;                                                        
                                                        let locArr = [];                                                        
                                                        geo[values.location].forEach((geoRow) => {
                                                            locArr.push({ label: geoRow, value: geoRow });
                                                        });                                                       
                                                        setGeoOptions(locArr);
                                                        setFieldValue('geo', geo[values.location][0], false)                                                        
                                                    }}
                                                />
                                                <ErrorMessage name="location" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>GEO</label>                                                
                                                <Field 
                                                    className={'form-control custom-form-control' + (errors.geo && touched.geo ? ' is-invalid' : '')}
                                                    name="geo"
                                                    placeholder=""
                                                    options={geoOptions}
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    component={CustomSelect}
                                                //placeholder="Select Geo"
                                                />
                                                <ErrorMessage name="geo" component="div" className="invalid-feedback" />
                                            </div>
                                         </div>
                                    </div>
                                    <div className="formSection">
                                        <div className="pt-4 blue-header"><h6>TECHNOLOGY</h6></div>
                                        <div className="form-row" id="fourSection">
                                        <div className="form-group col-4">
                                                <label>Automation Type</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.automationType && touched.automationType ? ' is-invalid' : '')}
                                                    name="automationType"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={[
                                                        {
                                                            label: " ",
                                                            value: ""
                                                        },
                                                        {
                                                            label: "RPA",
                                                            value: "RPA"
                                                        },
                                                        {
                                                            label: "Point Solutions",
                                                            value: "Point Solutions"
                                                        },
                                                        {
                                                            label: "Conversational AI",
                                                            value: "Conversational AI"
                                                        },
                                                    ]}
                                                    placeholder=""
                                                    component={CustomSelect}
                                                    isMulti={false}
                                                //placeholder="Select Automation Type"
                                                />
                                                <ErrorMessage name="automationType" component="div" className="invalid-feedback" />
                                            </div>
                                            {values.automationType == "RPA" && <div className="form-group col-4">
                                                <label>RPA Partner</label>
                                                <FastField  name="rpaPlatform" as="select" className={'form-control' + (errors.rpaPlatform && touched.rpaPlatform ? ' is-invalid' : '')}>
                                                    <option value=""></option>
                                                    <option value="uiPrism">UiPath</option>
                                                    <option value="bluePrism">Blue Prism</option>
                                                    <option value="automationAnywhere">Automation Anywhere</option>
                                                    <option value="pega">Pega</option>
                                                    <option value="powerAutomate">Power Automate</option>
                                                </FastField>
                                                <ErrorMessage name="rpaPlatform" component="div" className="invalid-feedback" />
                                            </div>
                                            }
                                            {values.automationType == "Point Solutions" && <div className="form-group col-4">
                                                <label>Solution Services</label>
                                                <FastField  name="rpaPlatform" as="select" className={'form-control' + (errors.rpaPlatform && touched.rpaPlatform ? ' is-invalid' : '')}>
                                                    <option value=""></option>
                                                    <option value="Genie">Genie</option>
                                                    <option value="xPerio">xPerio</option>
                                                    <option value="Unified Desktop">Unified Desktop</option>
                                                    <option value="Case Management Tool">Case Management Tool</option>
                                                    <option value="UNO">UNO</option>
                                                    <option value="EVO Logger">EVO Logger</option>
                                                    <option value="Decision Tree Management System">Decision Tree Management System</option>
                                                    <option value="Application Tracking Tool">Application Tracking Tool</option>
                                                    <option value="Knowledge Management Portal">Knowledge Management Portal</option>
                                                </FastField>
                                                <ErrorMessage name="rpaPlatform" component="div" className="invalid-feedback" />
                                            </div>
                                            }
                                            {values.automationType == "Conversational AI" && <div className="form-group col-4">
                                                <label>AI Partner</label>
                                                <FastField  name="rpaPlatform" as="select" className={'form-control' + (errors.rpaPlatform && touched.rpaPlatform ? ' is-invalid' : '')}>
                                                    <option value=""></option>
                                                    <option value="M.ai.a">M.ai.a</option>
                                                    <option value="ImPerson">ImPerson</option>
                                                    <option value="Bold360">Bold360</option>
                                                    <option value="Dialogflow">Dialogflow</option>
                                                    <option value="Botsify">Botsify</option>
                                                    <option value="Mitsuku – Pandorabot">Mitsuku – Pandorabot</option>
                                                    <option value="Google -LaMDA">Google -LaMDA</option>
                                                </FastField>
                                                <ErrorMessage name="rpaPlatform" component="div" className="invalid-feedback" />
                                            </div>
                                            }
                                            
                                            <div className="form-group col-4">
                                                <label>Stack</label>
                                                {/* <Field name="consideration" type="text" className={'form-control' + (errors.consideration && touched.consideration ? ' is-invalid' : '')} /> 
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.consideration && touched.consideration ? ' is-invalid' : '')}
                                                    name="consideration"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={platformOptions}
                                                    component={CustomSelect}
                                                    isMulti={true}
                                                    placeholder=""
                                                    onChangeValue={value => {
                                                        if (value == "") {
                                                           return;     
                                                        } 

                                                    }}
                                                />
                                                <ErrorMessage name="consideration" component="div" className="invalid-feedback" />
                                            </div>
                                            
                                            <div className="form-group col-4">
                                                <label>Hosting Infrastructure</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.serverUsage && touched.serverUsage ? ' is-invalid' : '')}
                                                    name="serverUsage"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={[
                                                        {
                                                            label: " ",
                                                            value: ""
                                                        },
                                                        {
                                                            label: "Cloud",
                                                            value: "Cloud"
                                                        },
                                                        {
                                                            label: "On Prem",
                                                            value: "On Prem"
                                                        },
                                                        {
                                                            label: "Provided by Customer",
                                                            value: "Provided by Customer"
                                                        },
                                                    ]}
                                                    placeholder=""
                                                    component={CustomSelect}
                                                    isMulti={false}
                                                //placeholder="Select Automation Type"
                                                />
                                                <ErrorMessage name="serverUsage" component="div" className="invalid-feedback" />
                                            </div>
                                            {values.serverUsage == "Cloud" && <div className="form-group col-4">
                                                <label>Cloud Partner</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.cloudOffering && touched.cloudOffering ? ' is-invalid' : '')}
                                                    name="cloudOffering"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={cloudOptions}
                                                    placeholder=""
                                                    component={CustomSelect}                                                
                                                />                                                
                                                <ErrorMessage name="cloudOffering" component="div" className="invalid-feedback" />
                                            </div>
                                            }                                            
                                        </div>
                                    </div>

                                    <div className="formSection">
                                        <div className="pt-4 blue-header"><h6>AUTOMATION PRICING</h6></div>
                                        <div className="form-row" id="thirdSection">
                                        <div className="form-group col-4">
                                                <label>Currency</label>
                                                <FastField 
                                                    className={'form-control custom-form-control' + (errors.currency && touched.currency ? ' is-invalid' : '')}
                                                    name="currency"
                                                    onBlurValue={(field) => {  setTouched({...touched, [field] : true}); }}
                                                    options={[
                                                        {
                                                            label: " ",
                                                            value: ""
                                                        },
                                                        {
                                                            label: "USD",
                                                            value: "USD"
                                                        },
                                                        {
                                                            label: "GBP",
                                                            value: "GBP"
                                                        },
                                                        {
                                                            label: "INR",
                                                            value: "INR"
                                                        },
                                                    ]}
                                                    placeholder=""
                                                    component={CustomSelect}
                                                    isMulti={false}
                                                    onChangeValue={value => {
                                                        if (value) {
                                                            var newArray = currencyIcon.filter(function (el) {
                                                                return el.currency == value;
                                                            });
                                                            setCurrencySymbol(newArray[0].icon);
                                                        } else {
                                                            setCurrencySymbol(null);
                                                        }

                                                    }}
                                                //placeholder="Select Automation Type"
                                                />                                                
                                                <ErrorMessage name="currency" component="div" className="invalid-feedback" />
                                            </div>
                                            
                                            <div className="form-group col-4">
                                                <label>Margin % <span className="small"></span></label>                                                
                                                <FastField  name="margin" type="number" placeholder="" step="0.01" className={'form-control' + (errors.margin && touched.margin ? ' is-invalid' : '')} />
                                                <ErrorMessage name="margin" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>EBITDA % <span className="small"></span></label>
                                                <FastField  name="ebitda" type="number" placeholder="" step="0.01" className={'form-control' + (errors.ebitda && touched.ebitda ? ' is-invalid' : '')} />                                                
                                                <ErrorMessage name="ebitda" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Actual Cash Value <span className="small"></span></label>
                                                <div className="row">
                                                    <div className="input-group-prepend col-2">
                                                        <span className="input-group-text">{currencySymbol}</span>
                                                    </div>
                                                    <FastField  name="actualCashValue" type="number" className={'col-9 form-control' + (errors.actualCashValue && touched.actualCashValue ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="actualCashValue" component="div" className="col invalid-feedback" /> </div>
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Total Cash Value <span className="small"></span></label>
                                                <div className="row">
                                                    <div className="input-group-prepend col-2">
                                                        <span className="input-group-text">{currencySymbol}</span>
                                                    </div>
                                                    <FastField  name="totalCashValue" type="number" className={'col-9 form-control' + (errors.totalCashValue && touched.totalCashValue ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="totalCashValue" component="div" className="invalid-feedback" />
                                                </div>
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Benefit<span className="small"></span></label>
                                                <FastField  name="benefits" placeholder="" type="text" className={'form-control' + (errors.benefits && touched.benefits ? ' is-invalid' : '')} />
                                                <ErrorMessage name="benefits" component="div" className="invalid-feedback" />
                                                    </div>  
                                                </div>                                                
                                           </div>
                                            
                                           <div className="formSection">       
                                            <div className="fifthSection">
                                        <div className="pt-4 blue-header"><h6>RESOURCES</h6></div>
                                        <div className="form-row" id="thirdSection">
                                        <div className="form-group col-4">
                                                <label>Development Resources</label>
                                                <FastField  name="developmentResource" type="number" className={'form-control' + (errors.developmentResource && touched.developmentResource ? ' is-invalid' : '')} />
                                                <ErrorMessage name="developmentResource" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Support Resources</label>
                                                <FastField  name="supportResource" type="number" className={'form-control' + (errors.supportResource && touched.supportResource ? ' is-invalid' : '')}
                                                    onBlur={e => {                                                       
                                                        setTouched({...touched, [e.target.name] : true});
                                                        setFieldValue('totalResource', Number(values.supportResource) + Number(values.developmentResource), false)
                                                    }}

                                                />
                                                <ErrorMessage name="supportResource" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Total Resources</label>
                                                <FastField  name="totalResource" readOnly type="number" className={'form-control' + (errors.totalResource && touched.totalResource ? ' is-invalid' : '')} />
                                                <ErrorMessage name="totalResource" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-4">
                                                <label>Development Duration  <span className="small"></span></label>
                                                <FastField  name="developmentDuration" type="number" placeholder="" className={'form-control' + (errors.developmentDuration && touched.developmentDuration ? ' is-invalid' : '')} />
                                                <ErrorMessage name="developmentDuration" component="div" className="invalid-feedback" />
                                            </div>
                                            {(values.stage == "Tailwind" || values.stage == "Tailwind-Transformation-Delivery" || values.stage == "Tailwind-Due Dilligence" || values.stage == "Won") && <div className="form-group col-4">
                                                <label>Project Start Date</label>
                                                <FastField  name="projectStartDate" type="date" min={before3Month} className={'form-control' + (errors.projectStartDate && touched.projectStartDate ? ' is-invalid' : '')} />
                                                <ErrorMessage name="projectStartDate" component="div" className="invalid-feedback" />
                                            </div>
                                            }

                                            {(values.stage == "Tailwind" || values.stage == "Tailwind-Transformation-Delivery" || values.stage == "Tailwind-Due Dilligence" || values.stage == "Won") && <div className="form-group col-4">
                                                <label>Project End Date</label>
                                                <FastField  name="projectEndDate" type="date" min={values.projectStartDate} className={'form-control' + (errors.projectEndDate && touched.projectEndDate ? ' is-invalid' : '')} />
                                                <ErrorMessage name="projectEndDate" component="div" className="invalid-feedback" />
                                            </div>
                                            }

                                            <div className="form-group col-4">                                            
                                            </div>    
                                                </div>
                                            </div>
                                            </div>
                                    <div className="form-group float-right mt-3">
                                        <button type="submit" disabled={isSubmitting} className="btn edit-button">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            {!id ? 'Submit' : 'Submit'}
                                        </button>
                                        {!isAddMode  && user.role == "Admin" && <Link to="#" onClick={(e) => handleDelete(id)} className="btn del-button">Delete</Link> }
                                        <Link to="#" onClick={() => history.goBack()} className="btn assign-button">Cancel</Link>
                                        
                                    </div>
                                    <div className="row mt-5"></div>
                                </Form>          */                       
                            );
                        }}
                    </Formik>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
        </div>
    );
}

export function getCurrentDate(separator = '') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`
}

export default AddEditPage;
