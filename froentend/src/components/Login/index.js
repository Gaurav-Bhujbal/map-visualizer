import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    //making api call for user authentication
    const url = "https://map-visualizer.onrender.com/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      const jwtToken = data.jwt_token;
      Cookies.set("jwt_token", jwtToken);
      setErrorMsg("");

      //replacing path

      navigate("/", { replace: true });
    } else {
      const { error } = data;
      setErrorMsg(error);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-bg-container">
      <form className="login-form-field" onSubmit={onSubmitForm}>
        <h1 className="login-heading">Nice to see you again.</h1>
        <p className="login-text">Please Login.</p>
        <div className="input-container">
          <label className="login-label">USERNAME</label>
          <input
            value={username}
            placeholder="Enter username"
            className="login-input"
            type="text"
            onChange={onChangeUsername}
          />
        </div>
        <div className="input-container">
          <label className="login-label">PASSWORD</label>
          <input
            value={password}
            placeholder="Enter password"
            className="login-input"
            type="password"
            onChange={onChangePassword}
          />
        </div>
        {errorMsg ? <p className="error-msg">*Oops! {errorMsg}.</p> : null}
        <button type="submit" className="login-btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
