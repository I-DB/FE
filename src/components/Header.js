import React, { useEffect } from "react";
import { Grid, Text, Button } from "../elements";
// import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import IDBLogo from "../imgs/IDBLogo.png";
// import Permit from "../shared/Permit";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  //const [is_login, setIsLogin] = React.useState(false);
  //   const is_login = useSelector((state)=>state.user.is_login);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const isToken = document.cookie;

  const logOut = () => {
    dispatch(userActions.logOutUser());
  };

  if (isLogin && isToken) {
    return (
      <Container>
        <Grid>
          {/* <Text
            margin="20px 0"
            size="24px"
            bold
            _onClick={() => {
              history.push("/postList");
            }}
          >
            IDB
          </Text> */}
          <LogoImage
            alt="IDBLogo"
            src={IDBLogo}
            onClick={() => {
              history.push("/postList");
            }}
          />
        </Grid>

        <Grid flex_end>
          <Button
            text="로그아웃"
            margin="0 10px"
            width="150px"
            color="black"
            backgroundColor="transparent"
            _onClick={logOut}
          ></Button>
        </Grid>
        {/* </Grid> */}
      </Container>
    );
  }

  return (
    <React.Fragment>
      {/* <Grid is_flex padding="4px 16px"> */}
      <Container>
        <Grid>
          {/* <Text
            margin="20px 0"
            size="24px"
            bold
            _onClick={() => {
              history.push("/postList");
            }}
          >
            IDB
          </Text> */}
          <LogoImage
            alt="IDBLogo"
            src={IDBLogo}
            onClick={() => {
              history.push("/postList");
            }}
          />
        </Grid>

        <Grid flex_end>
          <Button
            text="로그인"
            margin="0 10px"
            width="150px"
            color="black"
            backgroundColor="transparent"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            text="회원가입"
            width="150px"
            color="black"
            backgroundColor="transparent"
            _onClick={() => {
              history.push("/join");
            }}
          ></Button>
        </Grid>
        {/* </Grid> */}
      </Container>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  align-items: center;

  width: 1200px;

  position: fixed;
  top: 0;
  z-index: 0;

  p {
    font-weight: bolder;
    color: white;
    font-size: 25px;
  }
`;

const LogoImage = styled.img`
  width: 27%;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;
