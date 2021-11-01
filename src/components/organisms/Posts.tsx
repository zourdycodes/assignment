import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { confirmAlert } from 'react-confirm-alert'; // Import
import { PostResponse } from '../../contexts/types/post-types';
import { LoadingSkeleton } from '../atoms/Loading';
import { useGlobalContext } from '../../contexts/GlobalContext';
//? import { ModalComponent } from '../molecules/Modal';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
interface Props {
  posts?: Array<PostResponse>;
}

export const Posts: React.FC<Props> = () => {
  const { postState, removePostWithId }: any = useGlobalContext();

  //? const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );

  //? const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  //? const handleClose = () => {
  //   setAnchorEl(null);
  // };

  //? const open = Boolean(anchorEl);
  //? const id = open ? 'simple-popover' : undefined;

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();

    if (postState.posts.length !== 0) {
      removePostWithId(id);
      // handleClose();
      /**
       * @description
       * this is not going to affect the data
       * at the server, according to the api guides
       * the operation is just faking it so the actual data on
       * the server is not actually changed
       */

      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      })
        .then((res) => console.log('completed', res.status))
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // handy library
  const submit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    confirmAlert({
      title: 'Confirm to delete the post',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(event, id),
        },
        {
          label: 'No',
          onClick: () => console.log('cancelled'),
        },
      ],
    });
  };

  if (postState.loading) {
    return (
      <LoadingWrapper>
        {[1, 2, 3, 4, 5].map((item: number) => {
          return (
            <Wrapper key={item}>
              <LoadingSkeleton key={item} />
            </Wrapper>
          );
        })}
      </LoadingWrapper>
    );
  }

  return (
    <PostContainer>
      {postState.posts.length !== 0
        ? postState?.posts?.map((item: PostResponse) => {
            return (
              <>
                <PostList key={item.id}>
                  <Link key={item.id} href={`/post/${item.id}`} passHref>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          textDecoration: 'underline',
                        }}
                      >
                        {item.title.length > 50
                          ? `${item.title.substring(0, 50)}...`
                          : item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#fff20',
                        }}
                      >
                        {item.body}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions
                    sx={{
                      padding: '1rem',
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      // onClick={handleClick} //? Un-comment this one
                      // onClick={(e) => handleDelete(e, item.id)} //? comment this one
                      onClick={(e) => submit(e, item.id)}
                    >
                      delete post
                    </Button>
                    {/* 
                       /**
                        * When using modal popups to ask a confirmation
                        * whether the user is sure to delete the post or not
                        * there is a slightly bugs whereas the selected post is not popped off
                        * from the list (but actually it is been deleted) but the strange part is
                        * the list is popped off from the bottom.
                        * 
                        * I have been trying to figure this out what caused the matter but unfortunately
                        * still yet found what caused the bug if I have one or two days more 
                        * perhaps I could fix the problem but I already promise to finish the Task in 2 days
                        * 
                        * you can check it by un-commenting the ModalComponent and switch commenting on
                        * Button delete post above (notice prefix //?)
                        * 
                        * SOLVED just a minutes after I write this documentation :) => using external libraries.
                        */}

                    {/* <ModalComponent
                      id={item.id}
                      open={open}
                      elId={id}
                      handleClose={handleClose}
                    /> */}
                  </CardActions>
                </PostList>
              </>
            );
          })
        : null}

      {postState.posts.length === 0 && !postState.loading ? (
        <div>
          <Typography variant="h3" color="black">
            no post left...
          </Typography>
        </div>
      ) : null}
    </PostContainer>
  );
};

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  color: white;
  position: relative;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  background: #8e2de2;
  background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
  background: linear-gradient(to right, #4a00e0, #8e2de2);

  transition: all 0.5s ease-out;
  border-radius: 4px;

  &:hover {
    background: rgba(197, 0, 115, 0.904);
    cursor: pointer;
  }
`;

const LoadingWrapper = styled.div`
  margin-top: 6rem;
`;

const Wrapper = styled.div`
  margin-top: 1rem;
`;
