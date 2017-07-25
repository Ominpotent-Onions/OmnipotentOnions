const models = require('../../db/models');

module.exports.getAllPendingFriends = (req, res) => {
  models.PendingFriends.where({ friend_id: req.params.id }).fetchAll( { withRelated: ['user'] } )
    .then(requests => {
      // console.log('controllers/pendingFriends: ', requests);
      res.status(200).send(requests);
    })
    .catch(err => {
      // console.log('controllers/profileFriends ERRR: ', err);
      res.status(503).send(err);
    });
};

module.exports.getAllFriendRequests = (req, res) => {
  models.PendingFriends.where({ profile_id: req.params.id }).fetchAll( { withRelated: ['friend'] } )
    .then(requests => {
      // console.log('controllers/pendingFriends/getAllFriendRequests: ', requests);
      res.status(200).send(requests);
    })
    .catch(err => {
      // console.log('controllers/pendingFriends/getAllFriendRequests ERRR: ', err);
      res.status(503).send(err);
    });
};

module.exports.sendFriendRequest = (req, res) => {
  models.PendingFriends.forge()
    .save({
      profile_id: req.params.id,
      friend_id: req.params.friendId
    })
    .then(request => {
      res.status(201).send(request);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};