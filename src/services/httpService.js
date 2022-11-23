import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
   const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
   if (!expectedError) {
      logger.log(error);
      toast.error("An Unexpected error has occured!");
   }
   return Promise.reject(error);
});

async function setJwt(jwt) {
   if (jwt == null) return;
   axios.defaults.headers.common["authorization"] = `JWT ${jwt}`;
}

function setCustomHeader(header, value) {
   axios.defaults.headers.common[header] = value;
}

const httpService = {
   get: axios.get,
   post: axios.post,
   put: axios.put,
   delete: axios.delete,
   setJwt,
   setCustomHeader,
};

export default httpService;
