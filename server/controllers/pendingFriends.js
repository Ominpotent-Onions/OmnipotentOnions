const models = require('../../db/models');

module.exports.getAllPendingFriends = (req, res) => {
  console.log('request received');
  models.PendingFriends.where({ friend_id: req.params.id }).fetchAll( { withRelated: ['user'] } )
    .then(requests => {
      console.log('controllers/pendingFriends: ', requests);
      res.status(200).send(requests);
    })
    .catch(err => {
      console.log('controllers/profileFriends ERRR: ', err);
      res.status(503).send(err);
    });
};