import express from 'express';
import sessionService from '../services/sessionService';

const router = express.Router();

router.get('/:token', async (req, res) => {
  try {
    const activeSession = await sessionService.checkSession(req.params.token);
    res.send({ active: activeSession });
  } catch (error: unknown) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send({ message: errorMessage, status: 400 });
  }
});

export default router;
