import type { NextPage } from 'next';
import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import { Wrapper } from '../../components/template/Wrapper';
import { useRouter } from 'next/router';
import { SinglePost } from '../../components/organisms/SInglePost';
import { UserProfile } from '../../components/organisms/UserProfile';
import { LoadingSkeleton } from '../../components/atoms/Loading';
import { ActionTypesUser } from '../../contexts/types/action-types';
import { useGlobalContext } from '../../contexts/GlobalContext';

const PostDetailsPage: NextPage = () => {
  const {
    fetchComments,
    commentState,
    postState,
    fetchSinglePost,
    userState,
    userDispatch,
  }: any = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    fetchComments(router.query.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  useEffect(() => {
    fetchSinglePost(router.query.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  useEffect(() => {
    if (Object.keys(postState?.post).length !== 0) {
      userDispatch({
        type: ActionTypesUser.GET_SINGLE_USER,
        payload: postState.post.userId,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, postState.post]);

  console.log({
    postState,
    commentState,
    userState,
  });

  return (
    <Wrapper>
      <PostDetailPageContainer>
        {userState.user.length !== 0 ? (
          <div>
            <UserProfile userData={userState.user[0]} />

            <Button
              color="secondary"
              variant="contained"
              onClick={() => router.push(`/user/${userState.user[0]?.id}`)}
              sx={{
                marginTop: '30px',
              }}
            >
              Back To Profile
            </Button>
          </div>
        ) : (
          <LoadingContainer>
            <LoadingSkeleton />
          </LoadingContainer>
        )}
        {/* <SinglePost post={postState?.post}> */}

        {/* POST */}
        {Object.keys(postState?.post).length !== 0 &&
        commentState.comments.length > 0 ? (
          <SinglePost post={postState?.post} comments={commentState.comments} />
        ) : (
          <LoadingContainer>
            <LoadingSkeleton />
          </LoadingContainer>
        )}
      </PostDetailPageContainer>
    </Wrapper>
  );
};

export default PostDetailsPage;

const PostDetailPageContainer = styled.div`
  max-width: 824px;
  margin: 0 auto;
  padding: 1rem;
`;

const LoadingContainer = styled.div`
  margin-top: 3rem;
`;
