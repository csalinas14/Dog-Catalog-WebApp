import { Breed, isBreed, BreedQuery } from '../types';
import axios from 'axios';

const API_KEY = process.env.DOG_API_KEY;
const API_URL_FIRST = 'https://api.the';
const API_URL_SECOND = 'api.com/v1/';

const getBreeds = async (query: BreedQuery): Promise<Breed[]> => {
  const url_call = `${API_URL_FIRST}${query.animal}${API_URL_SECOND}breeds?limit=${query.limit}&page=${query.page}&api_key=${API_KEY}`;

  const config = {
    method: 'get',
    url: url_call
  };

  const { data } = await axios.request<Breed[]>(config);

  data.forEach((obj) => {
    obj.type = query.animal;
    if (!isBreed(obj)) throw new Error('Incompatiable third party breed data');
  });
  //console.log(data);
  //const animal_data = data.map((d) => ({ ...d, type: animal } as Breed));
  //console.log(animal_data);
  return data;
};

export default {
  getBreeds
};
