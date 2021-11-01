import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
  name: string;
  username: string;
}

export const ProfileInfo: React.FC<Props> = ({ name, username }) => {
  return (
    <CardContent
      sx={{
        borderBottom: '1px solid gray',
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle1" color={'GrayText'}>
        @{username.toLowerCase()}
      </Typography>
    </CardContent>
  );
};
