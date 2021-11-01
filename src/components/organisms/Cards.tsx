import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { ProfileInfo } from '../molecules/ProfileInfo';
import { ResponseData } from '../../contexts/types/user-types';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { CompanyInformation } from '../molecules/CompanyInformation';

export const Cards: React.FC = () => {
  const { userState }: any = useGlobalContext();

  return (
    <ListItemContainer>
      {userState?.users
        ?.slice(0, 8)
        .map((item: ResponseData, index: number): EmotionJSX.Element => {
          return (
            <Link href={`/user/${item.id}`} passHref key={index}>
              <Card
                sx={{
                  margin: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '100%',
                  minWidth: '300px',
                  cursor: 'Pointer',
                  ':hover': {
                    background: 'rgba(0,0,0,0.2)',
                  },
                }}
              >
                <ProfileInfo name={item.name} username={item.username} />
                <SubContent>
                  <List>
                    <ListItem
                      sx={{
                        backgroundColor: 'green',
                      }}
                    >
                      <ListItemIcon>
                        <MailOutlineIcon
                          sx={{
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.email}
                        sx={{
                          color: 'white',
                        }}
                      />
                    </ListItem>
                    <ListItem
                      sx={{
                        backgroundColor: 'cornflowerblue',
                      }}
                    >
                      <ListItemIcon>
                        <PhoneIphoneIcon
                          sx={{
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.phone}
                        sx={{
                          color: 'white',
                        }}
                      />
                    </ListItem>
                  </List>

                  <Typography
                    sx={{
                      color: 'white',
                      maxWidth: '110px',
                      marginTop: '10px',
                      padding: '0.4rem 0.8rem',
                      backgroundColor: 'blueviolet',
                      borderRadius: '5px',
                    }}
                  >
                    Company:
                  </Typography>

                  <CompanyInformation
                    bs={item.company.bs}
                    name={item.company.name}
                    catchPhrase={item.company.catchPhrase}
                  />
                </SubContent>
              </Card>
            </Link>
          );
        })}
    </ListItemContainer>
  );
};

const ListItemContainer = styled.div`
  max-width: 824px;
  margin: 0 auto;
  padding: 1rem;
`;

const SubContent = styled.div`
  padding: 1rem;
`;

const List = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
