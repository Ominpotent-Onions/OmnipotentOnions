const models = require('../../db/models');

module.exports.getAllGroups = (req, res) => {
  console.log('INSIDE PROFILE_GROUPS!', req.params.id);
  models.ProfileGroup.where({ profile_id: req.params.id }).fetchAll({ withRelated: ['groups.id'] })
  .then(groups => {
    res.status(200).send(groups);
  })
  .catch(err => {
    res.status(503).send(err);
  });
};

module.exports.joinGroup = (req, res) => {
  modules.ProfileGroup.forge({ profile_id: req.params.id, group_id: req.body.group_id })
    .save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};