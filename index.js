require('dotenv').config()
const express = require('express');
const Task = require('./routes/task.routes');
const corsMiddleware = require('./middleware/cross.middleware');
const app = express();
const PORT = process.env.PORT;

app.use(corsMiddleware);
app.use(express.json());
app.use('/apiV0/', Task);

const start = async () => {
  try {
    //prisma.$connect()
    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();