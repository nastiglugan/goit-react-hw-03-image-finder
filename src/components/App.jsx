import { Component } from 'react';
import { AppWrap } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { fetchImgByName } from './api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

class App extends Component {
  state = {
    imgName: '',
    page: 1,
    fetchApi: [],
    error: null,
    isLoading: false,
    lastPage: 0,
  };

  formSubmitHandler = ({ imgName }) => {
    this.setState({ imgName });
    this.setState({ page: 1 });
    this.setState({ fetchApi: [] });
  };

  onChangePageNumber = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imgName;
    const nextName = this.state.imgName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevImages = this.state.fetchApi;

    if (prevName !== nextName || prevPage !== nextPage) {
      try {
        this.setState({ isLoading: true });

        const images = await fetchImgByName(nextName, nextPage);

        if (images.hits.length === 0) {
          throw new Error();
        }

        this.setState({
          fetchApi: [...prevImages, ...images.hits],
          lastPage: Math.ceil(images.totalHits / 12),
        });
      } catch (error) {
        this.setState({
          error: toast.error('Щось пішло не так! Перезагрузи сторінку'),
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  makeImgParametrs = () => {
    return this.state.fetchApi.map(image => ({
      id: image.id,
      img: image.webformatURL,
      imgLarge: image.largeImageURL,
      tags: image.tags,
    }));
  };

  render() {
    const { lastPage, isLoading, error, page } = this.state;
    const imagesParametrs = this.makeImgParametrs();

    return (
      <AppWrap>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {error !== null && (
          <Toaster position="top-right" reverseOrder={false} />
        )}

        <ImageGallery images={imagesParametrs} />
        {imagesParametrs.length !== 0 && page < lastPage && (
          <LoadMoreBtn addPage={this.onChangePageNumber} />
        )}
        {isLoading && <Loader />}
      </AppWrap>
    );
  }
}

export default App;
