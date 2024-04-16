import express from 'express';
import loginService from '../services/loginService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const loginUser = await loginService.login(req.body);
    res.json(loginUser);
  } catch (error: unknown) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
