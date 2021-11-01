import type { NextPage } from 'next';
import { Cards } from '../components/organisms/Cards';
import { Wrapper } from '../components/template/Wrapper';

const Home: NextPage = () => {
  return (
    <Wrapper
      title={'Assignment Task: Media App'}
      description={
        'Delta Alpha Foxtrot 0xffff Base64 the himalayans fly through europe drop the Sumatran Tiger'
      }
    >
      <Cards />
    </Wrapper>
  );
};

export default Home;
