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
    <Grid height="100vh" is_center>
      <Grid bg="#F3E9DD" margin="100px 0 0 0" width="500px" height="700px" is_center borderRadius="10px">
        <Text size="25px" bold textAlign="center">
          회원가입
        </Text>
        <Grid padding="15px 20%" height="100px">
          <Input
            label=""
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setUserId(e.target.value);
            }}
            value={userId}
          />
        </Grid>
        <Grid padding="15px 20%" height="100px">
          <Input
            label=""
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPassWord(e.target.value);
            }}
            value={password}
          />
        </Grid>
        <Grid padding="15px 20%" height="100px">
          <Input
            label=""
            placeholder="비밀번호를 확인해주세요."
            type="password"
            _onChange={(e) => {
              setComPwd(e.target.value);
            }}
            value={comPwd}
          />
        </Grid>
        <Grid padding="15px 20%" height="100px">
          <Input
            label=""
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setNickName(e.target.value);
            }}
            value={nickName}
          />
        </Grid>
        <Button text="가입하기" width="230px" margin="10px 35% 30px" _onClick={join} />
      </Grid>
      </Grid>
    </>
  );
};

export default Signup;
