var express = require("express") 
const app = express()
const port = 3000
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index")
var mongoose = require("mongoose");
var path = require("path");

var http = require('http');

// var socket_io = require('socket.io');
// var io = socket_io()
var io = require('socket.io')();
var socketService = require('./services/SocketService.js')(io)


mongoose.connect("mongodb+srv://siqiy:102938@siqiy.6zytxru.mongodb.net/?retryWrites=true&w=majority");
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', (req, res) => { 
//   res.send('Hello Express World!!!')
// })

app.use("/", indexRouter); 
app.use("/api/v1", restRouter); ///api/v1开头的都交给restRouter处理

app.use(function(req, res){  
  res.sendFile("index.html", {root: path.join(__dirname, '../public/')});
});

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })

var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  throw error;
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr == 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;
  console.log('Listening on ' + bind);
}


