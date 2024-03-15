import express from 'express';
import loginService from '../services/loginService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const loginUser = await loginService.login(req.body);
    res.json(loginUser);
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
