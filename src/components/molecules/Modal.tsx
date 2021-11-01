import React from 'react';
import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { useGlobalContext } from '../../contexts/GlobalContext';

interface Props {
  id: number;
  elId?: string | any;
  open?: any;
  anchorEl?: any;
  handleClose?: any;
}

export const ModalComponent: React.FC<Props> = ({
  id,
  elId,
  open,
  anchorEl,
  handleClose,
}) => {
  const { postState, removePostWithId }: any = useGlobalContext();

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();

    if (postState.posts.length !== 0) {
      removePostWithId(id);
      handleClose();
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

  return (
    <Popover
      id={elId}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <Typography sx={{ p: 2 }} variant="h6">
        Are you sure want to delete this?
      </Typography>
      <ButtonContainer>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={(e) => handleDelete(e, id)}
        >
          yes, delete it.
        </Button>
      </ButtonContainer>
    </Popover>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  padding: 0 1rem;
  padding-bottom: 1rem;
`;
