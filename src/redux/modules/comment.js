import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

// 액션
const UPDATA = "UPDATA";
const DELETE = "DELETE";
const ADD = "ADD";
const GET = "GET";

// 액션 크리에이터
const mentUpdata = createAction(UPDATA, (comment, commentId) => ({
  comment,
  commentId,
}));
const mentDelete = createAction(DELETE, (commentId) => ({ commentId }));
const mentAdd = createAction(ADD, (content) => ({ content }));
const getment = createAction(GET, (post, comment, comment_cnt) => ({
  post,
  comment,
  comment_cnt,
}));

// 초기값

const initialState = {
  list: [],
};

const __mentUpdata = (postId, content, commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .commentUp(postId, content, commentId)
      .then((res) => {
        console.log(res);
        dispatch(mentUpdata({ content, commentId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const __mentDelete = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .commentDle(postId, commentId)
      .then((res) => {
        console.log(res);
        dispatch(mentDelete(commentId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const __mentAdd = (Id, content) => {
  return function (dispatch, getState, { history }) {
    apis
      .commentAdd(Id, content)
      .then((res) => {
        const nickName = localStorage.getItem("nickName");
        const userId = localStorage.getItem("userId");
        const _id = res.data.result;
        dispatch(mentAdd({ content, nickName, userId, _id }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        draft.comment = action.payload.comment;
        draft.comment_cnt = action.payload.comment_cnt;
      }),
    [UPDATA]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = state.comment.map((p) =>
          p._id === action.payload.comment.commentId
            ? { ...p, content: action.payload.comment.content }
            : p
        );
      }),

    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = draft.comment.filter(
          (p) => p._id !== action.payload.commentId
        );
      }),

    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.comment.unshift(action.payload.content);
      }),
  },
  initialState
);

// export
const actionCreators = {
  mentAdd,
  mentDelete,
  mentUpdata,
  __mentAdd,
  __mentDelete,
  __mentUpdata,
  getment,
};

export { actionCreators };
