var express = require('express');
var reqIp = require('request-ip');
var app = express();
var port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use('/assets/', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/api/whoami', function(req, res){
    var ipAddress = reqIp.getClientIp(req);
    var lang = req.headers['accept-language'];
    var software = req.headers['user-agent'];
    
    res.json({
        ipaddress: ipAddress,
        language: lang.substring(0, lang.indexOf(',')),
        software: software.substring(software.indexOf('(') + 1, software.indexOf(')'))
    })
});

app.listen(port, function(){
    console.log('Express app started, listeing on port ' + port);
});