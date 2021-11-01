import { ActionTypesUser } from './types/action-types';
import {
  ClearErrorUserAction,
  UserActionFailed,
  UserActionReq,
  UserActionSuccess,
  UserState,
  SingleUser,
  ResponseData,
} from './types/user-types';

/**
 * @description
 * I hereby using (discriminated unions) approach
 * there is another way to implement this one
 * like => type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];
 *
 * but since I wanted to implement a redux operation for giving this assignment
 * another perspective to handle the state.
 */
export type UserActions =
  | UserActionReq
  | UserActionSuccess
  | UserActionFailed
  | ClearErrorUserAction
  | SingleUser;

export const UserReducer = (state: UserState, action: UserActions) => {
  switch (action.type) {
    case ActionTypesUser.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ActionTypesUser.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };

    case ActionTypesUser.FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //TODO: back here again
    case ActionTypesUser.GET_SINGLE_USER:
      return {
        ...state,
        user: state.users.filter(
          (user: ResponseData) => user.id === action.payload
        ),
      };

    case ActionTypesUser.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
