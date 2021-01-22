'use strict';

require('dotenv').config();

// Confuguring the environment variables
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Database Connection
require('./db/config')
require('./db/associations');

// Importing the express app
const app = require('./app');

// Starting the server
const server = app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});

// Socket Configuration
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});
io.on('connection', socket => {
  console.log('A user connected!');

})

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down the server...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
