import React from "react";
import Post from "../components/Post";
import { Button, Grid, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {actionCreators as postActions} from "../redux/modules/post";
import { history } from "../redux/configureStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  // const user_info = useSelector((state)=>state.user.user);
  const post_list = useSelector((state)=>state.post.list);
  //console.log(post_list);

  const id = props.match.params.id;
  const post = post_list.find((p)=>p._id === id);
  //console.log(post);
  //console.log(props.user_Id);
  const comment = post.comment;
  // console.log(comment);
  const comment_cnt = comment.length;


    // React.useEffect(()=>{
  //     if(post){
  //       return;
  //     }
  //     dispatch(postActions.loadOnePostFB(id));

    // }, []);

  const deletePost = () => {
      alert("삭제가 완료되었습니다!");
      dispatch(postActions.deletePostDB(id));
    };

  return (
    // <>

    //   {post && (
    //     <>
    //       <Post {...post} is_me={post.user_info.user_id === user_info?.id} />
    //       {post.user_info.user_id === user_info?.id ? (
    //         <Grid is_flex>
    //           <Button width="100px" margin="0 5px" _onClick={deletePost} >삭제하기</Button>
    //         </Grid>
    //       ) : null}
    //     </>
    //   )}
    // </>

    <>
    <Grid margin="200px 0 0 0" height="auto" is_center>
      {/* <Post {...post}/> */}
      <Container>
      <Grid is_flex height="120px">
        <Text bold margin="25px 0 0 30px" size="15px">작성자 : {post.nickName}</Text>
        <Text margin="0 15px 0 0" color="darkgrey">{post.updatedAt}</Text>
      </Grid>
      <Grid>
        <Text bold margin="25px 0 0 30px" size="18px" color="#4D96FF">제목 : {post.title}</Text>
        <Text bold margin="25px 0 0 30px" size="15px">내용 : {post.content}</Text>
      </Grid>

      </Container>

      
      <Bottom>
        <FontAwesomeIcon icon={faThumbsUp} className="search" style={{fontSize:"20px", color:"#4D96FF"}}/> 10

        <ButtonFlex>
          <Button width="150px" _onClick={() => {history.push(`/modify/${id}`)}}>수정</Button>
          <Button width="150px" margin="0 0 0 10px" _onClick={deletePost}>삭제</Button>
        </ButtonFlex>
      </Bottom>

      <Grid height="20px" width="800px" margin="0 0 30px 0">
        
        <Text is_flex bold color="#4D96FF" size="18px">
        댓글
          <FontAwesomeIcon icon={faCommentDots} className="search" style={{fontSize:"17px", color:"#4D96FF", marginLeft: "8px"}}/> {comment_cnt}
        </Text>
      </Grid>


    <CommentContainer>
      {
          post.comment ? (
            post.comment.map((p, idx)=>{
              return (
                  <>
                  <Grid height="100px" width="780px" is_flex key={idx}>
                  <Grid>
                    <Text key={idx+1} bold>{p.nickName}</Text>
                    <Text key={idx+2}>{p.content}</Text>
                  </Grid>

                  <Buttons>수정</Buttons>
                  <Buttons>삭제</Buttons>
                  </Grid>
                  </>
                )
              })
          ) : null
        }
</CommentContainer>
    
    </Grid>
    </>
  );
};

export default PostDetail;

const Container = styled.div`
  width: 800px;
  height: 600px;
  box-shadow: 0px 0px 20px 10px #EEEEEE;
  display : flex;
  flex-direction : column;
`;

const ButtonFlex = styled.div`
  width: 800px;
  display : flex;
  justify-content : flex-end;
  margin-top : 20px;
  
`;

const Buttons = styled.button`
  all: unset;
  text-decoration: none;
  text-align: center;
  color: white;

  font-weight: 700;
  font-size: 14px;
  width: 40px;
  height: 25px;
  background-color: silver;
  border-radius : 5px;
  
  margin-right : 5px;
`;

const Bottom = styled.div`
  margin : 10px 0 0 10px;
`;

const CommentContainer = styled.div`
  width : 800px;
  height : 200px;
  overflow : auto;

    -ms-overflow-style: none; 
    scrollbar-width: none; 

&::-webkit-scrollbar {
    display: none;
}
`;
