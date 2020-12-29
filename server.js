const express = require('express');
const exported = require('./components/Card');
const { Card } = exported;

const app = express();

app.get('/', async (req, res) => {
	const cardEl = await Card('cnocon', true);
	res.send(cardEl);
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});