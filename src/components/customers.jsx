import React, { useEffect } from "react";
import setBackground from "./utils/setBackground";
import setStyle from "./utils/setStyle";

const Customers = () => {
   useEffect(() => {
      setBackground();
      setStyle();
   });
   return <h1>Customers</h1>;
};

export default Customers;
