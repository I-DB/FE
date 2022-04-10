import React from "react";
// import Post from '../components/Post'
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Post from "../components/Post";
import { Button } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  // const post_list = useSelector((state)=>state.post.list);
  // const user_info = useSelector((state)=>state.user.user);

  // const is_loading = useSelector((state)=>state.post.is_loading);
  // const paging = useSelector((state)=>state.post.paging);

  // React.useEffect (() =>{

  // }, []);
  const dispatch = useDispatch();
  const post_list = useSelector((state)=>state.post.list);
  
  React.useEffect(()=>{
    //  if(post_list.length === 0) {
      dispatch(postActions.getPostFB());
    //  }
  }, []);

  return (
    <React.Fragment>
      <Container>
      <Button
        width="100px"
        _onClick={() => {
          history.push("/post");
        }}
      >
        작성
      </Button>

      {post_list.map((p, idx)=>{
        return(
              <Post key={idx} {...p}/>
        )
      })}
      
      </Container>
      
    </React.Fragment>
  );
};

export default PostList;

const Container = styled.div`
  margin-top : 100px;

`;