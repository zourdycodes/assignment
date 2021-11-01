import { ActionTypesPost } from './types/action-types';
import {
  PostState,
  ClearErrorPostAction,
  PostActionFailed,
  PostActionReq,
  PostActionSuccess,
  RemovePost,
  PostResponse,
  AddNewPost,
  SinglePost,
} from './types/post-types';

type PostAction =
  | PostActionReq
  | PostActionSuccess
  | PostActionFailed
  | ClearErrorPostAction
  | RemovePost
  | AddNewPost
  | SinglePost;

export const PostReducer = (state: PostState, action: PostAction) => {
  switch (action.type) {
    case ActionTypesPost.FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionTypesPost.FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case ActionTypesPost.FETCH_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypesPost.REMOVE_POST_FROM_THE_LIST:
      return {
        ...state,
        posts: state.posts.filter(
          (item: PostResponse) => item.id !== action.payload
        ),
      };

    case ActionTypesPost.ADD_NEW_POST_TO_THE_LIST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case ActionTypesPost.GET_SINGLE_POST:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };

    case ActionTypesPost.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
