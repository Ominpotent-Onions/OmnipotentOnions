const models = require('../../db/models');

module.exports.join = (req, res) => {
  // POST EVENT
  models.Attendee.forge({
    event_id: req.params.eventId,
    profile_id: req.body.profileId
  })
  .save()
  .then(attendee => {
    models.Attendee.where({ event_id: attendee.event_id }).fetchAll({
      withRelated: ['profile']
    })
    .then(attendees => res.status(201).send(attendees))
    .error(err => res.status(500).send(err));
  })
  .error(err => {
    res.status(500).send(err);
  });
};

module.exports.unjoin = (req, res) => {
  // DELETE EVENT
  models.Attendee.where({
    profile_id: req.body.profileId, 
    event_id: req.params.eventId
  })
  .fetch()
  .then(attend => {
    if (!attend) {
      throw attend;
    }
    return attend.destroy();
  })
  .then(() => {
    res.status(200).send('Unjoin event');
  })
  .error(err => {
    res.status(503).send(err);
  })
  .catch(() => {
    res.sendStatus(404);
  });
};

module.exports.getAll = (req, res) => {
  models.Attendee.where({ event_id: req.params.eventId }).fetchAll({ withRelated: ['profile']})
  .then(attendees => {
    res.status(200).send(attendees);
  })
  .error(err => {
    res.status(503).send(err);
  });  
};