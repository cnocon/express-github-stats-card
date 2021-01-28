const { httpsGetRequest } = require('./httpsGetRequest');
const { getUserRepositories } = require('./getUserRepositories');
const { getUserData } = require('./getUserData');
const { pluralizer } = require('./pluralizer');
const { demoStyles } = require('./demoStyles');
const { allDemoStyles } = require('./allDemoStyles');

module.exports = {
  getUserRepositories,
  httpsGetRequest,
  getUserData,
  pluralizer,
  demoStyles,
  allDemoStyles
}