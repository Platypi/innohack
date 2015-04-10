var connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    morgan = require('morgan');

var app = connect();

app.use(morgan('combined'));
app.use(serveStatic('public/', { 'index': ['index.html'] }));

http.createServer(app).listen(3000);
console.log('listening on port 3000');

