const express = require('express');
const middleware = require('../middleware');
const router = express.Router();
const server = require('http').Server(app);
const io = require('socket.io')(server);

router.route('/socket').get((req, res) => {
	// res.sendfile(__dirname + '/index.html')
  console.log('hello');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


module.exports = router;