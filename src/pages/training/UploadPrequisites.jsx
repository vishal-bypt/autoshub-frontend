import React, { useEffect, useState } from "react";
import { alertService, trainingService } from "../../services";
var FormData = require("form-data");

function UploadPrequisites({ history, match }) {
  const [users, setUsers] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    trainingService.getAll().then((x) => setUsers(x));
  }, []);

  const onFileChange = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      var formData = new FormData();
      history.push("/training");
      /* formData.append('filePath', selectedFile);//append the values with key, value pair 
            create(formData, user.id);   */
    } catch (error) {
      console.log("error == ", error);
    }
  };

  function create(formData, id) {
    trainingService
      .uploadExcel(formData, id)
      .then((data) => {
        alertService.success("Success", { keepAfterRouteChange: true });
        history.push("/training");
      })
      .catch((error) => {
        alertService.error(error);
      });
  }
  return (
    <div className="p-4">
      <div className="container">
        <h1>Upload Required Prerequisites</h1>
        <form encType="multipart/form-data">
          <div className="form-group col-5">
            <label>Upload File</label>
            <input
              type="file"
              name=""
              id=""
              className="form-control"
              onChange={onFileChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export { UploadPrequisites };
