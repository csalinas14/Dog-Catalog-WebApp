import { User } from '../models';
import { PreDatabaseUser, UserInstance } from '../types';

const addUser = async (newUser: PreDatabaseUser) => {
  const user = await User.create(newUser);
  return user;
};

const getUsers = async (): Promise<UserInstance[]> => {
  const users = await User.findAll({});
  return users;
};

export default {
  addUser,
  getUsers
};
