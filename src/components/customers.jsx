import React, { useEffect } from "react";
import { setStyle } from "./utils/setStyle";

const Customers = () => {
   useEffect(() => {
      setStyle();
   });
   return <h1>Customers</h1>;
};

export default Customers;
