import { Request } from 'express';
import {
  Breed,
  isBreed,
  BaseQuery,
  ImagesQuery,
  Image,
  isImage,
  NewFavorite,
  AnimalType,
  CreateFavorite,
  isCreateFavorite
} from '../types';
import axios from 'axios';
import { Favorite } from '../models';

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

  const url_call = `${API_URL_FIRST}${query.animal}${API_URL_SECOND}images/search?has_breeds=true&limit=${query.limit}&page=${query.page}&api_key=${API_KEY}&size=small`;
  const config = {
    method: 'get',
    url: url_call
  };

  const { data } = await axios.request<Image[]>(config);
  console.log(data);
  data.forEach((obj) => {
    console.log(obj);
    if (!isImage(obj)) throw new Error('Invalid image type');
    return;
  });

  return data;
};

const addFavorite = async (favorite: NewFavorite, user_id: number) => {
  let API_KEY;
  let animal;
  switch (favorite.animal) {
    case AnimalType.DOG:
      API_KEY = process.env.DOG_API_KEY;
      animal = 'dog';
      break;
    case AnimalType.CAT:
      API_KEY = process.env.CAT_API_KEY;
      animal = 'cat';
      break;
    default:
      throw new Error('incorrect animal');
  }

  const url_call = `${API_URL_FIRST}${animal}${API_URL_SECOND}favourites`;
  const config = {
    method: 'post',
    url: url_call,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    data: {
      image_id: favorite.image_id,
      sub_id: user_id.toString()
    }
  };

  const { data } = await axios.request<CreateFavorite>(config);
  console.log(data);
  if (!isCreateFavorite(data) || data.message !== 'SUCCESS')
    throw new Error('Incompatiable third party breed data');
  const newFav = {
    favorite_id: data.id,
    userId: user_id,
    animal: favorite.animal
  };
  console.log(newFav);
  await Favorite.create(newFav);
  return data;
};

const getFavorites = async (request: Request) => {
  let API_KEY;
  let animal;
  switch (request.body.animal) {
    case AnimalType.DOG:
      API_KEY = process.env.DOG_API_KEY;
      animal = 'dog';
      break;
    case AnimalType.CAT:
      API_KEY = process.env.CAT_API_KEY;
      animal = 'cat';
      break;
    default:
      throw new Error('incorrect animal');
  }

  const url_call = `${API_URL_FIRST}${animal}${API_URL_SECOND}favourites?sub_id=${request.user?.id}`;
  const config = {
    method: 'get',
    url: url_call,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }
  };

  const response = await axios.request(config);

  return response;
};

const delFavorite = async (request: Request) => {
  let API_KEY;
  //let animal;

  const fav = await Favorite.findOne({
    where: {
      favorite_id: parseInt(request.params.id)
    }
  });

  console.log(fav);

  if (!(fav && fav.userId === request.user?.id))
    throw new Error('Incorrect user or favorite not found');

  switch (fav.animal) {
    case AnimalType.DOG:
      API_KEY = process.env.DOG_API_KEY;
      //animal = 'dog';
      break;
    case AnimalType.CAT:
      API_KEY = process.env.CAT_API_KEY;
      //animal = 'cat';
      break;
    default:
      throw new Error('incorrect animal');
  }

  const url_call = `${API_URL_FIRST}${fav.animal}${API_URL_SECOND}favourites/${request.params.id}`;
  const config = {
    method: 'delete',
    url: url_call,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }
  };

  const response = await axios.request(config);

  if (response && response.data.message === 'SUCCESS') {
    await Favorite.destroy({
      where: {
        favorite_id: parseInt(request.params.id)
      }
    });
  }

  return response;
};

export default {
  getBreeds,
  getImages,
  addFavorite,
  getFavorites,
  delFavorite
};
