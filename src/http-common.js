import axios from "axios";

export default axios.create({
    baseURL: "https://phase3stockexchange.herokuapp.com/",
   // baseURL :"http://localhost:8080/",
    headers: {
      "Content-type": "application/json"
    }
  });