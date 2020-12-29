const styled = require('./HeaderStyles');
const https = require('https');

const userData = username => {
  const options = {
    'method': 'GET',
    'hostname': 'api.github.com',
    'path': `/users/${username}`,
    'headers': {
      'Accept': 'application/vnd.github.v3+json',
      'user-agent': 'cnocon'
    },
  };

  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        const body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });

      res.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    })
  });
};

const Header = async (username, theme = false) => {
  const json = await userData(username);
  let element = `<div><h3><a href="${json.html_url}" target="_blank" rel="noopener nofollow">@${username} <em>on</em> GitHub</a></h3><div><b>${json.public_repos}</b>&nbsp;Public Repos&nbsp;|&nbsp;<b>${json.public_gists}</b>&nbsp;Public Gists</div>`;

  if (theme) {
    element = `<div style="${styled.container}"><h3 style="${styled.h3}"><a href="${json.html_url}" target="_blank" rel="noopener nofollow" style="${styled.a}">@${username} <em>on</em> GitHub</a></h3>
    <div style="${styled.div}"><b>${json.public_repos}</b>&nbsp;Public Repos&nbsp;|&nbsp;<b>${json.public_gists}</b>&nbsp;Public Gists</div></div>`;
  }

  return element;
};

module.exports = {
  Header: Header
}