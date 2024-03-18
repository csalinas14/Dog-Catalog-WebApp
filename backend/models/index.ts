import Breed from './breed';
import User from './user';
import Session from './sessions';
import Favorite from './favorite';

User.hasMany(Session);
Session.belongsTo(User);

User.hasMany(Favorite);
Favorite.belongsTo(User);

export { Breed, User, Session, Favorite };
