require('dotenv').config();
const { styles } = require('./CardStyles');
const { Header, Footer, Content, ErrorCard } = require('./partials');
const { getUserData, getUserRepositories } = require('./utils');

const Card = async (username, accessToken, theme = false) => {
  return await Promise.all([
    getUserData(username, accessToken),
    getUserRepositories(username, accessToken)
  ])
  .then(payload => {
    const [user] = payload;
    const element = `
      <div class="github-stats-card">
        ${Header(user, username)}
        ${Content(payload)}
        ${Footer(user)}
      </div>
    `;
    return theme ? `${styles}${element}` : element;
  })
  .catch(e => {
    console.error(e);
    return theme ? `${styles}${ErrorCard(username, e)}` : ErrorCard(username, e);
  });
};

module.exports = {
  Card
}