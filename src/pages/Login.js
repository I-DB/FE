import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input, Text } from "../elements";
import { actionCreators as useActions } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();
  const [pwd, setPwd] = useState();

  const login = () => {
    dispatch(useActions.loginUser(id, pwd));
  };

  return (
    <>
    <Grid height="100vh" is_center>
      <Grid bg="#F3E9DD" margin="100px 0 0 0" width="500px" height="700px" is_center borderRadius="10px">
      <Text size="18px"  textAlign="center" color="#889EAF" bold>
          세상을 바꾸는 <Text color="#4D96FF" bold size="18px">I:DB</Text>
        </Text>
        <Text size="25px" bold textAlign="center">
          로그인
        </Text>
        <Grid padding="15px 20%" height="100px">
          <Input
            label=""
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
          />
        </Grid>
        <Grid padding="15px 20%" height="100px">
          <Input
            label=""
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
          />
        </Grid>
        <Button
          text="로그인"
          width="230px"
          margin="20px 35% 30px"
          _onClick={login}
        />
      </Grid>
    </Grid>
    </>
  );
};

export default Login;
