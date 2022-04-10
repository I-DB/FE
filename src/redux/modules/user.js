import { createAction, handleAction } from "redux-actions";
import jwtDecode from "jwt-decode";
import produce from "immer";
import { apis } from "../../shared/axios";

import { cookies } from "../../shared/cookie";

// 액션
const SIGN_UP = "SIGN_UP";
const LOG_OUT = "LOG_OUT";
const LOG_IN = "LOG_IN";

// 액션 크리에이터
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const signUp = createAction(SIGN_UP, (user) => ({ user }));

// 초기값
const initialState = {
  nickName: null,
  isLogin: false,
};

// 미들웨어
const loginUser = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .post("/user/login", { userId: id, password: pwd })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const signupUser = (userId, password, nickName, comPwd) => {
  console.log(userId, password, comPwd, nickName);
  return function (dispatch, getState, { history }) {
    apis
      .post("/user/join", { userId: userId, password: password, confirmPassword: comPwd, nickName: nickName })
      .then((response) => {
        alert(response.data.msg);
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 리듀서
export default handleAction(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        cookies("logins", "success");
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
  },
  {
    [LOG_OUT]: (state, action) => produce(state, (draft) => {}),
  },
  {
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// 액션 크리에이더 export
const actionCreators = {
  logIn,
  loginUser,
  signupUser,
};

export { actionCreators };
