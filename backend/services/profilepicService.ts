import { Request, Response } from 'express';
import middleware from '../utils/middleware';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('true-mates-bucket');

const uploadProfilePic = async (req: Request, res: Response) => {
  try {
    await middleware.processFileMiddleware(req, res);
  } catch (error) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname} ${error}`
    });
  }
};

export default {
  uploadProfilePic
};
