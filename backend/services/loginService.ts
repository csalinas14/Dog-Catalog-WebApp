import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../utils/config';
import { Session, User } from '../models';
//import { Request, Response } from 'express';
import { loginUser } from '../types';

const login = async (user: loginUser) => {
  //find user in database by their username provided
  const userFound = await User.findOne({
    where: {
      username: user.username
    }
  });
  //check if password is correct by comparing it to its hash
  const passwordCorrect =
    userFound === null
      ? false
      : await bcrypt.compare(user.password, userFound.passwordHash);

  //throw error if username or password incorrect
  if (!(userFound && passwordCorrect)) {
    throw new Error('Username or password is incorrect');
  }
  //throw error if a disabled account tries to login
  if (userFound && userFound.disabled) {
    throw new Error('Account disabled');
  }

  const userForToken = {
    username: userFound.username,
    id: userFound.id
  };

  //our token to represent user is logged in
  const token = jwt.sign(userForToken, SECRET);

  await Session.create({
    userId: userFound.id,
    token: token,
    rememberMe: user.rememberMe
  });

  const loginUser = {
    token,
    username: userFound.username,
    name: userFound.name,
    id: userFound.id
  };
  return loginUser;
};

export default {
  login
};
