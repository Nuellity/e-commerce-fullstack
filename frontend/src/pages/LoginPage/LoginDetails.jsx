import React, { createContext, useState } from "react";
import Login from "./Login";

const loginDetails = createContext();

function LoginDetails() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginEmail: "",
    loginPassword: "",
    recoverEmail: "",
    recoverPassword: "",
    confirmRecoverPassword: "",
  });
  const [finalData, setFinalData] = useState([]);
  const [recover, setRecover] = useState(false);
  const [register, setRegister] = useState(false);

  function submitData() {
    setFinalData((finalData) => [...finalData, userData]);
  }

  return (
    <loginDetails.Provider
      value={{
        userData,
        register,
        setRegister,
        setUserData,
        finalData,
        setFinalData,
        submitData,
        recover,
        setRecover,
      }}
    >
      <Login />
    </loginDetails.Provider>
  );
}

export default LoginDetails;
export { loginDetails };
