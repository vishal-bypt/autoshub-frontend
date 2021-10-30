import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, FastField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  rfcService,
  alertService,
  accountService,
  programService,
} from "../../services";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";
import Swal from "sweetalert2";

function AddEdit({ history, match }) {
  const user = accountService.userValue;
  const { id } = match.params;
  const [countries, setCountries] = useState(null);
  const [geo, setGeo] = useState(null);
  const [geoOptions, setGeoOptions] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(null);

  let locationData = [];
  let geoData = [];

  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    rfcService.getCountries().then((x) => {
      let location = Object.keys(x.Location);
      locationData = [];
      location.map((country) => {
        locationData.push({ label: country, value: country });
      });
      setCountries(locationData);
      setGeo(x.Location);
      x.GEO.map((g) => {
        geoData.push({ label: g, value: g });
      });
      setGeoOptions(geoData);
    });
  }, []);

  const initialValues = {
    programName: "",
  };

  const validationSchema = Yup.object().shape({
    programName: Yup.string().required("Program name is missing"),
  });

  //   const handleChangeDealType = (e) => {
  //     e.preventDefault();
  //     setDealTypeSelected(e.target.value);
  //   };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this record?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rfcService.delete(id).then((data) => {
          alertService.success(data.message, { keepAfterRouteChange: true });
          history.push("/rfp");
        });
        Swal.fire(
          "Deleted!",
          "Your record has been deleted successfully.",
          "success"
        );
      }
    });

    // var r = confirm("Are you sure you want to delete this records?");
    // if (r == true) {

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
  };

  function onSubmit(fields, { setStatus, setSubmitting }) {
    let data = { ...fields };
    setStatus();
    data.userId = user.id;
    create(data, setSubmitting);
  }

  function create(fields, setSubmitting) {
    programService
      .create(fields)
      .then((data) => {
        alertService.success("Success", { keepAfterRouteChange: true });
        history.push("/revenue");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  function update(id, fields, setSubmitting) {
    programService
      .update(id, fields)
      .then(() => {
        alertService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push("/rfp");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h1>Program Details</h1>
            </div>
            <div className="col-md-6 text-end">
              <Link to={"."} className="btn btn-danger">
                <ArrowBackIcon className="mr-1" />
                Back
              </Link>
            </div>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                errors,
                values,
                touched,
                isSubmitting,
                setFieldValue,
                handleBlur,
                setTouched,
              }) => {
                return (
                  <Form>
                    <>
                      <div className="row mt-5">
                        <div className="form-group col-md-6 mb-2">
                          <label>Program Name</label>
                          <FastField
                            name="programName"
                            type="string"
                            className={
                              "form-control" +
                              (errors.programName && touched.programName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="programName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="row">&nbsp;</div>
                      <div className="row">
                        <div className="form-group text-start">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary"
                          >
                            {isSubmitting && (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            )}
                            Submit
                          </button>
                          &nbsp; &nbsp; &nbsp;
                          {/* <button
                            disabled={isSubmitting}
                            type="button"
                            className="btn btn-danger"
                            //   onClick={() => handleDelete()}
                          >
                            Cancel
                          </button> */}
                        </div>
                      </div>
                      <div className="row mt-5"></div>
                    </>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

export { AddEdit };
