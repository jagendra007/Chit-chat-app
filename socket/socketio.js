const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server)
    let active_users = [];

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.emit("user_connected", "Successully ");

        socket.on("user_detail", (data) => {
            // check if user is already in the active user list
            const user = active_users.find(user => data.id === user.id);
            if (!user) {
                let user = { "id": data.id, "socketId": socket.id, "name": data.name };
                // console.log(socket);
                active_users.push(user);
                let response = { "status": "success", "data": user };
                socket.emit('USER_JOINED', response);

            } else {
                let response = { "status": "failed", "message": "User already joined" };
                socket.emit('USER_JOINED', response);
            }



        })

        socket.on("chat_message", (message)=>{
            const user = active_users.find(user => socket.id === user.socketId);
            response_msg = {
                "userName": user.name,
                "msg": message 
            }
            io.emit("chat_message", response_msg);
        })

      

        socket.on('disconnect', () => {
            console.log('user disconnected',socket.id);
            // remove user from active user list if socket is disconnected
            const user = active_users.find(user => user.socketId === socket.id);
            if(user) {
              active_users.splice(active_users.indexOf(user), 1);
            }
          }
          );
    });

}