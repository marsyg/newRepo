import { Container } from "@mui/material";
import io from "socket.io-client";
import LoginPage from "./assets/componnets/loginPage";
import { useMemo, useState, useEffect } from "react";
import ChatWindow from "./assets/componnets/chatWindow";
import LandingPage from "./assets/componnets/landingPage";
import OnlineFriends from "./assets/componnets/onlineFriends";
import SignInPage from "./siginPage";
import Invitation from "./assets/componnets/Invitation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,

} from "react-router-dom";

function App() {
  const socket = useMemo(() => {
    return io("http://localhost:3000");
  }, []);
  const [id, setId] = useState("");
  const [RoomId, setRoomId] = useState("");
  const [Message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [userName, setUserName] = useState(" ");
  const [messages, setMessages] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      setId(socket.id);
    });
    socket.on("receiveMessage", ({ Message, userId }) => {
      console.log(`Message received ${Message} from ${userId}`);
      setMessages((prevMessages) => [...prevMessages, { Message, userId }]);
    });

    socket.on("receive-data", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  const handleJoin = (e) => {
    e.preventDefault();
    const roomId = [userId, friendId].sort().join("-");
    console.log(roomId);
    console.log(RoomId);
    setRoomId(roomId);

    socket.emit("joinRoom", roomId);
    console.log(`${userId} joined room with id ${RoomId}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userId, "UserID has been set");
    console.log(RoomId, "roomID has been set");
    socket.emit("sendMessage", { Message, RoomId, userId, friendId });
    setMessages((prevMessages) => [...prevMessages, { Message, userId }]);

    console.log(`Message sent ${Message} .RoomId -${RoomId} `);
    console.log("clicked");
  };

  return (
    <Router>
      <ul>
        <li>
          <Link to="/">LandingPage</Link>
        </li>
        <li>
          <Link to="/invitation">Invitation</Link>
        </li>
        <li>
          <Link to="/online">OnlineFriends</Link>
        </li>
        <li>
          <Link to="/signup">SignInPage</Link>
        </li>
        <li>
          <Link to="/login">LoginPage</Link>
        </li>
        <li>
          <Link to="/chatWindow">ChatWindow</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              setUserName={setUserName}
              socket={socket}
              setUserId={setUserId} //userID has been set here
              userId={userId}
              onlineUser={onlineUser}
              updateOnlineUser={setOnlineUser}
            />
          }
        />
        <Route
          path="/invitation"
          element={
            <Invitation
              setFriendId={setFriendId}
              setRoomId={setRoomId}
              socket={socket}
            />
          }
        />
        <Route
          path="/online"
          element={
            <OnlineFriends
              setFriendId={setFriendId}
              userName={userName}
              socket={socket}
              setRoomId={setRoomId}
              onlineUser={onlineUser}
              updateOnlineUser={setOnlineUser}
            />
          }
        />
        <Route
          path="/chatWindow"
          element={
            <ChatWindow
              messages={messages}
              userId={userId}
              handleSubmit={handleSubmit}
              setMessage={setMessage}
            />
          }
        />
        <Route path="/signup" element={<SignInPage />}/>
        <Route
          path="/login"
          element={<LoginPage setUserId={setUserId} />}
        />
      </Routes>

      {/* <Container>
        <div>`Welcome ${id}`</div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="user-id"
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="text"
            placeholder="friend's-Id"
            onChange={(e) => {
              setFriendId(e.target.value);
            }}
          />
          <button type="submit" onClick={handleJoin}>
            Join
          </button>
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">submit</button>
          <div className="flex flex-col justify-start w-80">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={` ${
                  msg.userId === userId ? "self-start" : "self-end"
                }`}
              >
                <p> {msg.Message}</p>
              </div>
            ))}
          </div>
        </form>
      </Container> */}
    </Router>
  );
}

export default App;
