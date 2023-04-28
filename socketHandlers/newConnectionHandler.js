const serverStore = require("./../serverStore");

const newConnectionHandler = async (socket, io) =>{
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        sockedId:socket.id,
        user_id:userDetails?.user_id,
    })
}

module.exports = newConnectionHandler;