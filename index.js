require('dotenv').config()
const express = require('express');
const User = require('./routes/user.routes');
const Task = require('./routes/task.routes');
const cors = require('cors')
const Team = require('./routes/team.routes')
const Profile = require('./routes/profile.routes')
const Plan = require('./routes/plan.routes');
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload")

const client = require('./clientDb')

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT;

app.use(fileUpload({}))
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:8080"
}));
app.use(express.json());
app.use(function(req,res,next){
    res.io = io;
    next();
});
app.use('/apiV0/', User);
app.use('/apiV0/', Profile);
app.use('/apiV0/', Team);
app.use('/apiV0/', Task);
app.use('/apiV0/', Plan);

io.on('connection', async (socket) => {
    const userId = Number(socket.handshake.query.user_id)

    console.log('a userId connected: ' + userId);
//TODO Вынести в отдельную функцию
    await client.user_to_team.findMany({
        where: {
            user_id: userId
        },
        select: {
            team_id: true
        }}).then(teamIds => {
        teamIds.forEach((value => {
            socket.join('team' + value.team_id)
        }))
    });
    console.log(socket.rooms)
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const start = async () => {
  try {
    //prisma.$connect()
    server.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
