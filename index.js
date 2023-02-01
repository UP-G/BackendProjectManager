require('dotenv').config()
const express = require('express');
const Task = require('./routes/task.routes');
const Auth = require('./routes/auth.routes');
const corsMiddleware = require('./middleware/cross.middleware');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const PORT = process.env.PORT;

app.use(corsMiddleware);
app.use(express.json());
app.use('/apiV0/', Task);
app.use('/apiV0/auth', Auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
