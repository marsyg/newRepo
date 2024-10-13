import { Container } from "@mui/material";
import io from "socket.io-client";
import LoginPage from "./assets/componnets/loginPage";
import { useMemo, useState, useEffect } from "react";
import ChatWindow from "./assets/componnets/chatWindow";
import FriendCard from "./assets/componnets/friendCard";
import Friendlist from "./assets/componnets/friendlist";
import LandingPage from "./assets/componnets/landingPage";
import OnlineFriends from "./assets/componnets/onlineFriends";
import SignInPage from "./siginPage";
import Invitation from "./assets/componnets/Invitation";

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

		socket.emit("sendMessage", { Message, RoomId, userId, friendId });
		setMessages((prevMessages) => [...prevMessages, { Message, userId }]);

		console.log(`Message sent ${Message} .RoomId -${RoomId} `);
		console.log("clicked");
	};

	return (
		<>
			<Invitation
				setFriendId={setFriendId}
				setUserId={setUserId}
				setRoomId={setRoomId}
				socket={socket}
			></Invitation>
			<OnlineFriends
				setFriendId={setFriendId}
				setUserId={setUserId}
				userName={userName}
				socket={socket}
				setRoomId={setRoomId}
			></OnlineFriends>
			<LandingPage
				setUserName={setUserName}
				socket={socket}
				setUserId={setUserId}
				userId={userId}
			></LandingPage>
			<div className="flex flex-row">
				<ChatWindow
					messages={messages}
					userId={userId}
					handleSubmit={handleSubmit}
					setMessage={setMessage}
				></ChatWindow>
				<Friendlist></Friendlist>
			</div>
			<SignInPage></SignInPage>
			<LoginPage setUserId={setUserId}></LoginPage>
			<Container>
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
			</Container>
		</>
	);
}

export default App;
