const https = require('https');

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
      #github-stats-card * {box-sizing: border-box;}
      #github-stats-card {max-width: 320px; margin: 0; width: 100%; padding: 0; background-color: #fff; box-sizing: border-box; font-family: Arial, sans-serif;  display: flex; border: 1px solid #efefef; flex-direction: column; flex-basis: 100%; font-size: 12px;}
      
      #github-stats-card header h3 {display: flex; justify-content: center; align-items: center;}
      #github-stats-card header h3 img,
      #github-stats-card header h3 a { display: flex; flex-direction: column; }
      #github-stats-card header h3 a { display: inline-block; text-decoration: none; color: #212121; max-width: calc(100% - 30px); }
      #github-stats-card header img { width: 20px; margin-left: 10px; }
      
      #github-stats-card .subheader { display: flex; justify-content: center; max-width: 100%; padding: 10px 15px; background-color: #efefef;}
      #github-stats-card ol, ul {max-width: 100%; display: flex; flex-direction: column; align-items: center; margin: 0; padding: 0 0 10px 10px;}
      #github-stats-card li { margin: 5px 0; }
      #github-stats-card li small { display: block; }
      #github-stats-card p {width: 100%; text-align: center;}
      #github-stats-card .top {display: flex; width: 100%; flex-direction: row; padding-bottom: 10px; border-bottom: 1px solid #efefef; margin-bottom: 10px; text-align: center; justify-content: space-around;}
      
      #github-stats-card .bottom { list-style: none; }
      
      #github-stats-card .content {display: flex; justify-content: center; flex-wrap: wrap; padding: 15px; }

      #github-stats-card .content,
      #github-stats-card .top,
      #github-stats-card .bottom,
      #github-stats-card header { max-width: 100%; }
    </style>`;

    let element = `<div id="github-stats-card"><header><h3><a href="${user.html_url}" target="_blank" rel="noopener nofollow">@${username} <i>on</i> GitHub</a><img src="https://github.githubassets.com/images/icons/emoji/octocat.png?v8" alt="Octocat"/></h3><div class='subheader'><b>${user.public_repos}</b>&nbsp;Public Repos&nbsp;|&nbsp;<b>${user.public_gists}</b>&nbsp;Public Gists</div></header>
    <div class='content'><p><b>Top Languages</b></p><ol class='top'><li><em>${topLanguages[1][0]}</em><small>${topLanguages[1][1]} repo(s)</small></li><li><em>${topLanguages[0][0]}</em><small>${topLanguages[0][1]} repo(s)</small></li><li><em>${topLanguages[2][0]}</em><small>${topLanguages[2][1]} repo(s)</small></li></ol><ul class='bottom'></li><li><b>Total Watchers</b>: ${watchers}</li><li><b>All Open Issues</b>: ${openIssues}</li><li><b>Stargazers</b>: ${stargazers}</li></ul></div></div>`;
    
    if (theme) {
      element = `${style}${element}`;
    }

    return element;
  })
};

module.exports = {
  Card: Card
}