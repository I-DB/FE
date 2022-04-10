import axios from "axios";

const instance = axios.create({
  baseURL: "https://ideadb.shop",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// instance.defaults.headers.common["Authorization"]

export default instance;
