import { ActionTypesPost } from '../types/action-types';

export interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  loading: boolean;
  posts: Array<PostResponse> | any;
  post: Array<PostResponse> | any;
  error: null | string;
}

export interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number | null;
}

export interface PostActionReq {
  type: ActionTypesPost.FETCH_POST_REQUEST;
}

export interface PostActionSuccess {
  type: ActionTypesPost.FETCH_POST_SUCCESS;
  payload: Array<PostResponse>;
  id?: number;
}

export interface PostActionFailed {
  type: ActionTypesPost.FETCH_POST_FAILED;
  payload: null | string;
}

export interface RemovePost {
  type: ActionTypesPost.REMOVE_POST_FROM_THE_LIST;
  payload: number;
}

export interface AddNewPost {
  type: ActionTypesPost.ADD_NEW_POST_TO_THE_LIST;
  payload: PostData;
}

export interface SinglePost {
  type: ActionTypesPost.GET_SINGLE_POST;
  payload: PostData;
}

export interface ClearErrorPostAction {
  type: ActionTypesPost.CLEAR_ERROR;
}
