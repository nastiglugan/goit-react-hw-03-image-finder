import PropTypes from 'prop-types';
import { Button, BtnWrap } from './Button.styled';

export const LoadMoreBtn = ({ addPage }) => {
  return (
    <BtnWrap>
      <Button type="button" onClick={addPage}>
        Load more
      </Button>
    </BtnWrap>
  );
};

LoadMoreBtn.propTypes = {
  addPage: PropTypes.func.isRequired,
};
