import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";
import { actionCreators as useActions } from "../redux/modules/user";

const Signup = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState();
  const [password, setPassWord] = useState();
  const [nickName, setNickName] = useState();
  const [comPwd, setComPwd] = useState();

  const join = () => {
    dispatch(useActions.signupUser(userId, password, nickName, comPwd));
  };

  return (
    <>
      <Grid border="1mm ridge #90e0ef" bg="#cbf3f0" margin="100px 0 0 0">
        <Text size="30px" bold textAlign="center">
          회원가입
        </Text>
        <Grid padding="15px 20%">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주새요."
            _onChange={(e) => {
              setUserId(e.target.value);
            }}
            value={userId}
          />
        </Grid>
        <Grid padding="15px 20%">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPassWord(e.target.value);
            }}
            value={password}
          />
        </Grid>
        <Grid padding="15px 20%">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setComPwd(e.target.value);
            }}
            value={comPwd}
          />
        </Grid>
        <Grid padding="15px 20%">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주새요."
            _onChange={(e) => {
              setNickName(e.target.value);
            }}
            value={nickName}
          />
        </Grid>
        <Button text="가입하기" width="230px" margin="10px 35% 30px" _onClick={join} />
      </Grid>
    </>
  );
};

export default Signup;
