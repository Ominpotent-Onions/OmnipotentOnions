const models = require('../models');

exports.seed = function (knex, Promise) {
  return knex('groups').insert({
    id: 1,
    name: 'Omnipotent Room',
    shortID: 'OMNI1234'
  });
};