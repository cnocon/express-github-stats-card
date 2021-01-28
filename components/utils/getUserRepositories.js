const { httpsGetRequest } = require('./httpsGetRequest');

const getUserRepositories = async (username, accessToken) => {
  const options = {
    'method': 'GET',
    'hostname': 'api.github.com',
    'path': `/users/${username}/repos`,
    'headers': {
      'Accept': 'application/vnd.github.v3+json',
      'user-agent': 'cnocon',
      'authorization': `token ${accessToken}`
    },
  };

  return new Promise((resolve, reject) => {
    httpsGetRequest(options, resolve, reject);
  }).then(data => {
    console.log('\n[github-stats-card SUCCESS]: fetched repository data');
    return data;
  }).catch(error => {
    console.log('\n[github-stats-card ERROR]: failed to fetch repository data');
    console.error(error);
  });
};

module.exports = {
  getUserRepositories: getUserRepositories
}