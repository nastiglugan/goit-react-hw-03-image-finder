import { LineWave } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <LineWave
        height="200"
        width="120"
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor="#3f51b5"
        middleLineColor="#3f51b5"
        lastLineColor="#3f51b5"
      />
    </LoaderWrap>
  );
};
