import React from "react";
import { Grid, Text, Input, Button } from "../elements";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';


const PostWrite = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state)=>state.post.list);
  console.log(post_list); //6개 목록
  
  const post_id = props.match.params.id;
  //console.log(post_id);
  const is_edit = post_id ? true : false;
  let _post = is_edit ? post_list.find((p)=>p._id === post_id) : null;
  console.log(_post);


  const [title, setTitle] = React.useState(_post ? _post.title : "");
  const [content, setContent] = React.useState(_post ? _post.content : "");

  // console.log(content)

  const addPost = () => {
    if(!content || !title){
      alert("제목과 내용 입력은 필수입니다!");
      return;
    }
    dispatch(postActions.addPostFB(title, content));
  }

  const editPost = () => {
   // dispatch(postActions.editPostFB(post_id, {title : title, content : content}))
  }

  return (
    <>
      <Grid padding="20px" margin="100px 0 0 0">
        <Grid border="1mm ridge #90e0ef" bg="#cbf3f0" margin="10px 0px 40px 0px">
          <Text bold textAlign="center" size="36px">
            I:DB 저장
          </Text>
        </Grid>

        <Grid>
          <Input label="제목" placeholder="제목을 입력해주세요." _onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
        </Grid>
        <Grid margin="50px 0px 10px 0px">
          <Input label="아이디어 내용" placeholder="아이디어 내용 작성" multiLine _onChange={(e)=>{setContent(e.target.value)}} value={content}/>
        </Grid>
        
        
        <Button
          text="작성 완료"
          width="230px"
          margin="20px 35% 30px"
          _onClick={addPost}
        />
      </Grid>
    </>
  );
};

export default PostWrite;
