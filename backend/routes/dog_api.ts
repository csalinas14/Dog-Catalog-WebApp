import express from 'express';
import apiService from '../services/apiService';
//import { Breed } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  void (async () => {
    const data = await apiService.getBreeds();
    //console.log(data);
    res.send(data);
  })();
});

export default router;
