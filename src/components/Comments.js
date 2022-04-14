import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mentAtions } from "../redux/modules/comment";
import { apis } from "../shared/axios";
import Content from "./Content";
import { useHistory } from "react-router-dom";

const Comments = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const isToken = document.cookie;

  const id = props.id.match.params.id;

  const mentroad = useSelector((state) => state.comment.comment);

  useEffect(() => {
    apis
      .postGet()
      .then((res) => {
        const data = res.data.result;
        const post = data.find((p) => p._id === id);
        const comment = post.comment;
        const comment_cnt = comment.length;
        dispatch(mentAtions.getment(post, comment, comment_cnt));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addMent = () => {
    if (!isToken) {
      alert("로그인을 먼저 해주세요!");
      history.replace("/login");
      return;
    }

    if (content) {
      dispatch(mentAtions.__mentAdd(id, content));
    } else {
      alert("공란 입니다!");
      return;
    }
    setContent("");
  };

  return (
    <>
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
      </Text>

      <InputComment
        type="text"
        placeholder="의견을 남겨주세요!"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></InputComment>
      <Buttons onClick={addMent}>등록</Buttons>

      <CommentContainer>
        {mentroad
          ? mentroad.map((p, idx) => {
              return <Content id={props} {...p} key={idx} />;
            })
          : null}
      </CommentContainer>
    </>
  );
};
const InputComment = styled.input`
  width: 400px;
  margin-left: 20px;
  height : 40px;
  border-radius : 5px;
  border : none;
  background-color : #EEEEEE;
  padding : 4px;
`;

const CommentContainer = styled.div`
  width: 500px;
  height: 500px;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  margin-left : 10px;

`;

const Buttons = styled.button`
  all: unset;
  text-decoration: none;
  text-align: center;
  color: white;

  margin: 25px 10px 0px 0px;

  font-weight: 700;
  font-size: 14px;
  width: 40px;
  height: 25px;
  background-color: silver;
  border-radius: 5px;

  margin-left: 5px;
`;

export default Comments;
