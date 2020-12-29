# GitHub Stats Card

Pass in a GitHub username and get this:

![Widget Screenshot](https://www.dropbox.com/s/0o5b6jis86kdyzg/github-stats-card-screenshot.png?dl=1)

## Installation

```bash
npm install @cnocon/github-stats-card
```

## Example using Express:

The Card function returns an HTML string you can append anywhere. The first argument is the GitHub username, and the second argument is an optional `Boolean` for whether or not you want to style the card with the included theme. Defaults to `false`.

```js
const { Card } = require('@cnocon/github-stats-card');

// ...
app.get('/', async (req, res) => {
  const statsCard = await Card('cnocon', true);
  res.send(statsCard);
});
```
