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
  // const refreshToken = document.cookie.split("=")[2];
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  // config.headers.common["refreshToken"] = `Bearer ${refreshToken}`;
  return config;
  // console.log(config);

});
 
export const apis = {
  signup: (userId, password, comPwd, nickName) =>
    instance.post("/user/join", {
      userId: userId,
      password: password,
      confirmPassword: comPwd,
      nickName: nickName,
    }),
  login: (id, pwd) =>
    instance.post("/user/login", { userId: id, password: pwd }),

  auth: () => instance.get("/user/auth"),

  postGet: () => instance.get("/post"),
  postOne: (postId) => instance.get(`/post/${postId}`),
  postWrite: (title, content) =>
    instance.post("/post", { title: title, content: content }),
  postEdit: (postId, title, content) =>
    instance.patch(`/post/${postId}`, { title: title, content: content }),
  postDelete: (postId) => instance.delete(`/post/${postId}`),


  addLike: (postId) => instance.patch(`/post/like/${postId}`),
  addUnlike: (postId) => instance.patch(`/post/unlike/${postId}`),
  //addLike: (postId) => instance.patch(`/post/like/${postId}`, {postId: postId}),
  // postGetOne : (items) => instance.get(`/api/items/${}`),
  //imageUpload: (image) => instance.post("/api/imgs", image),
};
