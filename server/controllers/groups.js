const models = require('../../db/models');

// module.exports.getAll = (req, res) => {
//   models.Group.fetchAll()
//     .then(groups => {
//       res.status(200).send(profiles);
//     })
//     .catch(err => {
//       res.status(503).send(err);
//     });
// };

module.exports.createGroup = (req, res) => {
  models.Group.forge()
    .save({ 
      name: req.params.id,
      shortID: req.query.shortID
    })
    .then(group => {
      models.ProfileGroup.forge()
        .save({
          profile_id: req.query.id,
          group_id: group.id
        })
        .then(() => {
          models.ProfileGroup.where({ profile_id: req.query.id })
            .fetchAll({ withRelated: ['groups'] })
            .then(groups => {
              console.log(groups);
              res.status(201).send(groups);
            });
        });
    })
    .catch(err => {
      if (err.constraint === 'groups_name_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};

module.exports.createInvite = (req, res) => {
  models.Group.forge({ id: req.params.id })
    .save({ shortID: req.query.id })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      if (err.constraint === 'groups_name_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};


