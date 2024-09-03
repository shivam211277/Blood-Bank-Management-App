/*import React from "react";
import Form from "../../components/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./images/banner1.jpg" alt="loginIMG" />
          </div>

          <div className="col-md-4 form-container">
            <Form formTitle={"Login"} submitBtn={"Login"} formType={"login"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
*/
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "../../components/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [lastError, setLastError] = useState("");

  // Function to show toast with error message
  const showErrorToast = (errorMessage) => {
    // Close any existing toast before showing a new one
    toast.dismiss();
    toast.error(errorMessage);
  };

  useEffect(() => {
    if (error && error !== lastError) {
      showErrorToast(error);
      setLastError(error);
    }
  }, [error, lastError]);

  return (
    <>
      {/* Toast Container for displaying toasts */}
      <ToastContainer />

      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./images/banner1.jpg" alt="loginIMG" />
          </div>

          <div className="col-md-4 form-container">
            <Form formTitle={"Login"} submitBtn={"Login"} formType={"login"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
