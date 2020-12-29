# GitHub Stats Card

This is currently under development. Do not use! 

## Installation

```bash
npm install @cnocon/github-stats-card
```

## Example using Express:

```js
const { Card } = require('@cnocon/github-stats-card');

// ...
app.get('/', async (req, res) => {
	const cardEl = await Card('cnocon');
	res.send(cardEl);
});
```
