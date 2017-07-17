const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  salt: () => this.belongsTo('Auth.salt')
});

module.exports = db.model('User', User);
