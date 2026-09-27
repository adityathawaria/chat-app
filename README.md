<div align="center">

# Chat App 💬

**My first real-time chat app, built from scratch while learning JavaScript.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Render](https://img.shields.io/badge/Render-000000?logo=render&logoColor=white)](https://render.com/)

[Try the live app](https://chat-app-9jwu.onrender.com) · [See the code](https://github.com/adityathawaria/chat-app)

</div>

## What is this?

A place to sign up, log in, and chat in real time. Messages are saved in MongoDB, so the latest conversations are still there after a restart. I started this as a beginner JavaScript project and kept building until it became a real deployed app. More crazyy stuff is on the way 🚀

> **Right now, this is one shared chat room, not private DMs.** Everyone who can access the chat sees the same messages. Don't post anything sensitive. Private one-to-one chats are next on the roadmap.

## What works today

- ✅ Sign up and log in with passwords hashed using bcryptjs
- ✅ Session-protected chat page and Socket.IO connections
- ✅ Live messages between connected users, powered by Socket.IO
- ✅ Messages saved in MongoDB; the latest 50 load when you connect
- ✅ Message names come from the logged-in session, not a name typed into the chat page

## Built with

| Piece | Job |
| --- | --- |
| Node.js + Express | Run the server and handle signup, login, and pages |
| Socket.IO | Send new messages to connected browsers instantly |
| MongoDB + Mongoose | Store users and chat messages |
| bcryptjs + express-session | Hash passwords and keep track of logged-in users |
| HTML, CSS, and JavaScript | Build the interface |
| Render | Host the app |

## How it works

1. You sign up with a username and password. The server stores a **hash**, not the plain password.
2. After login, a session identifies your account. The `/chat` page redirects visitors without a session, and the socket connection checks the session too.
3. When you send a message, the server takes your name from that session, saves the message in MongoDB, and broadcasts it to everyone in the shared room.
4. When someone connects, they get the 50 most recent saved messages.

## Screenshots

<!-- Add real screenshots of the login page and chat here later. Example:
![Login page](screenshots/login.png)
![Chat](screenshots/chat.png)
-->

Screenshots coming soon 📸

## Run it locally

You'll need Node.js, npm, and a MongoDB database connection string.

```bash
git clone https://github.com/adityathawaria/chat-app.git
cd chat-app
npm install
```

Create a `.env` file in the project root:

```dotenv
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_long_random_secret
```

Keep `.env` private. Never commit your database connection string or session secret.

```bash
node index.js
```

Open [http://localhost:3000](http://localhost:3000), create an account, and start chatting. If you want to test two accounts, open another browser or an incognito window.

## Roadmap

- [x] Real-time shared chat
- [x] Saved message history
- [x] Signup, login, and session-protected chat
- [ ] Private one-to-one chats with Socket.IO rooms
- [ ] UI overhaul
- [ ] Installable PWA

---

Built one JavaScript lesson at a time. Turns out "I'm just learning" can still ship. ✨
