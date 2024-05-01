import express from 'express';
import apiService from '../services/apiService';
import { BaseQuery, Param, ImagesQuery, NewFavorite } from '../types';
import { Request } from 'express';
import { toNewFavorite } from '../utils';
import middleware from '../utils/middleware';

const router = express.Router();

router.get(
  '/breeds',
  (req: Request<unknown, unknown, unknown, BaseQuery>, res) => {
    //IIFE required to pass our async function

    // prettier-ignore-start
    void (async () => {
      try {
        const { breeds, totalCount } = await apiService.getBreeds({
          animal: req.query.animal,
          limit: req.query.limit,
          page: req.query.page,
          breed_id: req.query.breed_id
        });
        //console.log(res.header);
        res.send({ breeds, totalCount });
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

router.get(
  '/breeds/:id',
  (req: Request<Param, unknown, unknown, BaseQuery>, res) => {
    //IIFE required to pass our async function

    // prettier-ignore-start
    void (async () => {
      try {
        const data = await apiService.getOneBreed({
          animal: req.query.animal,
          limit: req.query.limit,
          page: req.query.page,
          breed_id: req.params.id
        });

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
          id: req.query.id,
          breed_id: req.query.breed_id
        });
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

router.get(
  '/images/:id',
  (req: Request<Param, unknown, unknown, BaseQuery>, res) => {
    //IIFE required to pass our async function

    // prettier-ignore-start
    void (async () => {
      try {
        const data = await apiService.getImageById(
          req.query.animal,
          req.params.id
        );

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

router.post('/favorites', middleware.tokenExtractor, async (req, res) => {
  try {
    const newFav = toNewFavorite(req.body);
    const response = await apiService.addFavorite(
      newFav,
      req.user?.id as number
    );
    res.send(response);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
});

router.get(
  '/favorites',
  middleware.tokenExtractor,
  (
    req: Request<unknown, unknown, unknown, NewFavorite>,
    res: Record<string, any>
  ) => {
    // prettier-ignore-start
    void (async () => {
      try {
        //const { query } = req;
        const data = await apiService.getFavorites(req.query.animal, req.user);
        res.send(data);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
        res.status(400).send(errorMessage);
      }
    })();
    // prettier-ignore-end
  }
);

router.delete('/favorites/:id', middleware.tokenExtractor, async (req, res) => {
  try {
    const response = await apiService.delFavorite(req);
    console.log(response);
    res.send(response.data);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
});

export default router;
