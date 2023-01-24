import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchbarWrap,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imgName: '',
  };

  handleIputChange = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imgName.trim() === '') {
      toast.error('Ти нічого не ввів в пошук!');
      return;
    }
    this.props.onSubmit(this.state);

    this.setState({ imgName: '' });
  };

  render() {
    return (
      <SearchbarWrap>
        <Toaster position="top-right" reverseOrder={false} />
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <FaSearch color="black" />
          </SearchBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imgName}
            onChange={this.handleIputChange}
          />
        </SearchForm>
      </SearchbarWrap>
    );
  }
}

export default Searchbar;
