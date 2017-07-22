const db = require('../');
const ProfileFriends = db.Model.extend({
  tableName: 'profiles_friends',
  user: function() {
    return this.belongsTo('Profile');
  },
  friend: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('ProfileFriends', ProfileFriends);