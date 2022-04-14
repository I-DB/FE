import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import axios from "axios";

//1.
const SET_POST = "SET_POST";
const SET_DETAIL = "SET_DETAIL";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const SET_LIKE = "SET_LIKE";

const ADD_LIKE = "ADD_LIKE";
const CANCEL_LIKE = "ADD_LIKE";

//2.
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setPostOne = createAction(SET_DETAIL, (post_one) => ({ post_one }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({ postId, post }));
const deletePost = createAction(DELETE_POST, (postOne) => ({ postOne }));

const setLike = createAction(SET_LIKE, (like_data) => ({ like_data }));

const _addLike = createAction(ADD_LIKE, (userId) => ({ userId }));
const _cancelLike = createAction(CANCEL_LIKE, (userId) => ({ userId }));

//3.
const initialState = {
  like_list: [],
  target: [],
  list: [],
  is_loading: false,
};

const initialPost = {
  title: "제목제목",
  content: "내용내용",
  liked: 0,
  comment: 0,
};

//게시글 get
export const getPostDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.postGet();
      dispatch(setPost(data.result));
    } catch (e) {
      console.log(e);
    }
  };

export const getPostOneDB =
  (id) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.postOne(id);

      let resultLiked = data.result.liked;
      dispatch(setLike(resultLiked));
      dispatch(setPostOne(data.result));
    } catch (e) {
      console.log("디테일 가져오기 실패");
    }
  };

//게시글 insert
const addPostDB = (title = "", content = "") => {
  return function (dispatch, getState, { history }) {
    const _post = {
      ...initialPost,
      title: title,
      content: content,
    };

    apis
      .postWrite(title, content)
      .then((res) => {
        dispatch(addPost(_post));
        history.replace("/postList");
      })
      .catch((err) => {
        window.alert("포스트 작성 실패");
      });
  };
};

//게시글 수정
const editPostDB = (postId = "", title = "", content = "") => {
  return function (dispatch, getState, { history }) {
    apis
      .postEdit(postId, title, content)
      .then(function (response) {
        dispatch(editPost(postId, { title, content }));
        history.replace("/postList");
      })
      .catch(function (err) {
        alert("수정 실패");
      });
  };
};

//게시글 삭제
const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .postDelete(postId)
      .then(function (response) {
        dispatch(deletePost(response.data));
        history.replace("/postList");
      })
      .catch(function (err) {
        alert("삭제 실패");
      });
  };
};

//좋아요
const addLike = (postId, userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addLike(postId)
      .then(function (response) {
        _addLike(userId);
      })
      .catch(function (err) {
        alert("좋아요 실패!!!!");
      });
  };
};

//좋아요 취소
const addUnlike = (postId, userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addUnlike(postId)
      .then(function (response) {
        _cancelLike(userId);
      })
      .catch(function (err) {
        alert("안좋아요 실패!!!!");
      });
  };
};

//4.
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.is_loading = false;
      }),

    [SET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.target = action.payload.post_one;
        draft.is_loaded = true;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p._id === action.payload.postId);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (l) => l._id + "" !== action.payload.postId
        );
      }),

    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like_list = action.payload.like_data;
      }),

    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like_list.push(action.payload.userId);
      }),

    [CANCEL_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like_list = draft.like_list.filter(
          (l) => l !== action.payload.userId
        );
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  addLike,
  addUnlike,
  getPostOneDB,
  setPostOne,
  setLike,
  _addLike,
  _cancelLike,
};

export { actionCreators };
