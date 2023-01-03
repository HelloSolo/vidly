import React, { Component } from "react";
import { getSubscriptions } from "../services/subscriptionService";
import { getCustomer, updateCustomer } from "../services/customerService";
import Table from "./common/table";
import { setStyle } from "./utils/setStyle";
import _ from "lodash";
import { toast } from "react-toastify";

export default class Subscription extends Component {
   state = {
      subscriptions: [],
      displaySub: [],
      customer: {},
   };

   async populateSubscriptions() {
      const { data: subscriptions } = await getSubscriptions();
      this.setState({ subscriptions });
      this.generateTableData(subscriptions);
   }

   async populateCustomer() {
      const { data: customer } = await getCustomer();
      this.setState({ customer });
   }

   async componentDidMount() {
      setStyle();
      await this.populateSubscriptions();
      await this.populateCustomer();
   }

   generateTableData(subscriptions) {
      const headers = [
         { path: "monthly_price", label: "Monthly Price" },
         { path: "video_quality", label: "Video Quality" },
         { path: "resolution", label: "Resolution" },
         { path: "devices", label: "Devices you can watch on" },
      ];
      let displaySub = [];
      let cache = {};

      try {
         headers.forEach((head) => {
            cache._id = Math.random();
            cache.item = head.label;
            cache.free = _.find(subscriptions, ["plan", "Free"])[head.path];
            cache.mobile = _.find(subscriptions, ["plan", "Mobile"])[head.path];
            cache.basic = _.find(subscriptions, ["plan", "Basic"])[head.path];
            cache.standard = _.find(subscriptions, ["plan", "Standard"])[
               head.path
            ];
            cache.premium = _.find(subscriptions, ["plan", "Premium"])[
               head.path
            ];

            displaySub.push({ ...cache });
         });
      } catch (error) {}
      this.setState({ displaySub });
   }

   handleSubscription = async (plan) => {
      const { subscriptions, customer } = this.state;
      const subscription = _.findIndex(subscriptions, ["plan", plan]) + 1;

      try {
         await updateCustomer(customer["user_id"], subscription);
         window.location = "/customers";
         toast.success("Account upgrade succesful");
      } catch (error) {
         toast.error("Account upgrade not succesful");
      }
   };

   columns = [
      { path: "item", label: "" },
      {
         label: (
            <div
               className="box flex--center"
               onClick={() => this.handleSubscription("Mobile")}>
               Mobile
            </div>
         ),
         path: "mobile",
      },
      {
         path: "basic",
         label: (
            <div
               className="box flex--center"
               onClick={() => this.handleSubscription("Basic")}>
               Basic
            </div>
         ),
      },
      {
         path: "standard",
         label: (
            <div
               className="box flex--center"
               onClick={() => this.handleSubscription("Standard")}>
               Standard
            </div>
         ),
      },
      {
         path: "premium",
         label: (
            <div
               className="box flex--center"
               onClick={() => this.handleSubscription("Premium")}>
               Premium
            </div>
         ),
      },
   ];

   render() {
      const { displaySub } = this.state;

      return (
         <div className="m-20">
            <div>
               <h1 className="fs-2">Choose the plan that's right for you</h1>
               <ul className="list fs-6">
                  <li>
                     {" "}
                     <i className="fa fa-check" aria-hidden="true"></i> Watch
                     all you want. Ad-free.
                  </li>
                  <li>
                     {" "}
                     <i className="fa fa-check" aria-hidden="true"></i>{" "}
                     Recommendations just for you
                  </li>
                  <li>
                     {" "}
                     <i className="fa fa-check" aria-hidden="true"></i> Change
                     or cancel your plans anytime
                  </li>
               </ul>
            </div>
            <br />
            <br />
            <div className="container-sm">
               <Table
                  data={displaySub}
                  columns={this.columns}
                  onSort={() => {}}
                  sortColumn={() => {}}
               />
            </div>
         </div>
      );
   }
}
