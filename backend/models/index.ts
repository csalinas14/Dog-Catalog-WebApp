import Breed from './breed';
import User from './user';
import Session from './sessions';

User.hasMany(Session);
Session.belongsTo(User);

export { Breed, User, Session };
