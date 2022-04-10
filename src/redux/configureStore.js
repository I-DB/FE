import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import Post from "./modules/post";

// import User from "./modules/user";
// import Post from "./modules/post";
// import Like from "./modules/like";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  // user: User,
  post: Post,
  // like: Like,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })]; //.then 이후 history 작업

const env = process.env.NODE_ENV;

// 개발환경에서의 logger 추가
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();