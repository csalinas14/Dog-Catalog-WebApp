import {
  Breed,
  isBreed,
  BaseQuery,
  ImagesQuery,
  Image,
  isImage
} from '../types';
import axios from 'axios';

//const API_KEY = process.env.DOG_API_KEY;
//Broke up API URL so I could apply dog or cat for their respective api url calls
const API_URL_FIRST = 'https://api.the';
const API_URL_SECOND = 'api.com/v1/';

//third party api call to get breed info on cats or dogs
const getBreeds = async (query: BaseQuery): Promise<Breed[]> => {
  let API_KEY;
  if (query.animal === 'dog') API_KEY = process.env.DOG_API_KEY;
  else if (query.animal === 'cat') API_KEY = process.env.CAT_API_KEY;
  else {
    throw new Error('incorrect animal');
  }
  const url_call = `${API_URL_FIRST}${query.animal}${API_URL_SECOND}breeds?limit=${query.limit}&page=${query.page}&api_key=${API_KEY}`;
  console.log(url_call);
  const config = {
    method: 'get',
    url: url_call
  };

  const { data } = await axios.request<Breed[]>(config);

  data.forEach((obj) => {
    obj.type = query.animal;
    console.log(obj);
    if (!isBreed(obj)) throw new Error('Incompatiable third party breed data');
  });
  //console.log(data);
  //const animal_data = data.map((d) => ({ ...d, type: animal } as Breed));
  //console.log(animal_data);
  return data;
};

//third party api call to get images of a particular breed
const getImages = async (query: ImagesQuery): Promise<Image[]> => {
  let API_KEY;
  if (query.animal === 'dog') API_KEY = process.env.DOG_API_KEY;
  else if (query.animal === 'cat') API_KEY = process.env.CAT_API_KEY;
  else {
    throw new Error('incorrect animal');
  }

  const url_call = `${API_URL_FIRST}${query.animal}${API_URL_SECOND}images/search?breeds_id=${query.id}limit=${query.limit}&page=${query.page}&api_key=${API_KEY}`;

  const config = {
    method: 'get',
    url: url_call
  };

  const { data } = await axios.request<Image[]>(config);

  data.forEach((obj) => {
    console.log(obj);
    if (!isImage(obj)) throw new Error('Invalid image type');
    return;
  });

  return data;
};

export default {
  getBreeds,
  getImages
};
