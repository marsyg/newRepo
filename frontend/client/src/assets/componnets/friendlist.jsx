import React from "react";
import FriendCard from "./friendCard";

function Friendlist() {
	return (
		<div className="flex flex-col">
			<div className="text-lg font-mono w-full "> Chat</div>
			<div className="">
				<input type="text" placeholder="Search Chat" />
			</div>
			<FriendCard></FriendCard>
		</div>
	);
}

export default Friendlist;
