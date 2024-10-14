import React, { useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const Signup = () => {
  const [credentials, setcredentials] = useState({
    phoneNo: "",
    fullName: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const submitted = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users/create", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          userName: credentials.fullName,
          phoneNo: credentials.phoneNo,
        }),
      });
      const json = await response.json();
      console.log(json);
      Cookies.set("token",json.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <form onSubmit={submitted}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Full-Name
          </label>
          <input
            type="text"
            className="form-control"
            id="text"
            aria-describedby="fullName"
            name="fullName"
            onChange={onchange}
            value={credentials.fullName}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={onchange}
            value={credentials.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onchange}
            value={credentials.password}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="PhoneNo" className="form-label">
            Phone-No
          </label>
          <input
            type="number"
            className="form-control"
            id="PhoneNo"
            aria-describedby="emailHelp"
            name="phoneNo"
            onChange={onchange}
            value={credentials.phoneNo}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
