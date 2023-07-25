import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNav from "./login_navbar";
import axios from "axios";

function NewPwdAdmin() {
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (adminPassword !== confirmAdminPassword) {
      setIsError(true);
      setError("Passwords are not same");
    } else {
      setIsError(false);

      const email = localStorage.getItem("email");

      const obj = {
        email: email,
        password: adminPassword,
      };

      axios
        .patch(
          "https://interactive-dashboard-api.onrender.com/api/admin/update-password",
          obj
        )
        .then((res) => {
          const data = res;
          navigate("/admin-login");
          alert(data.data.msg);
        })
        .catch((err) => {
          setIsError(true);
          setError(err.response.data.msg);
        });
    }
  };

  return (
    <div className="login-page">
      <div className="university-logo">
        <img
          src="data:image/png;base64,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"
          alt=""
        />
      </div>
      <div>
        <section className="login-container">
          <LoginNav />
          <div className="login">
            <h2 style={{ fontFamily: "Calibri, sans-serif, Helvetica" }}>
              Change Password
            </h2>
            <hr />
            <br />
            <form>
              <input
                type="password"
                placeholder="New Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmAdminPassword}
                onChange={(e) => setConfirmAdminPassword(e.target.value)}
                required
              />
              {isError && <p className="err-msg">{error}</p>}
              {/* <Link to="/admin-login"> */}
              <button
                className="sendOtpBtn"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
              {/* </Link> */}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NewPwdAdmin;
