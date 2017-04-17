var express = require('express');
var app = express();
var Slack = require('./code/slack');
var Utils = require('./code/utils');
var favicon = require('serve-favicon');

// default Heroku setup
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicons/favicon.ico'));

// routes
app.get('/', function(request, response) {
    response.render('pages/index', {
        currentTick: Utils.getCurrentTick()
    });
});

app.get('/api/slack/slumpvard', function(request, response) {
    // TODO: dynamically route the last part of the url to a slack command, like if path is slack_commands/<variable>  match that to slack.<variable>()
    var msg = Slack.commands.slumpvard();
    response.json(msg);
});

app.get('/api/tick', function(request, response) {
    var tick = Utils.getCurrentTick();
    var msg = {
        tick: tick
    }
    response.json(msg);
});

// 404 handling
app.use(function(req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.render('pages/404', {
            url: req.url
        });
        return;
    }
    if (req.accepts('json')) {
        res.json({
            error: '404 Not found'
        });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('404 Not found');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
