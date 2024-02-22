import { Breed } from '../types';
import axios from 'axios';

const API_KEY = process.env.DOG_API_KEY;

const getBreeds = async (): Promise<Breed[]> => {
  const config = {
    method: 'get',
    url: `https://api.thedogapi.com/v1/breeds?limit=2&api_key=${API_KEY}`
  };

  const { data } = await axios.request<Breed[]>(config);
  console.log(data);
  return data;
};

export default {
  getBreeds
};
