const express = require('express');
const { Card } = require('./components/Card');
const { demoStyles, fedDemoStyles } = require('./components/utils/');

const app = express();

app.get('/', async (_, res) => {
	const cardEl = await Card('cnocon', process.env.GITHUB_ACCESS_TOKEN, true);
	res.send(`${demoStyles}${cardEl}`);
});

app.get('/fed', async (_, res) => {
	Promise.all([
		Card('CBandersnatch', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('cnocon', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('CodeyPacker', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('cuttlemaster', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('ddefaclearlink', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('jlauram11', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('maxwilets', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('richardtaylordawson', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('RyanWassom', process.env.GITHUB_ACCESS_TOKEN, true),
		Card('scotttharvey', process.env.GITHUB_ACCESS_TOKEN, true)
	])
	.then(resolvedPromise => {
		res.send(`${fedDemoStyles}${resolvedPromise.join('')}`);
	})
	.catch(error => {
		console.error(error);
	});
});

app.listen(8080, () => {
	console.log('Server running on port 8080');
});