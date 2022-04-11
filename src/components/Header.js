import React from "react";
import { Grid, Text, Button } from "../elements";
// import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import IDBLogo from "../imgs/IDBLogo.png";
// import Permit from "../shared/Permit";

const Header = (props) => {
  //const [is_login, setIsLogin] = React.useState(false);
  //   const is_login = useSelector((state)=>state.user.is_login);
  const dispatch = useDispatch();

  // React.useEffect(()=>{
  //   let cookie = getCookie("user_id");
  //   console.log(cookie);

  //   if(cookie){
  //     setIsLogin(true);
  //   }else{
  //     setIsLogin(false);
  //   }
  // });

  //   const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;  //Permit으로 넘김
  //   const is_session = sessionStorage.getItem(_session_key)? true : false;
  //console.log(_session_key);
  //console.log(sessionStorage.getItem(_session_key));  //세션 정보 확인

  // if(is_login && is_session){
  // return (
  //   <React.Fragment>
  //         <Grid is_flex padding="4px 16px">
  //             <Grid>
  //                  <Text margin="20px 0" size="24px" bold _onClick={()=>{history.push("/")}}>IDB</Text>

  //             </Grid>

  //             <Grid is_flex>
  //                 <Button text="내 정보" _onClick={()=>{}}></Button>
  //                 <Button text="알림" margin="0 5px"></Button>
  //                 {/* <Button text="로그아웃" _onClick={()=>{dispatch(userActions.logoutFB())}}></Button> */}
  //             </Grid>
  //         </Grid>
  //     </React.Fragment>
  // )
  //   }

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
        <LogoImage alt="IDBLogo" src={IDBLogo} onClick={()=>{ history.push("/postList");}}/>
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
background-color : white;
align-items: center;

width : 1200px;

position : fixed;
top : 0;
z-index : 0;

p {
  font-weight: bolder;
  color: white;
  font-size: 25px;
}
`

const LogoImage = styled.img`
  width : 27%;
  margin-left : 10px;
  &:hover {
    cursor : pointer;
  }
`;