var app = require('express')();
var http = require('http').Server(app);

// initialize socket.io
var io = require('socket.io')(http);


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('connected: ', socket.id);

  var users = Object.keys(io.sockets.sockets);
  io.emit('update users', users);
  
  socket.on('disconnect', function() {
    var users = Object.keys(io.sockets.sockets);
    io.emit('update users', users);
  });

  socket.on('mouse move', function(msg) {
    socket.broadcast.emit('someone moved', msg);
  });

});


// use http to start server
http.listen(3000, function() {
  console.log('listening on *:3000');
});