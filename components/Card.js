const https = require('https');
const { styles } = require('./CardStyles');

const reposData = async (username) => {
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
  }).catch(error => {
    console.error(error);
    return false;
  });;

  return await data;
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
  }).catch(error => {
    console.error(error);
    return false;
  });
};

const Card = async (username, theme = false) => {
  return Promise.all([
    userData(username),
    reposData(username)
  ]).then(payload => {
    const user = payload[0];
    const repos = payload[1];
    const languagesObj = {};
    
    if (!repos.length || repos.length === 1) {
      throw new Error('Repos length must be greater than 0');
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
    
    const sortedLanguages = Object.entries(languagesObj).sort(function(a, b) {
      return a[1][1] - b[1][1];
    });

    const topLanguages = sortedLanguages.slice(0,3);
    
    const stargazers = repos.reduce((acc, r) => { 
      return acc + r.stargazers_count;
    }, 0);

    const watchers = repos.reduce((acc, r) => {
      return acc + r.watchers_count;
    }, 0);

    const openIssues = repos.reduce((acc, r) => {
      return acc + r.open_issues_count;
    }, 0);

    let element = `<div id="github-stats-card"><header><h3><a href="${user.html_url}" target="_blank" rel="noopener nofollow">@${username} <i>on</i> GitHub</a><img src="https://github.githubassets.com/images/icons/emoji/octocat.png?v8" alt="Octocat"/></h3><div class='subheader'><b>${user.public_repos}</b>&nbsp;Public Repos&nbsp;|&nbsp;<b>${user.public_gists}</b>&nbsp;Public Gists</div></header>
    <div class='content'><p><b>Top Languages</b></p><ol class='top'><li><em>${topLanguages[1][0]}</em><small>${topLanguages[1][1]} repo(s)</small></li><li><em>${topLanguages[0][0]}</em><small>${topLanguages[0][1]} repo(s)</small></li><li><em>${topLanguages[2][0]}</em><small>${topLanguages[2][1]} repo(s)</small></li></ol><ul class='bottom'></li><li><b>Total Watchers</b>: ${watchers}</li><li><b>All Open Issues</b>: ${openIssues}</li><li><b>Stargazers</b>: ${stargazers}</li></ul></div></div>`;
    
    if (theme) {
      element = `${styles}${element}`;
    }

    return element;
  }).catch(error => {
    console.error(error);
    return `<div id="github-stats-card"><header><h3>@${username} <i>on</i> GitHub</h3></header><div class="content"><p>GitHub Stat Card Failed to Load</p></div></div>`;
  });
};

module.exports = {
  Card: Card
}