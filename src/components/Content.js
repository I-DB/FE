import React from "react";
import { Grid, Text, OpenInput } from "../elements";
import styled from "styled-components";
import { useState } from "react";
import { actionCreators as mentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";

const Content = (props) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const id = props.id.id.match.params.id;

  const [openInput, setOpenInput] = useState(false);

  const userId = localStorage.getItem("userId");

  const inputOpen = () => {
    setOpenInput(!openInput);
  };

  return (
    <>
      <Grid height="100px" width="500px" padding="20px" is_flex>
        <Grid>
          <Text bold>{props.nickName}</Text>

          {openInput === false ? (
            <>{<Text>{props.content}</Text>}</>
          ) : (
            <>
              <Grid is_flex>
                <input
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  defaultValue={comment}
                ></input>
                <InputBtn
                  onClick={() => {
                    const commentId = props._id;

                    setOpenInput(!openInput);
                    dispatch(mentActions.__mentUpdata(id, comment, commentId));
                    setComment("");
                  }}
                >
                  완료
                </InputBtn>
              </Grid>
            </>
          )}
        </Grid>
        <Grid />
        {userId === props.userId ? (
          <>
            <Grid>
              <Buttons onClick={inputOpen}>수정</Buttons>
              <Buttons
                onClick={() => {
                  const commentId = props._id;
                  dispatch(mentActions.__mentDelete(id, commentId));
                }}
              >
                삭제
              </Buttons>
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default Content;

const InputBtn = styled.button`
  all: unset;
  text-decoration: none;
  text-align: center;
  color: white;
  /* margin: 25px 10px 0px 0px; */

  font-weight: 700;
  font-size: 14px;
  width: 40px;
  height: 25px;
  background-color: silver;
  border-radius: 5px;
  margin-left: 5px;
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
