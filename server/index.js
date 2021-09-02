const express = require('express');
const app = express();
const morgan = require('morgan');
const database = require('./database');
const http = require('http');

app.use(morgan('dev'));
app.use(express.json());
app.set('port', process.env.PORT || 8000);

app.use('/', require('./src/routes/api.routes'));

const server = http.createServer(app);
const io = require('socket.io')(server);
app.io = io;

io.sockets.on('connection', (socket) => {
  console.log('Socket is running => ' + socket.id);
});

server.listen(app.get('port'), () => {
 console.log('Server is working on port => ' + app.get('port'));
});
