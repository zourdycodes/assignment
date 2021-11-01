import { ActionTypeComment } from '../types/action-types';

export interface CommentResponse {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentState {
  loading: boolean;
  comments: Array<CommentResponse>;
  error: null | string;
}

export interface CommentActionReq {
  type: ActionTypeComment.FETCH_COMMENT_REQUEST;
}

export interface CommentActionSuccess {
  type: ActionTypeComment.FETCH_COMMENT_SUCCESS;
  payload: Array<CommentResponse>;
}

export interface CommentActionFailed {
  type: ActionTypeComment.FETCH_COMMENT_FAILED;
  payload: null | string;
}

export interface ClearErrorCommentAction {
  type: ActionTypeComment.CLEAR_ERROR;
}
