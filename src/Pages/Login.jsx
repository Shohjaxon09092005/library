import React, { useState } from "react";
import Input from "../Components/ui/Input";
import Button from "../Components/ui/Button";
import "../Styles/login.css";
import { NavLink } from "react-router-dom";


function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login:", login);
        console.log("Password:", password);
    };



    return (
        <div className="form-container">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}> Kutubxona Paneliga Kirish</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Admin login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         <NavLink to="/home"><Button type="submit">Kirish</Button></NavLink> 
        </form>
      </div>
    )
}

export default Login
