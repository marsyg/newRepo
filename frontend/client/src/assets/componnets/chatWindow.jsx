import React from 'react'

function ChatWindow() {
  return (
		<div className="flex flex-col h-screen w-3/4">
			<div className="w-full bg-gradient-to-r from-green-100 to-green-300  h-full"></div>
			<div className="flex w-full h-12  bg-gray-200 p-2 flex-row">
				<input
					className=" w-11/12 rounded-sm"
					type="text"
					placeholder="Type something..."
				/>
				<button className="ml-2 w-20 rounded-md text-slate-50 bg-gray-950">
					Send
				</button>
			</div>
		</div>
	);
}

export default ChatWindow
