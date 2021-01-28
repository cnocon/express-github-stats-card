const Header = (user, username) => (
  `<header><h3><a href="${user.html_url}" target="_blank" rel="noopener nofollow">@${username}</a>&nbsp;on GitHub<img src="https://github.githubassets.com/images/icons/emoji/octocat.png?v8" alt="Octocat"/></h3><h5><span><b>${user.public_repos}</b>Public Repos</span><span>|</span><span><b>${user.public_gists}</b>Public Gists</span></h5></header>`
)

module.exports = {
  Header: Header
}