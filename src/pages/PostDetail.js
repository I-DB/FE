import React, {useState} from "react";
import Post from "../components/Post";
import { Button, Grid, Input, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

import { apis } from "../shared/axios";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  // const post_list = useSelector((state) => state.post.list);

  const postOne = useSelector((state) => state.post.target);

  const likeList = useSelector((state) => state.post.like_list);
  console.log(likeList)
  const [likeLength, setLikeLength] = useState(likeList.length);
  
  const id = props.match.params.id;
  const [is_like, setIsLike] = useState(false);

  const localUserId = localStorage.getItem("userId");
  const likeUser = likeList.find((p) => p === localUserId);

  const userId = postOne.userId;
  //const newdate = postOne.updatedAt.substr(0, 10);

  const likeCheck = () => {
      if(!localUserId){
        alert("로그인 후 이용 가능합니다!");
        history.replace("/login");
      }
      dispatch(postActions.addLike(id));
      setIsLike(true);
      setLikeLength(likeLength+1);

    // apis.addLike(id)
    // .then((res)=>{
    //   setIsLike(true);
    //   dispatch(postActions.getPostOneDB(id));
    //})
  };

  const unlikeCheck = () => {
    if(!localUserId){
      alert("로그인 후 이용 가능합니다!");
      history.replace("/login");
    }
      dispatch(postActions.addUnlike(id));
      setIsLike(false);
      setLikeLength(likeLength-1);
  };


  React.useEffect(() => {
    dispatch(postActions.getPostOneDB(id));
    //console.log(likeUser)
    if(likeUser) {
      setIsLike(true);
    }
  }, []);


  const deletePost = () => {
    alert("삭제가 완료되었습니다!");
    dispatch(postActions.deletePostDB(id));
  };

  return (
    <>
      <Grid margin="200px 0 0 0" height="auto" is_flex>
        <LeftContainer>
          {/* <Post {...post}/> */}
          <Container>
            <Grid is_flex height="120px">
              <Text bold margin="25px 0 0 30px" size="15px">
                작성자 : {postOne.nickName}
              </Text>
              <Text margin="0 15px 0 0" color="darkgrey">
              </Text>
            </Grid>
            <Grid>
              <Text bold margin="25px 0 0 30px" size="18px" color="#4D96FF">
                제목 : {postOne.title}
              </Text>
              <Text bold margin="25px 0 0 30px" size="15px">
                내용 : {postOne.content}
              </Text>
            </Grid>
          </Container>

          <Bottom>
            {is_like ? (
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{
                  fontSize: "20px",
                  color: "red",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
                onClick={unlikeCheck}
              /> 
            ) : (
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{
                  fontSize: "20px",
                  color: "#4D96FF",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
                onClick={likeCheck}
              />
            )}
            {/* {likeList.length} */}
            {likeLength} 


            <ButtonFlex>
              {localUserId === userId ? (
                <Button
                  width="150px"
                  _onClick={() => {
                    history.push(`/modify/${id}`);
                  }}
                >
                  수정
                </Button>
              ) : (
                ""
              )}
              {localUserId === userId ? (
                <Button width="150px" margin="0 0 0 10px" _onClick={deletePost}>
                  삭제
                </Button>
              ) : (
                ""
              )}
            </ButtonFlex>
          </Bottom>
        </LeftContainer>

        {/* ~ 댓글 부분 ~ */}
        {/* <Grid height="20px" width="800px" margin="0 0 30px 0"> */}
        {/* <Grid> */}
        <LeftContainer>
          <Text is_flex bold color="#4D96FF" size="18px" margin="0 0 0 15px">
            댓글
            <FontAwesomeIcon
              icon={faCommentDots}
              className="search"
              style={{
                fontSize: "17px",
                color: "#4D96FF",
                marginRight: "5px",
                marginLeft: "5px",
              }}
            />
            {/* {postOne.comment.length} */}
          </Text>
          {/* </Grid> */}

          <InputComment></InputComment>
          <Buttons>등록</Buttons>

          <CommentContainer>
            {postOne.comment
              ? postOne.comment.map((p, idx) => {
                  return (
                    <Grid
                      height="100px"
                      width="500px"
                      padding="20px"
                      is_flex
                      key={idx}
                    >
                      <Grid>
                        <Text key={idx + 1} bold>
                          {p.nickName}
                        </Text>
                        <Text key={idx + 2}>{p.content}</Text>
                      </Grid>

                      <Buttons>수정</Buttons>
                      <Buttons>삭제</Buttons>
                    </Grid>
                  );
                })
              : []}
          </CommentContainer>
        </LeftContainer>
      </Grid>
    </>
  );
};

export default PostDetail;

const Container = styled.div`
  width: 700px;
  height: 600px;
  box-shadow: 0px 0px 20px 10px #eeeeee;
  display: flex;
  flex-direction: column;
`;

const ButtonFlex = styled.div`
  width: 670px;
  display: flex;
  justify-content: flex-end;
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
  border-radius: 5px;

  margin-left: 5px;
`;

const Bottom = styled.div`
  margin: 10px 10px 30px 0px;
`;

const CommentContainer = styled.div`
  width: 500px;
  height: 200px;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LeftContainer = styled.div`
  height: 600px;
`;

const InputComment = styled.input`
  width: 400px;
  margin-left: 10px;
`;
