import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { login } from "../auth/authService";
import { useState } from "react";

const Registration = () => {
  const { user, updateUser } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateUser({ [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (user.name && user.password) {
        await axios.post("http://localhost:8081/users/register", user);
        const response = await login(user);
        updateUser({ id: response.id, name: user.name, profile_picture: response.profile_picture });
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/homepage");
      } else {
        setError("Fields cannot be empty!");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An unexpected error occurred!");
    }
  };

  return (
    <div className="login-container">
      <h1>Create your own account!</h1>
      <form className="login-form">
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <div className="l_button" onClick={handleClick}>
          Create Account
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Registration;
