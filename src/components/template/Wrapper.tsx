import React, { ReactChild, ReactChildren } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

interface Props {
  children?: ReactChild | ReactChildren;
  title?: string;
  description?: string;
}

export const Wrapper: React.FC<Props> = ({
  children,
  title = 'Assignment: Media App',
  description = 'This is an assignment for the hiring process',
}: Props) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: papayawhip;
`;
