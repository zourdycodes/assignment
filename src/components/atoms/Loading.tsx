import React from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

export const LoadingSkeleton: React.FC = () => {
  return (
    <Container>
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
