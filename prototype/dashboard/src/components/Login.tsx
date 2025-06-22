import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./Context/AuthContext";
import { CustomAlert } from "./misc/CustomAlert";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (showLoginAlert) {
      const timeout = setTimeout(() => {
        setShowLoginAlert(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showLoginAlert]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      login(res.data.token);
      navigate("/");
    } catch (err) {
      setShowLoginAlert(true);
    }
  };

  return (
    <div className="login-page">
      <h1 className="mb-3">
        <b>Login</b>
      </h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Gebruikernaam"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary login-button">
          Inloggen
        </button>
      </form>

      {showLoginAlert && (
        <CustomAlert message={"Inloggen mislukt"} type={"alert alert-danger"} />
      )}
    </div>
  );
};
