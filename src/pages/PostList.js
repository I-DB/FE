import React from "react";
// import Post from '../components/Post'
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { Button } from "../elements";
import { history } from "../redux/configureStore";

const PostList = (props) => {
  // const post_list = useSelector((state)=>state.post.list);
  // const user_info = useSelector((state)=>state.user.user);
  const dispatch = useDispatch();

  // const is_loading = useSelector((state)=>state.post.is_loading);
  // const paging = useSelector((state)=>state.post.paging);

  // React.useEffect (() =>{

  // }, []);

  return (
    <React.Fragment>
      <Button
        width="100px"
        _onClick={() => {
          history.replace("/post");
        }}
      >
        작성
      </Button>
      {/* {post_list.map((p, idx)=>{
                if(user_info && p.user_info.user_id === user_info.id){
                    return <Post key={idx} {...p} is_me/>
                }else{
                    return <Post key={idx} {...p} />
                }
            
            })} */}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </React.Fragment>
  );
};

export default PostList;
