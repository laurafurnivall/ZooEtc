import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authmanager";
import { Button } from "antd";
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <article className="zooContainer loginContainer">
    <img alt="ZooEtcLogo" className="loginLogo" src="../images/zooetc3.png"/>
    <Form className="loginForm" onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button className="addButton" onClick={loginSubmit}>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link className="linkOut" to="/Register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </article>
  );
}