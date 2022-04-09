import React from "react";
import styled from "styled-components";
import { Button, Grid } from "../elements";
import IDBMain from "../imgs/IDBMain.png";
import { history } from "../redux/configureStore";

const Main = () => {
  return (
    <Grid is_center>
      <MainImage alt="IDBMain" src={IDBMain} />
      <Button
        width="150px"
        height="60px"
        margin="10px 0 50px 0"
        _onClick={() => {
          history.replace("/postList");
        }}
      >
        시작하기!
      </Button>
    </Grid>
  );
};

export default Main;

const MainImage = styled.img`
  width: 95%;
  margin-top: 50px;
`;
