import { Component } from 'react';
import { AppWrap } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { fetchImgByName } from './api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';

class App extends Component {
  state = {
    imgName: '',
    page: 1,
    fetchApi: [],
    error: null,
    isLoading: false,
    totalHits: 0,
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
          totalHits: images.totalHits,
        });
      } catch (error) {
        this.setState({ error: 'Something is wrong!' });
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
    const { totalHits, isLoading } = this.state;
    const imagesParametrs = this.makeImgParametrs();

    return (
      <AppWrap>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery images={imagesParametrs} />
        {imagesParametrs.length > 11 && imagesParametrs.length <= totalHits && (
          <LoadMoreBtn addPage={this.onChangePageNumber} />
        )}
        {isLoading && <Loader />}
      </AppWrap>
    );
  }
}

export default App;

// fetchImg = async () => {
//   const { imgName, page } = this.state;
//   try {
//     const fetchApi = await fetchImgByName(imgName, page);
//     this.setState({ fetchApi });
//   } catch (error) {}
// };
