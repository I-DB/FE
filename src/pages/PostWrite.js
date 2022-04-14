import React from "react";
import { Grid, Text, Input, Button } from "../elements";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import styled from "styled-components";


const PostWrite = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state)=>state.post.list);
  //console.log(post_list); //6개 목록
  
  const post_id = props.match.params.id;
  //console.log(post_id);
  const is_edit = post_id ? true : false;
  // console.log(is_edit);
  let _post = is_edit ? post_list.find((p)=>p._id === post_id) : null;
  //console.log(_post);


  const [title, setTitle] = React.useState(_post ? _post.title : "");
  const [content, setContent] = React.useState(_post ? _post.content : "");

  // console.log(content)

  const addPost = () => {
    if(!content || !title){
      alert("제목과 내용 입력은 필수입니다!");
      return;
    }
    dispatch(postActions.addPostDB(title, content));
  }

  const editPost = () => {
   dispatch(postActions.editPostDB(post_id, title, content))
  }

  return (
    <>
      <Grid padding="20px" margin="200px 0 0 0" is_center>
        <Container>
        <Grid margin="10px 0px 40px 0px" height="50px">
          <Text bold textAlign="center" size="20px" color="#8CA1A5">
            {is_edit ? "✍ 아이디어 수정" : "✍ 자신만의 아이디어를 남겨보세요!"}
          </Text>
        </Grid>

        <Grid width="500px" height="80px" margin="0 0 0 20px">
          <Input border="none" type="text" label="제목" placeholder="제목을 입력해주세요." _onChange={(e)=>{setTitle(e.target.value)}} maxLength="30" value={title}/>
        </Grid>
        <Grid width="750px" height="80px" margin="0 0 0 20px">
          <Input resize label="아이디어 내용" placeholder="자유롭게 아이디어를 표현하세요!" border="none" multiLine _onChange={(e)=>{setContent(e.target.value)}} value={content}/>
          {/* <input label="아이디어 내용" placeholder="아이디어 내용 작성" onChange={(e)=>{setContent(e.target.value)}} value={content} /> */}
        </Grid>
        </Container>
        
        <Grid padding="16px">
        {is_edit ? (
              <Grid is_center>
              <Button text="수정 완료" width="150px" _disabled={!title || content === "" ? true : false} _onClick={editPost}></Button>
              </Grid>
            ) : (
              <Grid is_center>
              <Button text="작성 완료" width="150px" _disabled={!title || content === "" ? true : false} _onClick={addPost}></Button>
              </Grid>
            ) }
      </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;

const Container = styled.div`
width: 800px;
height: 600px;
box-shadow: 0px 0px 20px 10px #EEEEEE;
display : flex;
flex-direction : column;
`;