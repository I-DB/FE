import React from "react";
import Post from "../components/Post";
import { Button, Grid, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {actionCreators as postActions} from "../redux/modules/post";
import { history } from "../redux/configureStore";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  // const user_info = useSelector((state)=>state.user.user);
  const post_list = useSelector((state)=>state.post.list);
  //console.log(post_list);

  const id = props.match.params.id;
  const post = post_list.find((p)=>p._id === id);
  //console.log(post);


  //   React.useEffect(()=>{
  //     if(post){
  //       return;
  //     }
  //     dispatch(postActions.loadOnePostFB(id));
  //   })

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
    // <>
    //   <Grid is_center height="100vh">
    //     <Container>
    //       <Text>작성자 (닉네임)</Text>
    //       <Text>아이디어 (제목) : 강아지 간식 추천 사이트?</Text>
    //       <Text>
    //         내용 : <p>간식 추천 사이트에 필요한 기능 뭐가 있나요?</p>
    //         <p>추천 부탁드립니다</p>
    //       </Text>
    //       <div>아래는 좋아요, 댓글, 필요시 수정 및 삭제 버튼 필요!!!</div>
    //     </Container>
    //   </Grid>
    // </>
    <>
    <Grid margin="100px 0 0 0">
      <Post {...post}/>

      {/* <Text>{post._id}</Text> */}

      {
                //props.comment !== 0(
                  post.comment.map((p, idx)=>{
                    return(
                      <>
                          <Text key={idx}>{p.nickName}</Text>
                          <Text key={idx+1}>{p.userId}</Text>
                          <Text key={idx+2}>{p.content}</Text>
                          
                      </>
                    )
                  })
                //)


              }
    <Button width="150px" _onClick={() => {history.push(`/modify/${id}`)}}>수정</Button>
    <Button width="150px" margin="0 0 0 10px" _onClick={deletePost}>삭제</Button>
    </Grid>
    </>
  );
};

export default PostDetail;

const Container = styled.div`
  width: 800px;
  height: 700px;
  background-color: #4d96ff;
`;