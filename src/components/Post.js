import React, { Component } from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../elements";
import { history } from "../redux/configureStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Post = (props) => {
  //console.log(props.comment)
  const comment = props.comment;
  // console.log(comment);
  const comment_cnt = comment.length;
  // console.log(cnt);

  // const updatedAt = props.updatedAt;
  // console.log(updatedAt);
  // const newdate = updatedAt.substr(0, 10)
  // const newtime = updatedAt.substr(11, 5);  //03:05
  // const hour = newtime.substr(0, 2);
  // const newhour = parseInt(hour) + 9;
  // const min = newtime.substr(4,2);
  // const newupdatedAt = newdate + " " + newhour + "시 " + min + "분";
  // console.log(newupdatedAt)

  return (
    <React.Fragment>
      <Grid
        is_center
        border="0.5px solid white"
        margin="20px 0"
        boxShadow="0px 0px 20px 10px #EEEEEE"
      >
        <Grid is_flex padding="10px">
          <Text bold margin="0 10px">
            {props.nickName}
          </Text>
          <Text margin="10px">{props.createdAt}</Text>
        </Grid>

        {/* <Grid flex_end padding="10px"> */}
        {/* {props.is_me && (<Button width="100px" margin="0 5px" _onClick={() => {history.push(`/post/${props.id}`)}}>수정</Button>)} */}
        {/* <Button width="100px" margin="0 5px" _onClick={() => {history.push(`/post/${props.id}`)}}>수정</Button> */}
        {/* </Grid> */}

        <Grid
          _onClick={() => {
            history.push(`/post/${props._id}`);
          }}
        >
          <Grid>
            <Text bold margin="10px 0 10px 20px" size="20px">
              {props.title}
            </Text>
            <TextHide>
              <Text margin="5px 0 0 20px" color="#9D9D9D">
                {props.content}
              </Text>
            </TextHide>
          </Grid>
          <Grid is_flex padding="5px">
            <Grid is_flex padding="5px" width="150px">
              <Text margin="15px 0 10px 10px">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="search"
                  style={{
                    fontSize: "17px",
                    color: "#4D96FF",
                    marginRight: "4px",
                  }}
                />
                {props.liked.length}
              </Text>
              <Text margin="15px 0 10px 0">
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className="search"
                  style={{
                    fontSize: "17px",
                    color: "#4D96FF",
                    marginRight: "4px",
                  }}
                />
                {comment_cnt}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_name: "IDBtest",

  title: "제목입니다",
  content: "내용입니다",

  like_cnt: 0,
  comment_cnt: 0,

  insert_dt: Date(),

  is_me: false,

  comment: "",
};

const TextHide = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Post;
