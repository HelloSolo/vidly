import React, { Component } from "react";
import { getUser } from "../services/userService";
import { getCustomer, updateCustomer } from "../services/customerService";
import { toast } from "react-toastify";
import { setStyle } from "./utils/setStyle";

class Customer extends Component {
   state = {
      user: {},
      customer: {},
   };

   async popuplateUser() {
      const { data: user } = await getUser();
      this.setState({ user });
   }

   async popuplateCustomer() {
      const { data: customer } = await getCustomer();
      this.setState({ customer });
   }

   async componentDidMount() {
      setStyle();
      await this.popuplateUser();
      await this.popuplateCustomer();
   }

   render() {
      const { user, customer } = this.state;
      return (
         <div>
            <h1>Movie Form</h1>
         </div>
      );
   }
}

export default Customer;
