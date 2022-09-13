import React, { Component } from "react";

class LoginForm extends Component {
   render() {
      return (
         <div>
            <h1>Login</h1>
            <form>
               <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                     Username
                  </label>
                  <input type="text" className="form-control" id="username" />

                  <div className="mb-3">
                     <label htmlFor="password" className="form-label">
                        Password
                     </label>
                     <input
                        type="password"
                        className="form-control"
                        id="password"
                     />
                  </div>
               </div>

               <button type="submit" className="btn btn-primary">
                  Submit
               </button>
            </form>
         </div>
      );
   }
}

export default LoginForm;
