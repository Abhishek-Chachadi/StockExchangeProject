import axios from "axios";

export default axios.create({
    baseURL: "https://phase3stockexchange.herokuapp.com/",
    headers: {
      "Content-type": "application/json"
    }
  });