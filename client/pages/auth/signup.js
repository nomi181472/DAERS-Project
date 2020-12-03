import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
export default () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, SetBmi] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "http://localhost:3010/api-gateway/sign-up/user",
    method: "post",
    body: {
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
    },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();

    // console.log({
    //   email,
    //   password,
    //   age,
    //   weight,
    //   firstName,
    //   lastName,
    //   height,
    //   bmi,
    // });
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Signup</h1>
      <div className="form-group">
        <label>First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Height</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Weight</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>BMI</label>
        <input
          type="number"
          value={bmi}
          onChange={(e) => SetBmi(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors};<button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
