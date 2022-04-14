import { debounce } from "lodash";
import React from "react";
// import Post from '../components/Post'
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Post from "../components/Post";
import { Button } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const isLogin = useSelector((state) => state.user.isLogin);
  const isToken = document.cookie;

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);

  const postBut = () => {
    if (isLogin && isToken) {
      history.push("/post");
    } else {
      alert("로그인을 먼저 해주세요!");
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <ButtonFix>
        <Button width="150px" color="white" _onClick={postBut}>
          아이디어 기록
        </Button>
      </ButtonFix>
      <Container>
        {post_list.map((p, idx) => {
          return <Post key={idx} {...p}/>;
          
        })}
      </Container>
    </React.Fragment>
  );
};

export default PostList;

const Container = styled.div`
  margin-top: 180px;
`;

const ButtonFix = styled.div`
  position: fixed;
  top: 80px;
  z-index: 0;

  width: 1200px;
  display: flex;
  justify-content: center;

  background-color: white;
`;
