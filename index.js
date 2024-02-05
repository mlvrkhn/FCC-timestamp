// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const moment = require('moment');

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function (req, res) {
	const { date } = req.params;

	if (!date) {
		res.json({
			unix: new Date().getTime(),
			utc: new Date().toUTCString(),
		});
	} else if (moment(date).isValid()) {
		res.json({
			unix: new Date(date).getTime(),
			utc: new Date(date).toUTCString(),
		});
	} else if (!isNaN(date)) {
		res.json({
			unix: new Date(parseInt(date)).getTime(),
			utc: new Date(parseInt(date)).toUTCString(),
		});
	} else {
		res.json({ error: 'Invalid Date' });
	}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log(
		'Your app is listening on http://localhost:' + listener.address().port
	);
});
