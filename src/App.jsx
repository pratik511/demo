import React from "react";
import LoginPage from "./component/login";
import SignUp from "./component/signUp";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainRoute from "./routes";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <MainRoute />
    </React.Fragment>
  );
}

export default App;
