const { Hacker } = require('js/server/models');
const statuses = require('js/shared/status-constants');

const unfinishedApplicationKind = { INDIVIDUAL: 'individual', TEAM_ONLY: 'team-only' };

function getHackersWithUnfinishedApplications(kind) {
  return Hacker.findAll().then(hackers =>
    Promise.all(hackers.map(hacker =>
      hacker.getHackerApplication().then(hackerApplication =>
        Promise.all([
          hacker.getApplicationStatus(hackerApplication),
          hacker.getTeamApplicationStatus(hackerApplication)
        ]).then(([applicationStatus, teamApplicationStatus]) => {
          if (kind == unfinishedApplicationKind.INDIVIDUAL) {
            return applicationStatus == statuses.application.INCOMPLETE ? hacker : null;
          } else if (kind == unfinishedApplicationKind.TEAM_ONLY) {
            // The value of teamApplicationStatus is null if the individual application hasn't been finished,
            // so ensure we only return the hacker when teamApplicationStatus is INCOMPLETE.
            return teamApplicationStatus == statuses.teamApplication.INCOMPLETE ? hacker : null;
          } else {
            throw Error('Unknown unfinished application kind');
          }
        })
      )
    )).then(hackerResults => hackerResults.filter(result => result !== null))
  );
}

module.exports = { unfinishedApplicationKind, getHackersWithUnfinishedApplications };
