/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import RandomCircles from "./animation";
// eslint-disable-next-line react/prop-types
function LandingPage({ setUserId, userId, socket, setUserName, onlineUser ,updateOnlineUser  }) {
	console.log("setOnlineUser:-", typeof updateOnlineUser);

	const [user, setUser] = useState("");
	const handleOnJoin = () => {
		console.log("clicked on join server");

		socket.emit("online", { userName: user, socketId: socket.id });
		
		socket.on("user-online", (data) => {
			console.log("inside online users")
			updateOnlineUser((prev) => [...prev, data]);
			console.log(`User ${userId} is online`);
		});
	};
	useEffect(() => {
		return () => {
			socket.off("user-online");
		};
	}, [socket]);
	return (
		<div className="flex h-screen w-full bg-gradient-to-r from-green-950 to-green-600">
			<RandomCircles></RandomCircles>
			<div className=" flex flex-col w-full">
				
				<div className="flex flex-col mt-48 items-center">
					<div className="flex bg-gradient-to-r  from-emerald-900/60 to-green p-4 flex-col">
						<div className="flex  justify-center font-arialBlack text-5xl shadow-black text-green-200">
							WELCOME TO
						</div>
						<div className="flex font-arialBlack text-7xl text-white">
							ChatCentral
						</div>
					</div>
					<div className="flex font-merriweather text-3xl mt-4 text-white">
						Your ultimate chat app
					</div>
				</div>
				<div className="flex mt-36 justify-center">
					<div className="flex w-1/3   flex-col ">
						<input
							className="w-full bg-transparent ring-offset-emerald-500 border-emerald-300 placeholder:text-emerald-300 text-zinc-50  p-2 rounded-md"
							onChange={(e) => {
								setUser(e.target.value);        	                                                                                                          
								setUserName(e.target.value);
								setUserId(e.target.value);// userId has been set
							}}
							placeholder="Enter your username "
							type="text"
						/>
						<Button onClick={handleOnJoin} className="text-white my-1 bg-black">
							JOIN SERVER
						</Button>
						<Button className="text-white  bg-black  hover:text-lime-300">ONLINE USERS </Button>
					</div>
				</div>
			</div> 	 	
		</div>
		);
}

export default LandingPage;
