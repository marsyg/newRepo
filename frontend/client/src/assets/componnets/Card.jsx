import React from 'react'
import { Card, Dropdown } from "flowbite-react";
function CardNEW({ data , socket}) {
  const handleAddFriend = () => {
    socket.emit('join-request',data)
  }
  return (
		<Card className="w-1/5 h-24">
			<div className="flex flex-row items-center py-7">
				<img
					alt="Bonnie image"
					height="60"
					src="/images/people/profile-picture-3.jpg"
					width="60"
					className="mb-3 rounded-full shadow-lg"
				/>
				<h className="mx-2 text-xl font-medium text-gray-900 dark:text-white">
					`${data.userId}`
				</h>

				<div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            onClick={handleAddFriend}
						href="#"
						className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-xl font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
					>
						Add friend
					</a>
				</div>
			</div>
		</Card>
	);
}

export default CardNEW;