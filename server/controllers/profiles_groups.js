const models = require('../../db/models');

module.exports.getAllGroups = (req, res) => {
  models.Profile_Group.where({ profile_id: req.params.id }).fetch()
  .then(groups => {});
};