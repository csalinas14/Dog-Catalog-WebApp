import { User } from '../models';
import { PreDatabaseUser } from '../types';

const addUser = async (newUser: PreDatabaseUser) => {
  const user = await User.create(newUser);
  return user;
};

const getUsers = async () => {
  const users = await User.findAll({});
  return users;
};

export default {
  addUser,
  getUsers
};
