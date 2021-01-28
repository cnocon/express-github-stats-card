const { httpsGetRequest } = require('./httpsGetRequest');

const getUserData = (username, accessToken) => {
  const options = {
    'method': 'GET',
    'hostname': 'api.github.com',
    'path': `/users/${username}`,
    'headers': {
      'Accept': 'application/vnd.github.v3+json',
      'user-agent': 'cnocon',
      'authorization': `token ${accessToken}`
    },
  };

  return new Promise((resolve, reject) => {
    httpsGetRequest(options, resolve, reject);
  }).then(data => {
    console.log('\n[github-stats-card SUCCESS]: fetched user data');
    return data;
  }).catch(error => {
    console.log('\n[github-stats-card ERROR]: failed to fetch user data');
    console.error(error);
  });
};

module.exports = {
  getUserData: getUserData
}