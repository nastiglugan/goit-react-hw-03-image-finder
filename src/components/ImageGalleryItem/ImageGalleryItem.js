import { Component } from 'react';
// import PropTypes from 'prop-types';
import { ImageGalleryItems, ImageGalleryImg } from './ImageGalleryItem.styled';
import LargeImgModal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    imgforModal: '',
  };

  onShowLargeImage = img => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
    this.setState({ imgforModal: img });
  };

  // toggle = () => {
  //   this.setState(prevState => ({
  //     showModal: !prevState.showModal,
  //   }));
  // };

  render() {
    const { tags, img, imgLarge } = this.props.image;
    const { showModal, imgforModal } = this.state;

    return (
      <div>
        <ImageGalleryItems onClick={() => this.onShowLargeImage(imgLarge)}>
          <ImageGalleryImg src={img} alt={tags} width="310" height="230" />
        </ImageGalleryItems>
        {showModal && (
          <LargeImgModal
            largeImg={imgforModal}
            onClose={this.onShowLargeImage}
            tags={tags}
          />
        )}
      </div>
    );
  }
}

export default ImageGalleryItem;

// ImageGalleryItem.propTypes = {
//   image: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
// };

// export class ImageGalleryItem = ({ image, tags }) => {
//   return (
//     <ImageGalleryItems>
//       <ImageGalleryImg src={image} alt={tags} width="310" height="230" />
//     </ImageGalleryItems>
//   );
// };
