import React from "react";
import { Grid, Text, Input, Button } from "../elements";

const PostWrite = () => {
  return (
    <>
      <Grid padding="20px">
        <Grid border="1mm ridge #90e0ef" bg="#cbf3f0" margin="10px 0px 40px 0px">
          <Text bold textAlign="center" size="36px">
            I:DB 저장
          </Text>
        </Grid>

        <Grid>
          <Input label="제목" placeholder="제목을 입력해주세요." />
        </Grid>
        <Grid margin="50px 0px 10px 0px">
          <Input label="아이디어 내용" placeholder="아이디어 내용 작성" multiLine />
        </Grid>
        <Button
          text="작성 완료"
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

export default PostWrite;
