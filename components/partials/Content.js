const { pluralizer } = require('../utils/pluralizer');

const Content = payload => {
  const [user, repos] = payload;
  const languagesObj = {};

  if (!repos.length || repos.length === 0) {
    const err = new Error();
    err.msg = `No public repositories are available for this user.`;
    err.user = user;
    throw err;
  } else if (!user) {
    const err = new Error();
    err.msg = 'No GitHub user data available for this username. ';
    throw err;
  }

  repos.forEach(r => {
    if (r.language && r.language !== null) {
      if (languagesObj[r.language]) {
        languagesObj[r.language] += 1;
      } else {
        languagesObj[r.language] = 1;
      }
    }
  });

  const sortedLanguages = Object.entries(languagesObj).sort((a, b) => {
    return a[1][1] - b[1][1];
  });

  const topLanguages = sortedLanguages.length >= 3 ? sortedLanguages.slice(0,3) : sortedLanguages;
  const languagesMarkup = topLanguages.map(language => (
    `<li><b>${language[0]}</b><small>${language[1]} ${pluralizer(parseInt(language[1]), 'repo')}</small></li>`
  )).join('');
  const watchersCount = repos.reduce((acc, r) => (acc + r.watchers_count), 0);
  const stargazersCount = repos.reduce((acc, r) => (acc + r.stargazers_count), 0);
  const openIssuesCount = repos.reduce((acc, r) => (acc + r.open_issues_count), 0);
  const stargazers = `<li>Starred <b>${stargazersCount}</b> ${pluralizer(parseInt(stargazersCount), `time`)}</li>`;
  const watchers = `<li><b>${watchersCount}</b> ${pluralizer(parseInt(watchersCount), `watcher`)}</li>`;
  const followers = `<li>Followed by <b>${user.followers}</b> ${pluralizer(parseInt(user.followers), `member`)}</li>`;
  const following = `<li>Following <b>${user.following}</b> ${pluralizer(parseInt(user.following), `member`)}</li>`;
  const openIssues = `<li><b>${openIssuesCount}</b>&nbsp;${pluralizer(parseInt(openIssuesCount), `open issue`)}</li>`;

  return `<div><p><b>Top Languages</b></p><ol>${languagesMarkup}</ol><ul>${openIssues}${watchers}${stargazers}${followers}${following}</ul></div>`;
}

module.exports = {
  Content
}