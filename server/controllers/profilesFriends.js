const models = require('../../db/models');

module.exports.getAllFriends = (req, res) => {
  models.ProfileFriends.where({ profile_id: req.params.id }).fetchAll({ withRelated: ['friend'] })
    .then(friends => {
      console.log('controllers/profileFriends: ', friends);
      res.status(200).send(friends);
    })
    .catch(err => {
      console.log('controllers/profileFriends ERRRR: ', err);
      res.status(503).send(err);
    });
};
