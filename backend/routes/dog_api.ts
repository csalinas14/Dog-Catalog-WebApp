import express from 'express';
import apiService from '../services/apiService';
import { BreedQuery } from '../types';
import { Request } from 'express';

const router = express.Router();

router.get('/', (req: Request<unknown, unknown, unknown, BreedQuery>, res) => {
  //IIFE required to pass our async function

  // prettier-ignore-start
  void (async () => {
    const data = await apiService.getBreeds({
      animal: req.query.animal,
      limit: req.query.limit,
      page: req.query.page
    });
    res.send(data);
  })();
  // prettier-ignore-end
});

export default router;
