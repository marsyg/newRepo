/* eslint-disable react/prop-types */
import React from "react";
import { Card, Dropdown } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
// addUserName
//userName is the client's name
function OnlineFriends({
  setFriendId,
  userName,
  socket,
  setRoomId,
  onlineUser,
  updateOnlineUser,
}) {
  console.log( typeof updateOnlineUser);
  const handleAddFriend = (user) => {
    console.log("add friend clicked");
    const newUser = {
      ...user,
      senderName: userName, //request sender
      senderSocketId: socket.id,
    };
    //make them join the room
    console.log(newUser, "inside request handle");

    setFriendId(newUser.userName);
    const roomId = [newUser.userName, newUser.senderName].sort().join("-");
    console.log(roomId);
    setRoomId(roomId);
    socket.emit("joinRoom", roomId);
    socket.emit("join-request", newUser);
    updateOnlineUser((prev) =>
      prev.map((data) =>
        data.userId === user.userId ? { ...data, isReq: !data.isReq } : data
      )
    );
  };
  
  useEffect(() => {
    socket.on("user-online", (data) => {
      console.log("user-online has been emmited");
      updateOnlineUser((prev) => {
        if (!prev.some((user) => user.userId === data.userId)) {
          return [...prev, { ...data, isReq: false }];
        }
        return prev;
      });
      console.log(`User ${data.userName} is online`);
    });
    return () => {
      socket.off("user-online");
    };
  }, [socket]);
  return (
    <>
      <div className="flex w-1/5  flex-col">
        <div className=" flex justify-center text-center"> People Online</div>
        <div className="flex flex-col">
          {onlineUser?.map((user, index) => (
            <Card key={index} className="fex w-full h-24">
              <div className="flex flex-row 	items-center py-7 justify-between">
                <div className="flex flex-row">
                  <img
                    alt=""
                    height="40"
                    src="/images/people/profile-picture-3.jpg"
                    width="40"
                    className="mb-3 mr-3	 rounded-full shadow-lg"
                  />
                  <div className="mx-4 mt-2 text-xl font-medium text-gray-900 dark:text-white">
                    {user.userName}
                  </div>
                </div>
                <div className="mt-4 flex mb-3">
                  <a
                    onClick={() => handleAddFriend(user)}
                    href="#"
                    className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2	 text-center text-xl font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    {user.isReq ? "Requested" : "AddFriend"}
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default OnlineFriends;
