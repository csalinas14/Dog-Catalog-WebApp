import express from 'express';
import loginService from '../services/loginService';

const router = express.Router();

router.post('/', async (req, res) => {
  const loginUser = await loginService.login(req.body);
  res.json(loginUser);
});

export default router;
