import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateprofile } from "../store/reducers/userSlice";

const ProfilePage = () => {
  const emailId = useSelector((state) => state?.user?.emailId);
  const fname = useSelector((state) => state?.user?.firstName);
  const lname = useSelector((state) => state?.user?.lastName);

  const [file, setfile] = useState();
  // console.log(file);
  const dispatch = useDispatch();

  const [firstName, setfname] = useState("");
  const [lastName, setlname] = useState("");

  const [fnameError, setfnameError] = useState(false);
  const [lnameError, setlnameError] = useState(false);
  const [fileError, setfileError] = useState(false);

  const postUpdate = (event) => {
    if (!fname) {
      event.preventDefault();
      setfnameError("*required");
      return;
    }
    if (!lname) {
      event.preventDefault();
      setlnameError("*required");
      return;
    }
    // if (!file) {
    //   event.preventDefault();
    //   setfileError("*required");
    //   return;
    // }
    const item = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      file: file,
    };
    dispatch(updateprofile(item));
  };
  return (
    <Container className="py-4">
      <h2 className="text-center">Profile</h2>
      <Form encType="multipart/form-data">
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={fname}
            onChange={(e) => {
              setfname(e.target.value);
              setfnameError("");
            }}
          />
        </Form.Group>
        {fnameError && <Alert variant="danger">{fnameError}</Alert>}
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={lname}
            onChange={(e) => {
              setlname(e.target.value);
              setlnameError("");
            }}
          />
        </Form.Group>
        {lnameError && <Alert variant="danger">{lnameError}</Alert>}
        <Form.Group controlId="email" disabled>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder={emailId} disabled />
        </Form.Group>
        <Form.Group controlId="resume">
          <Form.Label>Resume</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(e) => {
              setfile(e.target.files[0]);
              setfileError("");
            }}
          />
          <Form.Text className="text-muted">
            Choose a file for your resume.
          </Form.Text>
        </Form.Group>
        {/* {fileError && <Alert variant="danger">{fileError}</Alert>} */}
        <Button variant="primary" type="button" onClick={postUpdate}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ProfilePage;
