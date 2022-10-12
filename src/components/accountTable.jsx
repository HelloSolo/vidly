import React from "react";

export default function AccountTable({ subcription }) {
   return (
      <div className="container-sm-custom">
         <table className="table table-borderless fw table--custom">
            <tbody>
               <tr>
                  <td>Plan</td>
                  <td>{subcription.plan}</td>
               </tr>
               <tr>
                  <td>Video Quality</td>
                  <td>{subcription.video_quality}</td>
               </tr>
               <tr>
                  <td>Resolution</td>
                  <td>{subcription.resolution}</td>
               </tr>
               <tr>
                  <td>Devices</td>
                  <td>{subcription.devices}</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
}
