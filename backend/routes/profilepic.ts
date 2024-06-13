import express from 'express';
import middleware from '../utils/middleware';
import profilePicService from '../services/profilepicService';

const router = express.Router();

router.post('/', middleware.tokenExtractor, profilePicService.uploadProfilePic);

export default router;
