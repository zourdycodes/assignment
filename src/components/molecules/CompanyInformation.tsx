import React from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

interface Props {
  name: string;
  catchPhrase: string;
  bs: string;
}

export const CompanyInformation: React.FC<Props> = ({
  name,
  catchPhrase,
  bs,
}) => {
  return (
    <CompanyProfile>
      <Typography>{name}</Typography>
      <Typography>{`${catchPhrase} | ${bs}`}</Typography>
    </CompanyProfile>
  );
};

const CompanyProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding: 0.8rem 1rem;

  border-radius: 4px;

  background-color: aquamarine;
`;
