import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { UserReducer } from './userReducer';
import { PostReducer } from './postReducer';
import { PostResponse } from './types/post-types';
import { CommentReducer } from './commentReducer';
import { AddPostReducer } from './addPostReducer';
import {
  ActionTypesPost,
  ActionTypesUser,
  ActionTypeComment,
  ActionTypeAddPost,
} from './types/action-types';

export const GlobalContext = createContext({});

const userInitialState = {
  users: [],
  user: [],
  loading: false,
  error: null,
};

const postInitialState = {
  loading: false,
  posts: [],
  post: [],
  error: null,
};

const commentInitialState = {
  loading: false,
  comments: [],
  error: null,
};

const addPostInitialState = {
  post: {
    title: '',
    body: '',
    userId: null,
  },
  error: null,
};

const fetchConfigGET = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const GlobalProvider = ({ children }: any): EmotionJSX.Element => {
  const [userState, userDispatch] = useReducer(UserReducer, userInitialState);
  const [postState, postDispatch] = useReducer(PostReducer, postInitialState);
  const [addPostState, addPostDispatch] = useReducer(
    AddPostReducer,
    addPostInitialState
  );
  const [commentState, commentDispatch] = useReducer(
    CommentReducer,
    commentInitialState
  );

  /**
   * @description
   *
   * This function will fetch the users data and then store it
   * inside the reducer and then retrieved back as a StateUser
   *
   * The purpose behind using useCallback instead of plain
   * asynchronous caller is because memoization and also
   * avoid the exhaustive-deps inside useEffect (side-effect)
   *
   * @returns {dispatcher => InitialStateUser}
   *
   */
  const fetchUsers = useCallback(async () => {
    userDispatch({
      type: ActionTypesUser.FETCH_USERS_REQUEST,
    });
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        fetchConfigGET
      );

      if (response.status !== 200) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();

      if (data.length > 0) {
        userDispatch({
          type: ActionTypesUser.FETCH_USERS_SUCCESS,
          payload: data,
        });
      }
    } catch (error: TypeError | any) {
      userDispatch({
        type: ActionTypesUser.FETCH_USERS_FAILED,
        payload: `${error.message}: please check the connection! or API endpoint`,
      });
    }
  }, []);

  /**
   * @description
   * This function is responsible for fetching posts
   * base on userID
   *
   * @param {any} async(id:any)
   * @returns {any}
   */
  const fetchPosts = useCallback(async (id: any) => {
    try {
      postDispatch({
        type: ActionTypesPost.FETCH_POST_REQUEST,
      });

      const url = `?userId=${id}`;

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts${id ? url : ''}`,
        fetchConfigGET
      );

      if (response.status !== 200 && !response.ok) {
        throw new Error('something is off, please check your connection');
      }

      const data = await response.json();

      if (data.length > 0) {
        postDispatch({
          type: ActionTypesPost.FETCH_POST_SUCCESS,
          payload: data,
        });
      }
    } catch (error: TypeError | any) {
      postDispatch({
        type: ActionTypesPost.FETCH_POST_FAILED,
        payload: `${error.message}: cannot fetch the data!`,
      });

      setTimeout(() => {
        postDispatch({
          type: ActionTypesPost.CLEAR_ERROR,
        });
      }, 3000);
    }
  }, []);

  /**
   * @description
   * This function is responsible for getting the single data
   * due to there is no filtering url path so instead I filtered
   * the posts in here
   *
   * @param {any} async(id:number)
   * @returns {any}
   */
  const fetchSinglePost = useCallback(async (id: number) => {
    try {
      postDispatch({
        type: ActionTypesPost.FETCH_POST_REQUEST,
      });

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        fetchConfigGET
      );

      if (response.status !== 200 && !response.ok) {
        throw new Error('something is off, please check your connection');
      }

      const data: Array<PostResponse> = await response.json();

      if (data.length > 0) {
        const singleData = data.filter(
          (item: PostResponse) => item.id === Number(id)
        );

        const fixData = { ...singleData[0] };

        postDispatch({
          type: ActionTypesPost.GET_SINGLE_POST,
          payload: fixData,
        });
      }
    } catch (error: TypeError | any) {
      postDispatch({
        type: ActionTypesPost.FETCH_POST_FAILED,
        payload: `${error.message}: cannot fetch the data!`,
      });

      setTimeout(() => {
        postDispatch({
          type: ActionTypesPost.CLEAR_ERROR,
        });
      }, 3000);
    }
  }, []);

  /**
   * @description
   * This function is responsible for fetching the comments
   * list based on given post ID and store it inside the context reducer
   *
   * @param {any} async(id?:any
   * @returns {any}
   */
  const fetchComments = useCallback(async (id?: any) => {
    try {
      commentDispatch({
        type: ActionTypeComment.FETCH_COMMENT_REQUEST,
      });

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        fetchConfigGET
      );

      if (response.status !== 200 && !response.ok) {
        throw new Error('something went wrong, please refresh the page!');
      }

      const data = await response.json();

      if (data.length > 0) {
        commentDispatch({
          type: ActionTypeComment.FETCH_COMMENT_SUCCESS,
          payload: data,
        });
      }
    } catch (error: TypeError | any) {
      commentDispatch({
        type: ActionTypeComment.FETCH_COMMENT_FAILED,
        payload: `${error.message}: cannot fetch the data!`,
      });

      setTimeout(() => {
        commentDispatch({
          type: ActionTypeComment.CLEAR_ERROR,
        });
      }, 3000);
    }
  }, []);

  /**
   * @description
   * this function is actually an alternative way
   * to send the new post to server, although
   * the data in the server is never gonna change according
   * to API guides in documentation (faking it)
   *
   * also this stands in a different reducer
   * I created its own reducer
   *
   * @param {any} async()
   * @returns {any}
   */
  const sendNewPostToServer = useCallback(async () => {
    try {
      if (
        !addPostState.post.title &&
        !addPostState.post.body &&
        !addPostState.post.userId
      ) {
        return;
      }

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            title: addPostState.post.title,
            body: addPostState.post.body,
            userId: addPostState.post.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const data = await response.json();

      console.log({
        SENDED: data,
      });
    } catch (error: TypeError | any) {
      addPostDispatch({
        type: ActionTypeAddPost.ADD_POST_FAILED,
        payload: `${error.message}: cannot send the data!`,
      });
    }
  }, [
    addPostState.post.body,
    addPostState.post.title,
    addPostState.post.userId,
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (
      addPostState.post.title &&
      addPostState.post.body &&
      addPostState.post.userId
    ) {
      sendNewPostToServer();
    }
  }, [addPostState, sendNewPostToServer]);

  /**
   * @description
   * this function is responsible for removing post
   * from the list with maintaining posts data in the reducer context.
   *
   * @param {any} id:number
   * @returns {any}
   */
  const removePostWithId = (id: number) => {
    postDispatch({
      type: ActionTypesPost.REMOVE_POST_FROM_THE_LIST,
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        userState,
        postState,
        commentState,
        addPostState,
        userDispatch,
        postDispatch,
        commentDispatch,
        addPostDispatch,
        fetchPosts,
        fetchComments,
        removePostWithId,
        fetchSinglePost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

/**
 * For reducing repeated caller when
 * accessing the data in the context
 * reducer.
 *
 * @date 2021-10-30
 * @returns {any}
 */
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
