const https = require('https');

const reposData = async (username, repo) => {
  const options = {
    'method': 'GET',
    'hostname': 'api.github.com',
    'path': `/users/${username}/repos`,
    'headers': {
      'Accept': 'application/vnd.github.v3+json',
      'user-agent': 'cnocon',
      'authorization': 'token eb89d8418dab128d1502f3ea37f1fd8069062d26'
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

  return await data;
}

const userData = username => {
  const options = {
    'method': 'GET',
    'hostname': 'api.github.com',
    'path': `/users/${username}`,
    'headers': {
      'Accept': 'application/vnd.github.v3+json',
      'authorization': 'token eb89d8418dab128d1502f3ea37f1fd8069062d26',
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
  return Promise.all([
    userData(username),
    reposData(username)
  ]).then(payload => {
    const user = payload[0];
    const repos = payload[1];
    const languagesObj = {};
    
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

    const style = `<style>
      #github-stats-card {max-width: 340px; padding: 0; background-color: #fff; box-sizing: border-box; font-family: Arial, sans-serif;  display: flex; border: 1px solid #efefef; width: 350px; min-height: 300px; flex-direction: column;}
      
      #github-stats-card header h3 {display: flex; justify-content: center; align-items: center;}
      #github-stats-card header h3 img,
      #github-stats-card header h3 a { display: flex; flex-direction: column; }
      #github-stats-card header h3 a { display: inline-block; text-decoration: none; color: #212121; max-width: calc(100% - 50px); }
      #github-stats-card header img { height: 30px; margin-left: 10px; }
      
      #github-stats-card .subheader { display: flex; justify-content: center; padding: 10px 15px; background-color: #efefef;}
      #github-stats-card ol, ul {margin: 0; padding: 0 0 10px 10px;}
      #github-stats-card ul { list-style: none; }
      #github-stats-card li { margin: 5px 0; }
      #github-stats-card ul > .header > b { display: inline-block; margin-bottom: 5px; }
      #github-stats-card .top {width: 100%; padding-bottom: 5px;}
      #github-stats-card li ol { padding-bottom: 0; padding: 0 0 0 30px; -webkit-column-break-inside: avoid; page-break-inside: avoid; break-inside: avoid;}
      
      #github-stats-card .content {display: flex; flex-wrap: wrap; font-size: 14px; padding: 15px;}
    </style>`;

    let element = `<div id="github-stats-card" class='container'><header><h3><a href="${user.html_url}" target="_blank" rel="noopener nofollow">@${username} <i>on</i> GitHub</a><img src="https://github.githubassets.com/images/icons/emoji/octocat.png?v8" alt="Octocat"/></h3><div class='subheader'><b>${user.public_repos}</b>&nbsp;Public Repos&nbsp;|&nbsp;<b>${user.public_gists}</b>&nbsp;Public Gists</div></header>
    <div class='content'><ul class='top'><li class='header'><b>Top Languages</b>: <ol><li><b>${topLanguages[0][0]}</b>: ${topLanguages[0][1]} repo(s)</li><li><b>${topLanguages[1][0]}</b>: ${topLanguages[1][1]} repo(s)</li><li><b>${topLanguages[2][0]}</b>: ${topLanguages[2][1]} repo(s)</li></ol></li></ul><ul class='bottom'></li><li><b>Total Watchers</b>: ${watchers}</li><li><b>All Open Issues</b>: ${openIssues}</li><li><b>Stargazers</b>: ${stargazers}</li></ul></div></div>`;
    
    if (theme) {
      element = `${style}${element}`;
    }

    return element;
  })
};

module.exports = {
  Card: Card
}