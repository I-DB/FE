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
//const LOADING = "LOADING";

//2.
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setPostOne = createAction(SET_DETAIL, (post_one)=>({post_one}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({ postId, post }));
const deletePost = createAction(DELETE_POST, (postOne) => ({ postOne }));

const setLike = createAction(SET_LIKE, (like_data) => ({ like_data }));
const _addLike = createAction(ADD_LIKE, (userId) => ({ userId }));
const _cancelLike = createAction(CANCEL_LIKE, (userId) => ({ userId }));


//const loading = createAction(LOADING, (is_loading) => ({is_loading}));

//3.
const initialState = {
  like_list:[],
  target:[],
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
      // dispatch(imageCreators.setPreview(null));
    } catch (e) {
      console.log(e);
    }
  };

//게시글 하나
// const  getPostOneDB = (id) => {
//   return function (dispatch, getState, { history }) {
//   apis
//   .postOne(id)
//   .then((res) => {
//     // dispatch(addPost(_post));
//     // history.replace("/postList");
//     //console.log(res.data.result);

//     let post_one = res.data.result;
//     dispatch(setPostOne(post_one));
//   })
//   .catch((err) => {
//     window.alert("포스트 하나 가져오기 실패");
//   });
// }
// }

export const getPostOneDB =
  (id) =>
  async (dispatch, getState, { history }) => {

    try {
      const { data } = await apis.postOne(id);

      let resultLiked = data.result.liked;
      //console.log(resultLiked);
      dispatch(setLike(resultLiked));
      //console.log(data.result.liked);
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

    // const _like_count=getState().target.liked;
    // console.log(_like_count);
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


//게시글 하나
// const initialPost = {
// id : 0,
// user_info: {
//     user_name: "seora",
//     user_profile:
//       "https://i.pinimg.com/564x/28/2c/2c/282c2c8c7fe6a501a8e2935af4000f46.jpg",
//   },
//       image_url:
//         "https://i.pinimg.com/564x/11/a3/7b/11a37b9ede6e8471d5175a8c2a800ca3.jpg",
//       contents: "내가말하고있짢아",
//       comment_cnt: 10,
//       insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
//       //*
//       layout : "bottom",
// };

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
        //draft.post = action.payload.postOne;
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
          //draft.like_list[action.payload.postId] = draft.like_list[
          draft.like_list = 
          draft.like_list.filter((l) => l !== action.payload.userId);
      }),

    // [LOADING]:(state, action) => produce(state, (draft)=>{draft.is_loading = action.payload.is_loading;})
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
  _cancelLike

};

export { actionCreators };
