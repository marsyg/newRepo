import { Container } from "@mui/material";
import io from "socket.io-client";
import { useMemo, useState, useEffect } from "react";

function App() {
	const socket = useMemo(() => {
		return io("http://localhost:3000");
	}, []);
	const [id, setId] = useState("");
	const [RoomId, setRoomId] = useState("");
	const [Message, setMessage] = useState("");
	const [userId, setUserId] = useState("");
	const [friendId, setFriendId] = useState("");

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on("connect", () => {
			console.log(socket.id);
			setId(socket.id);
		});
  
		
		socket.on("receiveMessage", ({ Message, userId }) => {
			console.log(Message);
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
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		
		
		if (!RoomId) {
			console.log("room id is not set")
		} else {
		socket.emit("sendMessage", { Message, RoomId, userId, friendId });
		setMessages((prevMessages) => [...prevMessages, { Message, userId }]);

		console.log(`Message sent ${Message} .RoomId -${RoomId} `);
		console.log("clicked"); } 
	};

	return (
		<>
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
					<div className= "flex">
						{messages.map((msg, index) => (
							<div key={index} className={`flex ${msg.userId === userId ? 'flex-start' : 'flex-end'}`}>
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
