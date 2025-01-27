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
    updateUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (!user.name || !user.password) {
        setError("Fields cannot be empty!");
        return;
      }

      console.log("User data sent to register:", user);

      const registrationResponse = await axios.post("http://localhost:8081/users/register", {
        name: user.name,
        password: user.password,
      });

      console.log("Registration response:", registrationResponse.data); 

      const response = await login({ name: user.name, password: user.password });

      console.log("Login response after registration:", response); 

      updateUser({
        id: response.id,
        name: response.name,
        profile_picture: response.profile_picture,
      });

      localStorage.setItem("user", JSON.stringify(response));
      navigate("/homepage");
    } catch (error) {
      console.error("Error during registration or login:", error.response?.data || error.message);
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
