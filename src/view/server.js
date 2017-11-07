var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/tank.html');
});

io.on('connection', function (socket) {
    console.log(io.rooms);
    socket.on('data', function (msg) {
        io.emit('data', msg);
    });
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});
