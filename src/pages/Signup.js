import React from "react";
import { Grid, Text, Input, Button } from "../elements";

const Signup = () => {
  return (
    <>
      <Grid border="1mm ridge #90e0ef" bg="#cbf3f0">
        <Text size="30px" bold textAlign="center">
          회원가입
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
        <Grid padding="15px 20%">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="15px 20%">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주새요."
            _onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Grid>
        <Button
          text="가입하기"
          width="230px"
          margin="10px 35% 30px"
          _onClick={() => {
            console.log("회원가임됨");
          }}
        />
      </Grid>
    </>
  );
};

export default Signup;
