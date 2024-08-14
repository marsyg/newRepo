import React from "react";

function FriendCard() {
	return (
		<div className="flex flex-row bg-gray-300  p-2 h-24 w-full">
			<div className="bg-slate-100 h-16 w-16 m-2 rounded-full flex justify-center self-center">
				Photo
			</div>
			<div className="flex  w-full justify-between flex-col">
				<div className="flex justify-between flex-row">
					<div>Name</div>
					<div>TimeStamp</div>
				</div>
				<div className="flex  justify-between flex-row">
					<div>Content</div>
					<div>Notification</div>
				</div>
			</div>
		</div>
	);
}

export default FriendCard;
