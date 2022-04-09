import React from "react";
import { Button, Grid, Input, Text } from "../elements";

const Login = () => {
  return (
    <>
      <Grid border="1mm ridge #90e0ef" bg="#cbf3f0">
        <Text size="30px" bold textAlign="center">
          로그인
        </Text>
        <Grid padding="15px 20%">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주새요."
            _onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="15px 20%">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Grid>
        <Button
          text="로그인"
          width="230px"
          margin="20px 35% 30px"
          _onClick={() => {
            console.log("로그됨");
          }}
        />
      </Grid>
    </>
  );
};

export default Login;
