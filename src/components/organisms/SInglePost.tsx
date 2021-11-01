import React, { useState } from 'react';

import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface CommentPost {
  body: string;
  email: string;
  name: string;
  id: number;
}

interface Props {
  post: {
    title: string;
    body: string;
  };

  comments?: CommentPost[];
}

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  color: 'cornflowerblue',
};

export const SinglePost: React.FC<Props> = ({ post, comments }) => {
  const [showComment, setShowComment] = useState<boolean>(false);

  return (
    <Container>
      <CardContent>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="subtitle1">{post.body}</Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={buttonStyle}
          onClick={() => setShowComment((showComment) => !showComment)}
        >
          show comments
          {showComment ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </Button>
      </CardActions>

      {showComment ? (
        <CommentContainer>
          {comments?.map((item: CommentPost) => {
            return (
              <CommentList key={item.id}>
                <UserInfo>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>{item.email.toLowerCase()}</Typography>
                </UserInfo>
                <CommentContent>
                  <Typography>{item.body}</Typography>
                </CommentContent>
              </CommentList>
            );
          })}
        </CommentContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  background: #8e2de2;
  background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
  background: linear-gradient(to right, #4a00e0, #8e2de2);

  transition: all 0.5s ease-out;
  border-radius: 4px;
  color: white;

  h5 {
    font-weight: bold;
  }

  button {
    &:hover {
      color: white;
    }
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 1rem;
  background: black;
  border-radius: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  background: crimson;
  padding: 0.1rem 0.7rem;
  border-radius: 5px;

  h6 {
    font-size: 16px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CommentContent = styled.div`
  margin: 0 0.5rem;
  margin-top: 0.4rem;

  background: blueviolet;
  padding: 0.2rem 0.8rem;
  border-radius: 5px;
`;
