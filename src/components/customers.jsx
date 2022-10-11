import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/userService";
import { getCustomer } from "../services/customerService";
import { setStyle } from "./utils/setStyle";
import AccountTable from "./accountTable";

class Customer extends Component {
   state = {
      user: {},
      customer: {},
      subscriptionDetail: {
         plan: "",
         video_quality: "",
         resolution: "",
         devices: [],
      },
   };

   async popuplateUser() {
      const { data: user } = await getUser();

      this.setState({ user });
   }

   async popuplateCustomer() {
      const { data: customer } = await getCustomer();
      this.setState({ customer });
      return customer.subscriptionDetail;
   }

   popuplateSubscriptionDetail(detail) {
      console.log(detail);
      this.setState({ subscriptionDetail: detail });
   }

   async componentDidMount() {
      setStyle();
      await this.popuplateUser();
      const detail = await this.popuplateCustomer();
      this.popuplateSubscriptionDetail(detail);
   }

   extractFirstLetter = (user) => {
      try {
         return user.first_name[0];
      } catch (error) {
         return "";
      }
   };

   render() {
      const { user, subscriptionDetail } = this.state;

      return (
         <div className="container-sm">
            <div className="flex--center profile">
               <div className="flex flex--center profile__photo">
                  <span className="fs-3">{this.extractFirstLetter(user)}</span>
               </div>
               <div className="profile__info">{user.first_name}</div>
               <div className="profile__info">{user.username}</div>
            </div>
            <div className="profile__account">
               <h2>Account Type</h2>
               <AccountTable subcription={subscriptionDetail} />
            </div>

            <NavLink to="/subscriptions" className="btn btn-primary">
               Upgrade
            </NavLink>
         </div>
      );
   }
}

export default Customer;
