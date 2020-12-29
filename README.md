# GitHub Stats Card

Pass in a minimum of your [GitHub access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) and a [GitHub username](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-user-account/remembering-your-github-username-or-email) and get this:

![Widget Screenshot](github-stats-card-screenshot.png)

## Installation

```bash
npm install @cnocon/github-stats-card
```

## Example using Express:

The Card function returns an HTML string you can append anywhere. The first argument is the GitHub username, the second is your GitHub access token, and the third is an optional `Boolean` for whether or not you want to style the card with the included theme. Defaults to `false`.

```js
const { Card } = require('@cnocon/github-stats-card');

// ...
app.get('/', async (req, res) => {
  const statsCard = await Card('cnocon', process.env.GITHUB_ACCESS_TOKEN, true);
  res.send(statsCard);
});
```
