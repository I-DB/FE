import axios from "axios";
import post from "../redux/modules/post";

export const instance = axios.create({
  baseURL: "https://ideadb.shop/",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json, text/plain,*/*",
  },
  
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

export const apis = {
  // createUser: (user) => instance.post("/api/join", user),
  // createLogin: (user) => instance.post("/api/login", user),
  // getUserInfo: () => instance.get("/api/auth"),

  postWrite: (post) => instance.post("/post", post),
  //imageUpload: (image) => instance.post("/api/imgs", image),
  postGet : () => instance.get("/post"),
  // postGetOne : (items) => instance.get(`/api/items/${}`),
  // deletePost: () => instance.delete("/api/items/:itemid"),
};