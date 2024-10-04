import { Server } from "socket.io";
const io = new Server( {
    cors:{
        origin:'*',
        method:['GET','POST']
    }

});
const onlineUsers = new Map();


io.on("connection", (socket) => {
  console.log("connected to socket", socket.id);
  socket.on('register', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);  
      }
    });
  });
});

// Function to send notification
const sendNotification = (recipientId, notification) => {
  const socketId = onlineUsers.get(recipientId);  // Get the socket ID for the recipient
  if (socketId) {
    io.to(socketId).emit("newnotification", notification);  // Send notification to the recipient
  }
};

export { io, sendNotification };
