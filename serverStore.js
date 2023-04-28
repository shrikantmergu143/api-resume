const connectUsers = new Map();

const addNewConnectedUser = ({ socketId, user_id}) =>{
     connectUsers.set(socketId, {user_id});
}

module.exports = {
    addNewConnectedUser,
}