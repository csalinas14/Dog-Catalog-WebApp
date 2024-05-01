import { Session } from '../models';

const checkSession = async (token: string) => {
  const session = await Session.findOne({
    where: {
      token: token
    }
  });
  if (session === null || !session.createdAt) return false;

  const now = new Date().getTime();
  const diff = now - new Date(session.createdAt).getTime();
  const diff_in_days = diff / (1000 * 3600 * 24);

  if (session.rememberMe && diff_in_days < 30) {
    return true;
  } else if (!session.rememberMe && diff_in_days < 1) return true;

  return false;
};

export default {
  checkSession
};
