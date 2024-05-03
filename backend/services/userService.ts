import { User } from '../models';
import { NonSensitiveUser, PreDatabaseUser, UserInstance } from '../types';

const addUser = async (newUser: PreDatabaseUser) => {
  const user = await User.create(newUser);
  const nonSenUser: NonSensitiveUser = {
    name: user.name,
    id: user.id,
    username: user.username
  };
  return nonSenUser;
};

const getUsers = async (): Promise<UserInstance[]> => {
  const users = await User.findAll({});
  return users;
};

export default {
  addUser,
  getUsers
};
