import React from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

import { ResponseData } from '../../contexts/types/user-types';

interface Props {
  userData: ResponseData;
}

export const UserProfile: React.FC<Props> = ({ userData }) => {
  return (
    <ProfileContainer>
      <Typography
        sx={{
          fontWeight: 'bold',
        }}
        variant="h4"
      >
        {userData?.name}
      </Typography>
      <Typography variant="subtitle2">
        {userData?.email.toLowerCase()}
      </Typography>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-top: 2rem;

  @media (max-width: 600px) {
    h4 {
      font-size: 1.5rem;
    }
  }
`;
