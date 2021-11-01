import { ActionTypesUser } from './action-types';

export interface GeoCode {
  lat: string;
  lng: string;
}

export interface CompanyProfile {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface AddressData {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoCode;
}

export interface ResponseData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressData;
  phone: string;
  website: string;
  company: CompanyProfile;
}

export interface UserState {
  users: Array<ResponseData>;
  loading: boolean;
  error: null | string;
}

export interface UserActionReq {
  type: ActionTypesUser.FETCH_USERS_REQUEST;
}

export interface UserActionSuccess {
  type: ActionTypesUser.FETCH_USERS_SUCCESS;
  payload: Array<ResponseData>;
}

export interface UserActionFailed {
  type: ActionTypesUser.FETCH_USERS_FAILED;
  payload: null | string;
}

export interface SingleUser {
  type: ActionTypesUser.GET_SINGLE_USER;
  payload: number;
}

export interface ClearErrorUserAction {
  type: ActionTypesUser.CLEAR_ERROR;
}
