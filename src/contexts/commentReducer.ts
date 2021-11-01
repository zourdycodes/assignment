import { ActionTypeComment } from './types/action-types';

import {
  CommentActionReq,
  CommentActionSuccess,
  CommentActionFailed,
  ClearErrorCommentAction,
  CommentState,
} from './types/comment-types';

type ActionComment =
  | CommentActionReq
  | CommentActionSuccess
  | CommentActionFailed
  | ClearErrorCommentAction;

export const CommentReducer = (state: CommentState, action: ActionComment) => {
  switch (action.type) {
    case ActionTypeComment.FETCH_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionTypeComment.FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };

    case ActionTypeComment.FETCH_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypeComment.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
