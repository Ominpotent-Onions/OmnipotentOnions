const models = require('../../db/models');

module.exports.createChannel = (req, res) => {
  console.log('INSIDE CHANNEL CONTROLLER: ', req.query);
  models.Channel.forge({
    name: req.query.name,
    group_id: req.params.groupId
  })
    .save()
    .then(result => {
      models.Channel.where({ group_id: result.attributes.group_id }).fetchAll()
        .then(channels => {
          res.status(201).send(channels);          
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getGroupChannels = (req, res) => {
  models.Channel.where({ groups_id: req.params.id }).fetchAll()
    .then(channels => {
      res.status(200).send(channels);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

// module.exports.getChannel = (req, res) => {
//   models.Channel.where({ channel_id: req.params.channelId }).fetch()
//     .then(channel => {
//       res.status(200).send(channel);
//     })
//     .catch(err => {
//       res.status(503).send(err);
//     });
// };