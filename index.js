var express = require('express');
var app = express();
var slack = require('./code/slack');
var Promise = require('q').Promise;
var Nightmare = require('nightmare');
var nightmare = Nightmare();

// default Heroku setup
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routes
app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/slack_commands/slumpvard', function(request, response) {
    // TODO: check if there's a way to dynamically route the last part of the url to a slack command, like slack_commands/<variable> and match that to slack.<variable>()
    var promise = slack.commands.slumpvard();
    promise.then(function(result){
        debugger;
        response.json(result);
    });
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
