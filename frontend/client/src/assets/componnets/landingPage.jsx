import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
function LandingPage({ setUserId, userId, socket, setUserName,  }) {
	const [onlineUser, setOnlineUsers] = useState([]);
	const [user, setUser] = useState("");
	const handleOnJoin = () => {
		console.log("clicked");

		socket.emit("online", { userName: user, socketId: socket.id });
		socket.on("user-online", (data) => {
			setOnlineUsers((prev) => [...prev, data]);
			console.log(`User ${userId} is online`);
		});
	};
	useEffect(() => {
		return () => {
			socket.off("user-online");
		};
	}, [socket]);
	return (
		<div className="flex h-screen w-screen bg-gradient-to-r from-black to-green-800">
			<div className="flex flex-col">
				<div className="bg-black w-screen h-20"></div>
				<div className="flex flex-col mt-48 items-start">
					<div className="flex bg-gradient-to-r  from-emerald-900/60 to-green p-4 flex-col">
						<div className="flex font-arialBlack text-5xl shadow-black text-green-200">
							WELCOME TO
						</div>
						<div className="flex font-arialBlack text-9xl text-white">
							ChatCentral
						</div>
					</div>
					<div className="flex font-merriweather text-xl mt-4 text-white">
						Your ultimate chat application
					</div>
				</div>
				<div className="flex mt-36 justify-center">
					<div className="flex flex-col ">
						<TextInput
							className="w-full"
							onChange={(e) => {
								setUser(e.target.value);
								setUserName(e.target.value);
								setUserId(e.target.value);// userId has been set
							}}
							placeholder="enter your username "
							type="text"
						/>
						<Button onClick={handleOnJoin} className="text-white my-1 bg-black">
							JOIN THE SERVER
						</Button>
						<Button className="text-white">Show online users</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
