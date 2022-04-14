import React, { useState } from "react";
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

  const postOne = useSelector((state) => state.post.target);
  const likeList = useSelector((state) => state.post.like_list);

  const id = props.match.params.id;
  const [is_like, setIsLike] = useState(false);

  const localUserId = localStorage.getItem("userId");
  const likeUser = likeList.find((p) => p === localUserId);

  const userId = postOne.userId;

  const likeCheck = () => {
    if (!localUserId) {
      alert("로그인 후 이용 가능합니다!");
      history.replace("/login");
    }
    dispatch(postActions.addLike(id, userId));
    setIsLike(true);
  };

  const unlikeCheck = () => {
    if (!localUserId) {
      alert("로그인 후 이용 가능합니다!");
      history.replace("/login");
    }
    dispatch(postActions.addUnlike(id, userId));
    setIsLike(false);
    window.location.reload();
  };

  React.useEffect(() => {
    dispatch(postActions.getPostOneDB(id));
  }, []);

  const deletePost = () => {
    alert("삭제가 완료되었습니다!");
    dispatch(postActions.deletePostDB(id));
  };

  return (
    <>
      <Grid margin="200px 0 0 0" height="auto" is_flex>
        <LeftContainer>
          <Container>
            <Grid is_flex height="120px">
              <Text bold margin="25px 0 0 30px" size="14px">
                작성자 : {postOne.nickName}
              </Text>
              <Text margin="0 15px 0 0" color="darkgrey"></Text>
            </Grid>
            <Grid>
              <Text bold margin="25px 0 0 30px" size="14px" color="darkgrey">
                제목
              </Text>
              <Text bold margin="25px 0 0 30px" size="17px" color="#4D96FF">
                {postOne.title}
              </Text>
              <Text bold margin="25px 0 0 30px" size="14px" color="darkgrey">
                아이디어 내용
              </Text>
              <Text bold margin="25px 0 0 30px" size="15px">
                {postOne.content}
              </Text>
            </Grid>
          </Container>

          <Bottom>
            {likeUser || is_like === true ? (
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{
                  fontSize: "25px",
                  color: "red",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
                onClick={unlikeCheck}
              />
            ) : !likeUser || is_like !== true ? (
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{
                  fontSize: "25px",
                  color: "#4D96FF",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
                onClick={likeCheck}
              />
            ) : null}{" "}
            <Text color="#5584AC">Good Idea!</Text>
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

        <LeftContainer>
          <Comments id={props} />
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

const Bottom = styled.div`
  margin: 10px 10px 30px 0px;
`;

const LeftContainer = styled.div`
  height: 600px;
`;
