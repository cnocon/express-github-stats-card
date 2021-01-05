const express = require('express');
const Card = require('./components/Card').Card;

const app = express();

app.get('/', async (req, res) => {
	const cardEl = await Card('cnocon', process.env.GITHUB_ACCESS_TOKEN, true);
	res.send(cardEl);
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});