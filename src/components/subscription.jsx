import React, { Component } from "react";
import { getSubscriptions } from "../services/subscriptionService";
import Table from "./common/table";

export default class Subscription extends Component {
   state = {
      subscriptions: {},
   };

   async populateSubscriptions() {
      const subscriptions = await getSubscriptions();
      this.setState({ subscriptions });
   }

   async componentDidMount() {
      await this.populateSubscriptions();
   }

   render() {
      return <div>Subscription</div>;
   }
}
