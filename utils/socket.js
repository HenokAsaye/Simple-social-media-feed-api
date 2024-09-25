import {server} from "socket.io";
const io = (server,{
    cors:{
        origin:'*',
        method:['GET','POST']
    }
});
const onlineUsers = Map();
io.on("connection",(socket)=>{
    console.log("connected to socket",socket.id)
});

io.on('register',(userId)=>{
    onlineUsers(socket.io,userId)
});

io.on('disconnect',(socket)=>{
    console.log('userDisconnected', socket.id)
    onlineUsers.forEach((value,key)=>{
        if(value === socket.id){
            onlineUsers.delete(key);
        };
    });
});

const sendNotification =(recipentId,notification)=>{
    const socketId = onlineUsers.get(recipentId);
    if(socketId){
        io.to(socketId).emit("newnotification",notification);
    };
};

export  {io,sendNotification};