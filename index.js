const bcrypt = require("bcryptjs");
const User = require("./user");


const session = require("express-session");
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

// CHANGE THIS LINE: put your real password where YOUR_PASSWORD is
mongoose.connect(process.env.MONGO_URI);
app.use(express.json());
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});
app.use(sessionMiddleware);
// This says: a Message has a name and a text
const Message = mongoose.model("Message", { name: String, text: String });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/chat", (req, res) => {
  if (!req.session.userId) return res.redirect("/");
  res.sendFile(__dirname + "/index.html");
});
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ username, passwordHash });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: "username taken or bad input" });
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ ok: false, error: "no such user" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ ok: false, error: "wrong password" });

  req.session.userId = user._id;
  req.session.username = user.username;
  res.json({ ok: true });
});
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});
io.on("connection", async (socket) => {
  const sess = socket.request.session;
if (!sess.userId) {
  socket.disconnect(true);
  return;
}
  // When someone opens the page: send them the last 50 saved messages
  const history = await Message.find().sort({ _id: -1 }).limit(50);
  socket.emit("history", history.reverse());

 socket.on("chat message", (data) => {
  const msg = new Message({ name: sess.username, text: data.text });
  msg.save();
  io.emit("chat message", { name: sess.username, text: data.text });
});
});

http.listen(process.env.PORT || 3000, () => {
  console.log("Server running on http://localhost:3000");
});