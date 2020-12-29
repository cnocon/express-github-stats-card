const https = require('https');
const { styles } = require('./CardStyles');
require('dotenv').config();

const pluralizer = (number, string) => {
  let newString = string.slice();
  if (number === 0) {
    newString = `${string}s`;
  }
  else if (number > 1) {
    newString = `${string}s`;
  }
  return newString;
}

const httpsGetRequest = async (options, resolve, reject) => {
  await https.get(options, res => {
    const chunks = [];
    res.on("data", chunk => chunks.push(chunk));

    res.on("end", chunk => {
      const body = Buffer.concat(chunks);
      resolve(JSON.parse(body.toString()));
    });

    res.on("error", error => {
      console.error(error);
      reject(error);
    });
  })
}

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

const Card = async (username, accessToken, theme = false) => {
  return Promise.all([
    getUserData(username, accessToken),
    getUserRepositories(username, accessToken)
  ]).then(payload => {
    const user = payload[0];
    const repos = payload[1];
    const languagesObj = {};
    
    if (!repos.length || repos.length === 0) {
      throw new Error('At least one public repo must exist');
    } else if (!user) {
      throw new Error('GitHub user not found');
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
    // const bio = !user.bio ? `` : `<h4>${user.bio}</h4>`;
    const bio = ``;
    const header = `<header><h3><a href="${user.html_url}" target="_blank" rel="noopener nofollow">@${username}</a>&nbsp;on GitHub<img src="https://github.githubassets.com/images/icons/emoji/octocat.png?v8" alt="Octocat"/></h3>${bio}<h5><span><b>${user.public_repos}</b>Public Repos</span><span>|</span><span><b>${user.public_gists}</b>Public Gists</span></h5></header>`;
    const content = `<div><p><b>Top Languages</b></p><ol>${languagesMarkup}</ol><ul>${openIssues}${watchers}${stargazers}${followers}${following}</ul></div>`;
    const blog = !user.blog ? `` : `<p><a href="${user.blog}">${user.blog.split('://')[1]}</a></p>`;
    const company = !user.company ? `` : `<p>${user.company}</p>`;
    const location = !user.location ? `` : `<p>${user.location}</p>`;
    const fullName = !user.name ? `` : `<p><b>${user.name}</b></p>`;
    const footer = `<footer><img src="${user.avatar_url}" alt="${user.name}"/><section>${fullName}${blog}${location}${company}</section></footer>`;
    let element = `<div id="github-stats-card">${header}${content}${footer}</div>`;

    if (theme) {
      element = `${styles}${element}`;
    }

    return element;
  }).catch(error => {
    console.error(error);
    return `<div id="github-stats-card"><header><h3>@${username} on GitHub</h3></header><div><p>GitHub Stat Card Failed to Load</p></div></div>`;
  });
};

module.exports = {
  Card: Card
}