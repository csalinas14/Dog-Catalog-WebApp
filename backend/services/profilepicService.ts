import { Request, Response } from 'express';
import middleware from '../utils/middleware';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('true-mates-bucket');

export const uploadProfilePic = async (req: Request, res: Response) => {
  try {
    await middleware.processFileMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ error: 'Please upload a file' });
    }

    console.log(req.file);
    console.log(bucket);
    return res.status(200);
  } catch (error) {
    return res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname} ${error}`
    });
  }
};
