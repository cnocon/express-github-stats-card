# GitHub Stats Card

Pass in a GitHub username and get this:

![Widget Screenshot](github-stats-card-screenshot.png)

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
