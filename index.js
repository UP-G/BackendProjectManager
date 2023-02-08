require('dotenv').config()
const express = require('express');
const User = require('./routes/user.routes');
const Task = require('./routes/task.routes');
//const Auth = require('./routes/auth.routes');
const Team = require('./routes/team.routes')
const corsMiddleware = require('./middleware/cross.middleware');
const cookieParser = require('cookie-parser')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);
app.use('/apiV0/', User);
//app.use('/apiV0/', Auth);
app.use('/apiV0/', Team);
app.use('/apiV0/', Task);
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
