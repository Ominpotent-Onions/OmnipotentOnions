'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();
var server = app.listen(8080);
const io = require('socket.io').listen(server);

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);

// add groups router
app.use('/groups', routes.groups);

// add profiles_groups router
app.use('/profileGroups/', routes.profilesGroups);

//  add channels router
app.use('/channels', routes.channels);

// add messages router
app.use('/messages/', routes.messages);

io.on('connection', function(socket){
  console.log('a user has connected');
  socket.on('send', (message) => {
    console.log('received message:', message);
    socket.emit('return-message', message);
  });
});

module.exports = app;
