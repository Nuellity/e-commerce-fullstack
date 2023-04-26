import React, { createContext, useState } from "react";

import Checkout from "./Checkout";

const multiStepDetails = createContext();

function StepDetails() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    paymentMethod: "",
  });
  const [finalData, setFinalData] = useState({});

  function submitData() {
    setFinalData({ userData });
    setCurrentStep(3);
  }

  return (
    <div>
      <multiStepDetails.Provider
        value={{
          currentStep,
          setCurrentStep,
          userData,
          setUserData,
          finalData,
          setFinalData,
          submitData,
        }}
      >
        <Checkout />
      </multiStepDetails.Provider>
    </div>
  );
}

export default StepDetails;
export { multiStepDetails };
