import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import axios from "axios";

//1.
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

//2.
const setPost = createAction(SET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST, (post)=>({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
//const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
//const loading = createAction(LOADING, (is_loading) => ({is_loading}));

//3.
const initialState = {
    list: [],
    is_loading: false,
}

const initialPost = {
    title: "제목제목",
    content: "내용내용",
    liked: 3,
}

//게시글 get
export const getPostFB =
	() =>
	async (dispatch, getState, { history }) => {
		try {
			const { data } = await apis.postGet();
			//console.log(data);
            dispatch(setPost(data.result));
			// dispatch(imageCreators.setPreview(null));
		} catch (e) {
			// console.log(`아티클 조회 오류 발생!${e}`);
		}
	};


//게시글 insert
const addPostFB = (title="", content="") => {
    return function (dispatch, getState, {history}){
        //console.log(title, content);

        const _post = {
            ...initialPost,
            title: title,
            content: content
        }
        //console.log(_post);
        // apis
        // .postWrite(_post,
        axios.post('https://ideadb.shop/post', {
            ...initialPost,
            title: title,
            content: content
        }, {
            headers:{
                'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwZDM5M2E3MWJjYzljOTczYjg3ODkiLCJ1c2VySWQiOiJpbm15Ymx1ZTA5MzBAbmF2ZXIuY29tIiwibmlja05hbWUiOiJibHVlbW9uZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtsN3pLenZpcjFnWmVGWHZRTkt0WWVGTUEzZkxIUmx4TlZFeGZtd0pZcjV3dWhxVm14NzRXIiwiX192IjowLCJpYXQiOjE2NDk1NzgxNDJ9.RVJ4srwCei759Mn6oWVN8RzMV-K6HQ_PsiPHUYvNwhM`
            }
        })
        //{headers: {Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwZDM5M2E3MWJjYzljOTczYjg3ODkiLCJ1c2VySWQiOiJpbm15Ymx1ZTA5MzBAbmF2ZXIuY29tIiwibmlja05hbWUiOiJibHVlbW9uZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtsN3pLenZpcjFnWmVGWHZRTkt0WWVGTUEzZkxIUmx4TlZFeGZtd0pZcjV3dWhxVm14NzRXIiwiX192IjowLCJpYXQiOjE2NDk1NzgxNDJ9.RVJ4srwCei759Mn6oWVN8RzMV-K6HQ_PsiPHUYvNwhM`,}, })
        .then(() => {
            dispatch(addPost(_post));
            history.replace('/postList');
        })
        .catch((err) => {
            window.alert('포스트 작성 실패');
        });
        }
};

//게시글 수정


//게시글 삭제
const deletePostDB = (postId) => {
    return function (dispatch, getsTate, {history}) {
    //   const token = localStorage.getItem('token');
    //   console.log(token)
      axios
        .delete(`https://ideadb.shop/post/${postId}`,
        { headers: {
            'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjUwZDM5M2E3MWJjYzljOTczYjg3ODkiLCJ1c2VySWQiOiJpbm15Ymx1ZTA5MzBAbmF2ZXIuY29tIiwibmlja05hbWUiOiJibHVlbW9uZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtsN3pLenZpcjFnWmVGWHZRTkt0WWVGTUEzZkxIUmx4TlZFeGZtd0pZcjV3dWhxVm14NzRXIiwiX192IjowLCJpYXQiOjE2NDk1NzgxNDJ9.RVJ4srwCei759Mn6oWVN8RzMV-K6HQ_PsiPHUYvNwhM`
        }
    })
        .then(function(response){
          //dispatch(deletePost(postId))
          history.replace('/postList')
        })
        .catch(function(err){
          alert('삭제 실패');
        })
    }
  }


//게시글 하나
// const initialPost = {
    // id : 0,
    // user_info: {
    //     user_name: "seora",
    //     user_profile:
    //       "https://i.pinimg.com/564x/28/2c/2c/282c2c8c7fe6a501a8e2935af4000f46.jpg",
    //   },
//       image_url:
//         "https://i.pinimg.com/564x/11/a3/7b/11a37b9ede6e8471d5175a8c2a800ca3.jpg",
//       contents: "내가말하고있짢아",
//       comment_cnt: 10,
//       insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
//       //*
//       layout : "bottom",
// };

//4.
export default handleActions(
    {
        [SET_POST]: (state, action)=>produce(state, (draft)=>{
            draft.list = action.payload.post_list;
            draft.is_loading = false;
        }),

        [ADD_POST]: (state, action)=>produce(state, (draft)=>{
            draft.list.unshift(action.payload.post);
        }),
        // [EDIT_POST]: (state, action) =>produce(state, (draft) => {
        //     let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        //     draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
        // }),
        // [DELETE_POST]: (state, action) =>produce(state, (draft) => {
        
        //     //draft.list = draft.list.filter((l) => l.id !== action.payload.postId);
        //      draft.post = action.payload.postId;
        //     // console.log(action.payload.post_one);
        //}),
        // [LOADING]:(state, action) => produce(state, (draft)=>{draft.is_loading = action.payload.is_loading;})
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    // editPostFB,
    deletePostDB,
}

export {actionCreators};