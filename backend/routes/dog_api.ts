import express from 'express';
import apiService from '../services/apiService';
import { BaseQuery, ImagesQuery } from '../types';
import { Request } from 'express';

const router = express.Router();

router.get(
  '/breeds',
  (req: Request<unknown, unknown, unknown, BaseQuery>, res) => {
    //IIFE required to pass our async function

    // prettier-ignore-start
    void (async () => {
      const data = await apiService.getBreeds({
        animal: req.query.animal,
        limit: req.query.limit,
        page: req.query.page
      });
      //console.log(res.header);
      res.send(data);
    })();
    // prettier-ignore-end
  }
);

router.get(
  '/images',
  (req: Request<unknown, unknown, unknown, ImagesQuery>, res) => {
    // prettier-ignore-start
    void (async () => {
      try {
        const data = await apiService.getImages({
          animal: req.query.animal,
          limit: req.query.limit,
          page: req.query.page,
          id: req.query.id
        });
        //console.log(res.header);
        res.send(data);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
    })();
    // prettier-ignore-end
  }
);

export default router;
