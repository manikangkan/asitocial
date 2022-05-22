const io = require("socket.io")(5000, {
  cors: {
    // connection with client
    origin: "http://localhost:3000",
  },
});

let users = [];

// add user when connect
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// remove user when disconnect
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // connect
  console.log("user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  console.log(users);

  // send & get messages
  socket.on("sendMesssage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", { senderId, text });
  });

  // disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("an user disconnected");
    io.emit("getUsers", users);
  });
});
