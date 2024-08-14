import React from "react";
import FriendCard from "./friendCard";

function Friendlist() {
	return (
		<div className="flex flex-col h-screen w-2/6 p-3">
			<div className="text-4xl font-mono w-full top-0 "> Chats</div>
			<div className="w-full py-2 top-14    ">
				<input
					className="w-full  h-10 rounded-md bg-gray-100"
					type="text"
					placeholder="Search Chat"
				/>
			</div>
			<FriendCard></FriendCard>
		</div>
	);
}

export default Friendlist;
