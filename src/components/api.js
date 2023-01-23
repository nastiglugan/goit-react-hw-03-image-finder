import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const KEY = '33045273-1d052dc08c449970998978c1d';

// export const fetchImgByName = async (imgName, page) => {
//   const response = await axios.get(
//     `?key=${KEY}&q=${imgName}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return response.data;
// };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = `33045273-1d052dc08c449970998978c1d`;

export const fetchImgByName = async (imgName, page) => {
  const response = await axios.get(`?key=${API_KEY}`, {
    params: {
      q: imgName,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return response.data;
};
