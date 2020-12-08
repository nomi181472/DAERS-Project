import axios from "axios";
import { useState } from "react";
export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body, {
        withCredentials: true,
      });
      //console.log(response.data);
      const { userJWT } = response.data;
      /**  */ const token = "express:sess=" + userJWT + "==";
      //console.log(token);
      //localStorage.setItem("token", token);
      //console.log(document.cookie);
      //console.log(document.cookie);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
      //throw err;
    }
  };
  return { doRequest, errors };
};
