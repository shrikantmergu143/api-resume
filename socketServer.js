// const registerSocketServer = (server) =>{
//   const io = require("socket.io")(server, {
//     cors:{
//       origin:"*",
//       methods:["GET", "POST"],
//     },
//   });
//   io.on("connection", (socket)=>{
//     console.log("user connected");
//     console.log("socket.id", socket.id);
//   })
// }
// const authSocket = require("./middleware/authSocket");
// const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");

const WebSocket = require('ws');

const registerSocketServer = (server) =>{
  const socketServer = new WebSocket.Server({server});

  socketServer.on('connection', (socket, req) => {
    // Verify client connection token id is valid or not
    const response = authSocket.validateToken(socket, req);

    if(response !== "NOT_AUTHORIZED"){
      newConnectionHandler(socket, socketServer);
      // authentication successfull
      socket.send(JSON.stringify({userDetails:req.user, messages:"web socket connected successfully"}));
    }else{
      // invalid token comming from user
      socket.close();
    }
  }); 
}


module.exports = {
  registerSocketServer
}