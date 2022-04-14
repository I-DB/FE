import axios from "axios";
axios.defaults.withCredentials = true;

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
  return config;
});

export const apis = {
  signup: (userId, password, confirmPassword, nickName) =>
    instance.post("/user/join", {
      userId: userId,
      password: password,
      confirmPassword: confirmPassword,
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

  commentAdd: (postId, content) =>
    instance.post(`/post/${postId}/comment`, { content: content }),

  commentUp: (postId, content, commentId) =>
    instance.patch(`/post/${postId}/comment`, {
      commentId: commentId,
      content: content,
    }),

  commentDle: (postId, commentId) =>
    instance.delete(`/post/${postId}/comment`, { commentId: commentId }),
};
