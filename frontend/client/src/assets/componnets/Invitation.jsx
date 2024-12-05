import React from "react";
import { useState, useEffect } from "react";
import { Card, Dropdown } from "flowbite-react";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
function Invitation({ socket, setRoomId, setFriendId }) {
  const [request, setRequests] = useState([]);

  const handleOnCheck = (user) => {
	console.log("inside handleCheck");
    setFriendId(user.senderName);
    console.log("friendID  has been set inside handleOncheck", user.senderName);
    const roomId = [user.userName, user.senderName].sort().join("-");
    setRoomId(roomId);
   
    socket.emit("joinRoom", roomId);
	

  };
  const handleOnClose = () => {};
  useEffect(() => {
    const handleInvitation = (user) => {
      console.log("Invitation received:", user);
      setRequests((prev) => [...prev, user]);
    };

    socket.on("invitation", handleInvitation);

    // Clean up the event listener
    return () => {
      socket.off("invitation", handleInvitation);
    };
  }, [socket]);
  return (
    <div className="flex w-1/5  flex-col">
      <div className=" flex justify-center text-center"> Friend Request</div>
      <div className="flex flex-col">
        {request.map((user, index) => (
          <Card key={index} className="fex w-full h-24">
            <div className="flex flex-row 	items-center py-7 justify-between">
              <div className="flex flex-row">
                <img
                  alt=""
                  height="40"
                  src="/images/people/profile-picture-3.jpg"
                  width="40"
                  className="mb-3 ml-6 rounded-full shadow-lg"
                />
                <h className="mx-4 mt-2 text-xl font-medium text-gray-900 dark:text-white">
                  {user.senderName}
                </h>
              </div>
              <AiOutlineCheck onClick={() => handleOnCheck(user)} />

              <AiOutlineClose />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Invitation;
