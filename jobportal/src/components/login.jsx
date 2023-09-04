import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { setsession } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { loginValidation } from "../store/reducers/userSlice";

export const Login = () => {

  const [emailId,setemail] = useState("");
  const [password,setpassword] = useState("");
  const isValidUser = useSelector(state => state?.user?.isValidUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  sessionStorage.clear();

  // dispatch(loginValidation(emailId,password))

  const loginvalidation = () => {
    
    const credentials = {emailId,password}
    console.log("credentials",credentials);;
    dispatch(loginValidation(credentials))
  }
  
  useEffect(()=> {
    if(isValidUser){
      // console.log(isValidUser)
      setsession(emailId," LoggedIn")
      navigate("/dashboard")
    }
  })

  return (
    <div className="login">
      <div className="child">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setemail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Group>
          <div className="cont">
          <Button
            variant="dark"
            className="button"
            onClick={() => loginvalidation()}
            
          >
            Submit
          </Button>
          <Link className = 'register' as={Link} to="/Registration">
            Register!
          </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
