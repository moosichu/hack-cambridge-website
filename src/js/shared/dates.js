const moment = require('moment');

function getHackathonStartDate() {
  return moment('2018-01-20');
}

function getHackathonEndDate() {
  return getHackathonStartDate().add(1, 'day');
}

/**
 * Returns the earliest graduation date we can accept.
 *
 * This is due to the restriction imposed by MLH that attendees must either be students or
 * graduates who have graduated within the 12 months prior to the event.
 * https://mlh.io/faq#i-just-graduated-can-i-still-come-to-an-event
 */
function getEarliestGraduationDateToAccept() {
  return getHackathonStartDate().subtract(1, 'year');
}

module.exports = {
  getHackathonStartDate,
  getHackathonEndDate,
  getEarliestGraduationDateToAccept
};
