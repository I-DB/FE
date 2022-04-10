import React, { Component } from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../elements";
import { history } from "../redux/configureStore";

const Post = (props) => {

  //console.log(props.comment)
  const comment = props.comment;

  return (

    <React.Fragment>
      <Grid is_center border="0.5px solid silver" margin="20px 0">
        <Grid is_flex padding="10px">
          <Text bold>{props.nickName}</Text>
          <Text>{props.createdAt}</Text>
        </Grid>

        <Grid flex_end padding="10px">
          {/* {props.is_me && (<Button width="100px" margin="0 5px" _onClick={() => {history.push(`/post/${props.id}`)}}>수정</Button>)} */}
          {/* <Button width="100px" margin="0 5px" _onClick={() => {history.push(`/post/${props.id}`)}}>수정</Button> */}
        </Grid>


        <Grid
          _onClick={() => {
            history.push(`/post/${props._id}`);
          }}
        >
          <Grid>
            <Text bold margin="0 0 10px 20px">
            {props.title}
            </Text>
            <TextHide>
              <Text margin="0 0 0 20px">{props.content}</Text>
            </TextHide>
          </Grid>
          <Grid is_flex padding="5px">
            <Grid is_flex padding="5px" width="150px">

            {/* 댓글 가져오기 연습 */}
            
              {/* {
                //props.comment !== 0(
                  comment.map((p, idx)=>{
                    return(
                          <Text key={idx}>{p.userId}</Text>
                    )
                  })
                //)


              } */}
            
              <Text>좋아요 개</Text>
              {/* <Text>댓글 {props.comment_cnt}개</Text> */}
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
  content:
    "사랑의 앞이 튼튼하며, 거친 사막이다. 청춘의 보배를 기쁘며, 날카로우나 구하지 하여도 그러므로 뿐이다. 이상 무엇을 목숨을 그들에게 천하를 능히 위하여, 그들은 듣기만 부패뿐이다. 내는 오직 실로 두손을 봄바람이다. 어디 무엇이 소금이라 있으며, 예가 기관과 인류의 뿐이다. 풀이 청춘의 지혜는 창공에 인간은 때까지 봄바람이다. 인류의 피는 주며, 자신과 쓸쓸하랴? 돋고, 그들의 것은 위하여, 그와 위하여서. 수 웅대한 설레는 피가 청춘이 피고, 것이다. 이는 이상이 구하기 생생하며, 천하를 운다. 어디 꾸며 것은 현저하게 작고 인간의 눈에 것이다. 가장 그들의 실현에 그들의 맺어, 있으랴? 실로 싶이 유소년에게서 얼음에 새 풀밭에 보라. 무엇을 위하여서 튼튼하며, 찾아 들어 우는 피가 구하기 풍부하게 것이다. 두손을 청춘의 물방아 따뜻한 쓸쓸하랴? 과실이 현저하게 몸이 청춘 이는 꽃이 피고, 것이 뭇 아니다. 오직 같으며, 인간은 곧 있는 있는 위하여서. 우리 방황하여도, 꽃이 청춘을 이것이다. 것이다.보라, 열락의 청춘이 싶이 크고 끓는다. 창공에 그들을 노년에게서 봄바람을 밝은 하여도 것이다. 얼음 착목한는 것은 있을 거선의 두기 속잎나고, 것이다.",

  like_cnt: 0,
  comment_cnt: 11,

  insert_dt: "2022-04-01 10:00:00",

  is_me: false,

  comment: "",
};

const TextHide = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Post;