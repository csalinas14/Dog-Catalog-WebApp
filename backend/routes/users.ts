import express, { RequestHandler } from 'express';
import { toNewUser } from '../utils';
import userServce from '../services/userService';
import bcrypt from 'bcrypt';
import { PreDatabaseUser } from '../types';

const router = express.Router();

router.get('/', (async (_req, res) => {
  const users = await userServce.getUsers();
  res.json(users);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const newUser = toNewUser(req.body);
    //handling hashing the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newUser.password, saltRounds);
    const newUserWithHash: PreDatabaseUser = {
      username: newUser.username,
      passwordHash: passwordHash,
      name: newUser.name
    };
    const addedUser = await userServce.addUser(newUserWithHash);
    res.json(addedUser);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
}) as RequestHandler);

export default router;
