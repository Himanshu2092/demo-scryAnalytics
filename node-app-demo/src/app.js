const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
const config = require('./config')
const stocksRouter = require("./routes");
const { connect: mongoInit } = require("./connection");
const { load: loadCsv } = require("./csv-loader");

const responseFactory = require('./response')

const port = config.development.port;


// TODO: some CORS|404 (not found) issues are coming

/* const http = require('http')
const server = http.Server(app)
const socketIO = require('socket.io')
const io = socketIO(server)

const stock = require("./models");
 
io.on('connection', (socket) => {
  console.log('user connected')
})


const watchStream = stock.watch()
    watchStream.on('data', (data) => {
      io.emit(data);
})


server.listen(port, () => {
  console.log(`started on port: ${port}`);
}); */



mongoInit().then(loadCsv());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/stocks", stocksRouter);

app.use((req, res) => {
    responseFactory.sendNotFound({res})
})

app.use(function(err, req, res, next) {
  res.status(err.status).send({ code: err.status, message: err})
});



app.listen(port, function(res, res) {
  console.log(`server connected at port: ${port}`);
});


