import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { Button, Grid } from "../elements";
import styled from "styled-components";
import Main from "../pages/Main";
// import Header from "../components/Header";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import Header from "../components/Header";
import { actionCreators as useActions } from "../redux/modules/user";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(useActions.loginCheck());
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Grid>
          <Header></Header>

          <ConnectedRouter history={history}>
            <Route path="/" exact component={Main} />

            <Route path="/postList" exact component={PostList} />
            <Route path="/post/:id" exact component={PostDetail} />
            <Route path="/post" exact component={PostWrite} />
            <Route path="/modify/:id" exact component={PostWrite} />

            <Route path="/login" exact component={Login} />
            <Route path="/join" exact component={Signup} />
          </ConnectedRouter>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  height: 100%;
`;
