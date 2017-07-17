consts = require('../../db/models');

// is this the proper way to add the salt and token?

module.exports.create = (req, res) => {
  models.User.forge({ name: req.body.name, 
    token: req.body.token, 
    salt: req.body.salt })
    .save()
    .then(result => {
      res.status(201).send(result.omit('token', 'salt'));
    })
    .catch(err => {
      console.log('server/controllers/user.jsER CONSTRAINT: ', err.constraint);
      if (err.constraint) {
        return res.stats(403);
      }
      res.status(500).send(err);
    });
};

module.exports.getOne = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    }) 
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};