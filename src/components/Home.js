import React, { useContext } from "react";
import Note from "./Note";
import { useNavigate } from "react-router";
import cookies  from "js-cookie";
import Login1 from "./Login1";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container my-4">
        {cookies.get("token") ? <Note /> : 
        <Login1/>
      }
      {/* <h2>Please Login </h2> */}
      </div>
    </>
  );
};

export default Home;
