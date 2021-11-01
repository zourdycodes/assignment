import { ActionTypeAddPost } from './types/action-types';

interface PostData {
  title: string;
  body: string;
  userId: number | null;
}

interface AddPostState {
  post: PostData;
  error: null | string;
}

interface ActionAddPostSuccess {
  type: ActionTypeAddPost.ADD_POST_SUCCESS;
  payload: PostData;
}

interface ActionAddPostFailed {
  type: ActionTypeAddPost.ADD_POST_FAILED;
  payload: string | null;
}

type Actions = ActionAddPostFailed | ActionAddPostSuccess;

export const AddPostReducer = (state: AddPostState, action: Actions) => {
  switch (action.type) {
    case ActionTypeAddPost.ADD_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
      };

    case ActionTypeAddPost.ADD_POST_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
