import { createAction, handleActions } from "redux-actions";
import jwtDecode from "jwt-decode";
import produce from "immer";
import { apis } from "../../shared/axios";
import { setCookie, deleteCookie } from "../../shared/cookie";

// 액션

const LOG_OUT = "LOG_OUT";
const LOG_IN = "LOG_IN";

// 액션 크리에이터
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// 초기값
const initialState = {
  nickName: null,
  isLogin: false,
};

// 미들웨어

// 회원가입
const signupUser = (userId, password, nickName, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(userId, password, confirmPassword, nickName)
      .then((response) => {
        console.log(response);
        alert(response.data.msg);
        history.replace("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
};

// 로그인
const loginUser = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(id, pwd)
      .then((response) => {
        const data = response.data.token;
        setCookie("token", response.data.token);
        const userInfo = jwtDecode(data);
        localStorage.setItem("nickName", userInfo.nickName);
        localStorage.setItem("userId", userInfo.userId);
        dispatch(logIn({ id: id }));
        history.replace("/postList");
      })
      .catch((error) => {
        alert("회원이 아니거나 아이디와 비밀번호가 틀렸습니다!");
      });
  };
};

// 로그아웃
const logOutUser = () => {
  return function (dispatch, setState, { history }) {
    deleteCookie("token");

    localStorage.removeItem("userId");
    localStorage.removeItem("nickName");
    dispatch(logOut());
    history.replace("/");
  };
};

// 로그인 체크
const loginCheck = () => {
  return function (dispatch, setState, { history }) {
    const tokenCheck = document.cookie;
    const userId = localStorage.getItem("userId");
    // const userId
    if (tokenCheck) {
      dispatch(logIn({ userId: userId }));
    } else {
      dispatch(logOutUser());
    }
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

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.isLogin = false;
      }),
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
  loginCheck,
};

export { actionCreators };
