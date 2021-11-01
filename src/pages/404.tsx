import type { NextPage } from 'next';
import Image from 'next/image';
import styled from '@emotion/styled';
import NotFound from '../assets/404.gif';
import { Wrapper } from '../components/template/Wrapper';

const NotFoundPage: NextPage = () => {
  return (
    <Wrapper>
      <Container>
        <ImageContainer>
          <Image
            src={NotFound}
            alt="not found page asset"
            height={450}
            width={550}
            objectFit="cover"
          />
        </ImageContainer>
      </Container>
    </Wrapper>
  );
};

export default NotFoundPage;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
