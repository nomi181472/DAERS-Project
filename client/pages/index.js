import axios from "axios";
import buildClient from "../api/built-client";
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? (
    <h1>You are signed in </h1>
  ) : (
    <h1>you are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (req) => {
  /**  */ const response = await buildClient(req);
  //console.log(response);
  try {
    const { data } = await buildClient(req).get("user", {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err);
    //   const { data } = await buildClient(req).get("user", {
    //     withCredentials: true,
    //   });
    // // return data;
    try {
      const response = await axios.get(
        "http://localhost:3010/api-gateway/current-user/user",
        { withCredentials: true }
      );

      return response.data;
    } catch (err) {
      return { currentUser: null };
    }
    //return { currentUser: null };
  }

  //console.log(req);

  // if (typeof window === undefined) {
  //   const { data } = await buildClient(req).get("user", {
  //     withCredentials: true,
  //   });
  //   return data;
  // } else {
  //   const { data } = await buildClient(req).get("user", {
  //     withCredentials: true,
  //   });
  // // return data;
  // const response = await axios.get(
  //   "http://localhost:3010/api-gateway/current-user/user",
  //   { withCredentials: true }
  // );
  //return data;
};

// if (typeof window === "undefined") {
//   console.log("server side rendering");
//   //   // const response = await axios.get(
//   //   //   "http://localhost:3010/api-gateway/current-user/user",
//   //   //   { withCredentials: true }
//   //   // );
// } else {
//   console.log("client side rendering");

//   const response = await axios.get(
//     "http://localhost:3010/api-gateway/current-user/user",
//     { withCredentials: true }
//   );
//   //   console.log("client side renderingafter req");
//   //   //   console.log(response.data);
//   //   return response.data;
//   // }
// };
export default LandingPage;
