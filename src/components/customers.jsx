import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/userService";
import { getCustomer } from "../services/customerService";
import { setStyle } from "./utils/setStyle";
import ProfilePicture from "./common/profilePicture";
import AccountTable from "./accountTable";

class Customer extends Component {
   state = {
      user: {},
      customer: {},
      subscription: {
         plan: "",
         video_quality: "",
         resolution: "",
         devices: "",
      },
   };

   async populateUser() {
      const { data: user } = await getUser();
      this.setState({ user });
   }

   async populateCustomer() {
      const { data: customer } = await getCustomer();
      this.setState({ customer });
      return customer.subscription;
   }

   populateSubscription(detail) {
      this.setState({ subscription: detail });
   }

   async componentDidMount() {
      setStyle();
      await this.populateUser();
      const detail = await this.populateCustomer();
      this.populateSubscription(detail);
   }

   extractFirstLetter = (user) => {
      try {
         return user.first_name[0];
      } catch (error) {
         return "";
      }
   };

   render() {
      const { user, subscription } = this.state;

      return (
         <div className="container-sm">
            <div className="flex--center profile">
               <ProfilePicture
                  picture={this.extractFirstLetter(user)}
                  name={user.first_name}
                  username={user.username}
               />
            </div>
            <div className="profile__account">
               <h2>Account Type</h2>
               <AccountTable subcription={subscription} />
            </div>

            <NavLink to="/subscriptions" className="btn btn-primary">
               Upgrade
            </NavLink>
         </div>
      );
   }
}

export default Customer;
