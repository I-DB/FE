import axios from "axios";
// const accessToken = document.cookie.split("=")[1];
// console.log(accessToken);

export const instance = axios.create({
  baseURL: "https://ideadb.shop/",

  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
});

// 헤더에 토큰 보내기
instance.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  console.log(config);
  return config;
});

export const apis = {
  // createUser: (user) => instance.post("/api/join", user),
  // createLogin: (user) => instance.post("/api/login", user),
  // getUserInfo: () => instance.get("/api/auth"),

  signup: (userId, password, comPwd, nickName) =>
    instance.post("/user/join", {
      userId: userId,
      password: password,
      confirmPassword: comPwd,
      nickName: nickName,
    }),

  post: (title, content) => instance.post("/post", { title: title, content: content }),

  login: (id, pwd) => instance.post("/user/login", { userId: id, password: pwd }),

  auth: () => instance.get("/user/auth"),

  postWrite: (post) => instance.post("/post", post),
  //imageUpload: (image) => instance.post("/api/imgs", image),
  postGet: () => instance.get("/post"),
  // postGetOne : (items) => instance.get(`/api/items/${}`),
  // deletePost: () => instance.delete("/api/items/:itemid"),
};
