const express = require('express');
const app = express();

const http = require('http');
const socketio = require('socket.io');  
const path = require("path")

const server = http.createServer(app);
const io = socketio(server);  // Initialize socket.io with the server

 
io.on("connection", function(socket){

    socket.on("send-location", function(data){
        io.emit("receive-location",{id: socket.id, ...data});
    })

    socket.on("disconnect", function(){
        io.emit("user-disconnected",socket.id);
    })
    console.log("connected");
    
})
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
  res.render('index');
});

// Make sure to start the server using `server.listen` not `app.listen` to use socket.io
server.listen(3000, () => {
//   console.log('Server is running on port 3000');
});
