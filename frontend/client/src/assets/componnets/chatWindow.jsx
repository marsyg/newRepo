import React from 'react'

function ChatWindow() {
  return (
		<div className="flex flex-col h-screen  w-3/4">
			<div className='flex bg-black w-full top-0 h-28 p-2	items-center  flex-row'>
				<div className='text-white w-12 h-12 mr-7 rounded-full bg-slate-200'>Photo</div>
				<div className='text-white text-2xl '>Name</div>
			</div>
			<div className="w-full bg-gradient-to-r from-green-100 to-green-300  h-full"></div>
			<div className="flex w-full h-20  bg-gray-200 p-2 flex-row">
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
