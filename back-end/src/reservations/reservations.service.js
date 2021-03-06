const knex = require('../db/connection');

const list = (date) =>
  knex('reservations')
    .select('*')
    .whereNot('status', 'finished')
    .andWhere('reservation_date', date)
    .orderBy('reservation_time');

const read = (reservation_id) =>
  knex('reservations')
    .select('*')
    .where('reservation_id', reservation_id)
    .first();

const create = (newReservation) =>
  knex('reservations').insert(newReservation).returning('*');

const update = (reservation_id, updatedReservation) =>
  knex('reservations')
    .where('reservation_id', reservation_id)
    .update(updatedReservation)
    .returning([
      'first_name',
      'last_name',
      'mobile_number',
      'people',
      'reservation_date',
      'reservation_time',
    ]);

const updateStatus = (reservation_id, status) =>
  knex('reservations')
    .where('reservation_id', reservation_id)
    .update({ status: status })
    .returning('status');

const listByPhoneNumber = (mobile_number) =>
  knex('reservations')
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, '')}%`
    )
    .orderBy('reservation_date');

module.exports = {
  create,
  read,
  update,
  updateStatus,
  list,
  listByPhoneNumber,
};