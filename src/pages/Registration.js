import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Input,
  Stack,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
} from "@mui/material";
import { setUserData } from "../features/user/userSlice";

const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    dl: false,
    dlNumber: "",
    dob: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [age, setAge] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChangeCheck = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        dl: !formData?.dl,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //   email: "",
    // password: "",
    // fullName: "",
    // dl: false,
    // dlNumber: "",
    // dob: "",
    // if(formData.email.length<1){
    // setError
    // errorMsg:"please enter email",
    // valid : false

    // }

    dispatch(setUserData(formData));
    navigate("/dashboard");
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      fullName: "",
      dl: false,
      dlNumber: "",
      dob: "",
    });
  };
  function getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  useEffect(() => {
    formData?.dob && setAge(getAge(formData.dob || new Date()));
  }, [formData.dob]);
  return (
    <Container maxWidth="sm">
      <h1>Registration page </h1>
      <Stack
        component="form"
        sx={{
          width: "50%",
          margin: "60px",
        }}
        spacing={2}
      >
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="email"
            aria-describedby="my-helper-text-email"
            type="email"
            placeholder="Enter E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="my-input">password</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text-email"
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Full Name</InputLabel>
          <Input
            id="fullName"
            aria-describedby="my-helper-text"
            type="text"
            placeholder="full Name"
            name="fullName"
            onChange={handleChange}
            value={formData.fullName}
          />
        </FormControl>
        <FormControl>
          <Input
            id="dob"
            aria-describedby="my-helper-text"
            type="date"
            placeholder="Dob"
            name="dob"
            onChange={handleChange}
            value={formData.dob}
          />
        </FormControl>
        {age >= 18 && (
          <>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onChange={handleChangeCheck}
                    checked={formData.dl}
                  />
                }
                label="Driving license"
              />
            </FormControl>
            {formData.dl && (
              <FormControl>
                <InputLabel htmlFor="my-input">
                  Driving license number
                </InputLabel>
                <Input
                  id="dlNumber"
                  aria-describedby="my-helper-text"
                  type="text"
                  placeholder="full Name"
                  name="dlNumber"
                  onChange={handleChange}
                  value={formData.dlNumber}
                />
              </FormControl>
            )}
          </>
        )}
        <Button onClick={handleSubmit} variant="contained">
          submit
        </Button>
      </Stack>
    </Container>
  );
};

export default Registration;
