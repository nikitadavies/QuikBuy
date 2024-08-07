import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/index";

function VerifyCode() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setVerificationCode] = useState(false);

  const confirmVerification = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.auth.confirmCode({
        email: localStorage.getItem("email"),
        confirmationCode: code
      });
      setIsLoading(false);

      if (response) {
        navigate("/home");
      }
    } catch (error) {
      setIsLoading(false);
      const { data } = error.response;
      if (data) {
        Object.values(data).forEach((message) => {
          toast.error(message);
        });
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };



  return (
    <div className="container py-3">
   <div>
            <h2>Verify Account</h2>
            <h3>Please Enter Verification Code sent to your registered email</h3>
            <input
              type="number"
              value={code}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verifcation code"
            />
            <button  className="btn btn-primary" style={{backgroundColor: "#1A2529", border: "none", marginLeft: "10px"}} onClick={confirmVerification}>Submit</button>
          </div>
    </div>
  );
}


export default VerifyCode;
