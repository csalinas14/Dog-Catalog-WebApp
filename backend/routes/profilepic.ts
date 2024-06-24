import express from 'express';
import middleware from '../utils/middleware';
import { uploadProfilePic } from '../services/profilepicService';

const router = express.Router();

router.post('/', middleware.tokenExtractor, uploadProfilePic);

export default router;
