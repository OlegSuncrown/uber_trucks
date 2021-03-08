import axios from "axios";

const setAuthToken = (token) => {
  //let bearerToken = `Bearer ${token}`;
  let bearerToken = `JWT ${token}`;
  if (token) {
    axios.defaults.headers.common["Authorization"] = bearerToken;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
export default setAuthToken;