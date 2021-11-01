import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Button from '@mui/material/Button';

import { useRouter } from 'next/router';
import { ResponseData } from '../../contexts/types/user-types';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Posts } from '../../components/organisms/Posts';
import { Wrapper } from '../../components/template/Wrapper';
import { UserProfile } from '../../components/organisms/UserProfile';
import { ActionTypesPost } from '../../contexts/types/action-types';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserDetailsPage: NextPage = () => {
  const router = useRouter();
  const { userState, fetchPosts, postDispatch, postState }: any =
    useGlobalContext();
  const [userData, setUserData] = useState<Array<ResponseData>>([]);
  const [open, setOpen] = useState(false);

  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputTitle.length > 0 && inputBody.length > 0) {
      const data = {
        id: Math.floor(Math.random() * 1000 + 1), // This is not a good practices, I tend to use uuid/bit number but since it has to be Number and bitwise number has to be avoided so I use small and not good approach :)
        title: inputTitle,
        body: inputBody,
        userId: Number(router.query.id),
      };

      /**
       * @description
       * Execute the new post data to the reducer operation
       * and adding it to the current post lists
       */
      if (postState.posts.length > 0) {
        postDispatch({
          type: ActionTypesPost.ADD_NEW_POST_TO_THE_LIST,
          payload: data,
        });
      }

      /**
       * @description
       * Sending the new post data to the server
       * notice: according to jsonplaceholder website
       *         the operation is just faking it.
       */
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          id: Math.floor(Math.random() * 10 + 1),
          title: inputTitle,
          body: inputBody,
          userId: Number(router.query.id),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => console.log('sended', response.status))
        .catch((error: TypeError | any) => {
          throw new Error(error);
        });

      setOpen(false);
      setInputTitle('');
      setInputBody('');
    }
  };

  /**
   * @description
   * since I cannot use server-side rendering effect
   * so I decided to filter the post base on the
   * id of a particular user from routes path.
   *
   * @returns { currentUser => filtered by id }
   */

  function getCurrentUser() {
    const userData = userState.users.filter(
      (item: ResponseData) => item.id === Number(router.query.id)
    );
    setUserData(userData);
  }

  useEffect(() => {
    fetchPosts(router.query.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  useEffect(() => {
    if (userState.users.length > 0) {
      getCurrentUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, userState]);

  return (
    <Wrapper>
      <PostPageContainer>
        <UserProfile userData={userData[0]} />
        {/* Miscellaneous => Features */}
        <ButtonContainer>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push('/')}
          >
            back to home
          </Button>

          <Button variant="contained" color="primary" onClick={handleOpen}>
            add new post
          </Button>

          {/* MODAL => ADD NEW POST */}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Form onSubmit={handleSubmit}>
                <Box sx={style}>
                  <FormControl>
                    <Typography variant="h6">Add Post</Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="title"
                      name="title"
                      value={inputTitle}
                      onChange={({ target }) => setInputTitle(target.value)}
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="content"
                      multiline
                      name="body"
                      rows={4}
                      value={inputBody}
                      onChange={({ target }) => setInputBody(target.value)}
                    />
                  </FormControl>

                  <ButtonActionContainer id="transition-modal-description">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleClose}
                    >
                      cancel
                    </Button>
                    <Button variant="contained" color="secondary" type="submit">
                      Add Post
                    </Button>
                  </ButtonActionContainer>
                </Box>
              </Form>
            </Fade>
          </Modal>
        </ButtonContainer>
        {/* END Miscellaneous => Features */}
        <Posts />
      </PostPageContainer>
    </Wrapper>
  );
};

export default UserDetailsPage;

const PostPageContainer = styled.div`
  max-width: 824px;
  margin: 0 auto;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;

const ButtonActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Form = styled.form``;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h6 {
    text-align: center;
    font-weight: bold;
  }
`;
