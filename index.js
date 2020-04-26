var express = require('express');
var socket = require ('socket.io');

// App set up
var app = express();
var server = app.listen (process.env.PORT, function (){
    console.log('listening to request on port 4000');
});

//Static files
app.use(express.static('public'));

//Socket
var io = socket(server);

io.on('connection', function(socket) {

    console.log ('connection has been made: ' + socket.id);

    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        // console.log(data);
        socket.broadcast.emit('typing',data);
    });

});