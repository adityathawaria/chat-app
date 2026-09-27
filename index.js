require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

// CHANGE THIS LINE: put your real password where YOUR_PASSWORD is
mongoose.connect(process.env.MONGO_URI);

// This says: a Message has a name and a text
const Message = mongoose.model("Message", { name: String, text: String });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", async (socket) => {
  // When someone opens the page: send them the last 50 saved messages
  const history = await Message.find().sort({ _id: -1 }).limit(50);
  socket.emit("history", history.reverse());

  socket.on("chat message", (data) => {
    // Save every new message to the database forever
    const msg = new Message(data);
    msg.save();
    io.emit("chat message", data);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("Server running on http://localhost:3000");
});