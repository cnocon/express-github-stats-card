const styled = require('./HeaderStyles');
const https = require('https');

const getLanguagesData = async (username, repos) => {
  let languagesMap = {};
  let languagesArr = [];
  
  const langData = Object.values(repos).map(repo => {
    const opts = {
      'method': 'GET',
      'hostname': 'api.github.com',
      'path': `/repos/${username}/${repo.name}/languages`,
      'headers': {
        'Accept': 'application/vnd.github.v3+json',
        'user-agent': 'cnocon'
      },
    }
    
    const langData = new Promise((resolve, reject) => {
      https.get(opts, (res) => {
        const chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function (chunk) {
          const body = Buffer.concat(chunks);
          const obj = JSON.parse(body.toString());
          console.log('\n*******\n');
          console.log(obj);
          Object.keys(obj).forEach(k => {
            if (languagesMap[k]) {
              languagesMap[k] += obj[k];
            } else {
              languagesMap[k] = obj[k];
            }
            resolve(languagesMap);
          });
        });

        res.on("error", function (error) {
          reject(error);
        });
      })
    });

    
    console.log('langData', langData);
    
  });

}

const reposData = async (username, repo) => {
  const options = {
    'method': 'GET',
    'hostname': 'api.github.com',
    'path': `/users/${username}/repos`,
    'headers': {
      'Accept': 'application/vnd.github.v3+json',
      'user-agent': 'cnocon'
    },
  };

  const data = new Promise((resolve, reject) => {
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
        reject(error);
      });
    })
  });

  const repos = await data;

  return repos;
}

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

const Card = async (username, theme = false) => {
  const json = await userData(username);
  const repos = await reposData(username);
  const languages = await getLanguagesData(username, repos);

  let element = `<div><h3><a href="${json.html_url}" target="_blank" rel="noopener nofollow">@${username} <em>on</em> GitHub</a></h3><div><b>${json.public_repos}</b>&nbsp;Public Repos&nbsp;|&nbsp;<b>${json.public_gists}</b>&nbsp;Public Gists</div>`;

  if (theme) {
    element = `<style>h3 {color: red;}</style><div style="${styled.container}"><h3 style="${styled.h3}"><a href="${json.html_url}" target="_blank" rel="noopener nofollow" style="${styled.a}">@${username} <em>on</em> GitHub</a></h3>
    <div style="${styled.div}"><b>${json.public_repos}</b>&nbsp;Public Repos&nbsp;|&nbsp;<b>${json.public_gists}</b>&nbsp;Public Gists</div></div>`;
  }

  return element;
};

module.exports = {
  Card: Card
}