import { createAction, handleActions } from "redux-actions";
import jwtDecode from "jwt-decode";
import produce from "immer";
import { apis } from "../../shared/axios";
import { setCookie, deleteCookie } from "../../shared/cookie";

// 액션
const AUTH = "AUTH";
const LOG_OUT = "LOG_OUT";
const LOG_IN = "LOG_IN";

// 액션 크리에이터
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const Auth = createAction(AUTH, (user) => ({ user }));

// 초기값
const initialState = {
  nickName: null,
  isLogin: false,
};

// 미들웨어
const loginUser = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(id, pwd)
      .then((response) => {
        console.log(response);
        setCookie("token", response.data.token);
        dispatch(logIn({ id: id }));
        history.replace("/");
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
      .signup(userId, password, comPwd, nickName)
      .then((response) => {
        alert(response.data.msg);
        history.replace("/");
      })
      .catch((error) => {
        alert("회원가입 먼저 해주세요!");
        console.log(error);
      });
  };
};

const logOutUser = () => {
  return function (dispatch, setState, { history }) {
    deleteCookie("token");
    localStorage.removeItem("userId");
    dispatch(logOut());
    history.replace("/");
  };
};

const userInfoAuth = () => {
  return function (dispatch, setState, { history }) {
    apis
      .auth()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
  },
  {
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.isLogin = false;
      }),
  },
  {
    [AUTH]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// 액션 크리에이더 export
const actionCreators = {
  logIn,
  loginUser,
  signupUser,
  logOut,
  logOutUser,
  userInfoAuth,
  Auth,
};

export { actionCreators };
