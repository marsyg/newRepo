	const express = require("express");
	const app = express();
	require("dotenv").config();
	const mongoose = require("mongoose");
	const axios = require("axios");
	const cors = require("cors");
	const { v4: uuidv4 } = require("uuid");
	// when recivemessage trigeers also have to save the message 
	app.use(express.json());
	const corsOptions = {
		origin: ["http://localhost:5173", "https://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	};

	const {
		registerUser,
		authUser,
		protectedRoute,
	} = require("./auth/authControllers");

	const { MessageModel } = require("./models/message");
	const Conversations = require("./models/conservations");

	const User = require("./models/user");

	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((error) => {
			console.error("Error connecting to MongoDB:", error);
		});

	const server = require("http").createServer(app);
	const io = require("socket.io")(server, {
		cors: {
			origin: ["http://localhost:5173", "https://localhost:5173"],
			method: ["GET", "POST"],
			credentials: true,
		},
	});
	const connectedUsers = {};
	io.on("connection", (socket) => {
		console.log("connected to websocket");
		console.log("id", socket.id);
		socket.on("online", (data) => {
				const userId = uuidv4(); // Generate a unique userId
					const userName = data.userName;

					// Attach the generated userId and socketId to the user data
					const userData = {
						userId: userId,
						userName: userName,
						socketId: data.socketId,
					};

					// Store connected user's info
					connectedUsers[userName] = userData;
					console.log(`User ${userName} is online with ID: ${userId}`);
					socket.emit("user-online", userData);
				    
				
			});
		socket.on("join-request", (user) => {
			console.log(user.socketId)
			console.log("request sent ")
			io.to(user.socketId).emit('invitation', user)
		})
		socket.on('createRoom', (roomId) => {
			console.log(`room created with id ${roomId}`)
			socket.join(roomId)
		})
		socket.on("sendMessage", async ({ Message, RoomId, userId, friendId }) => {
			console.log(userId, Message);
			try {
				const message = new MessageModel({
					text: Message,
					sender: userId,
					recipient: friendId,
				});
		
				await message.save();
				// to check whether the roomId is already present
				let conversation = await Conversations.findOne({ roomId: RoomId });
				if (conversation) {
					conversation.messages.push(message);
					await conversation.save();
					console.log("conservation found")
				} else {
					const conversation = new Conversations({
						roomId: RoomId,
						messages: [message],
					});
					await conversation.save();
					console.log("Message saved:", message);
					console.log(`from backend ${Message} and roomI ${RoomId} `);
				}
			} catch (error) {
				console.log(error,"error saving message")
			}
			
			socket.broadcast.emit("receiveMessage", { Message, userId });
		});
		socket.on("joinRoom", (roomId) => {
			socket.join(roomId);
			console.log(`joined room ${roomId}`);
			
		});
		
		socket.on("disconnect", () => {
			console.log("Client disconnected");
		});
	});

	app.post("/sign-up", registerUser);
	app.post("/login", authUser, () => {
		console.log("reached here login");
	});
	app.get("/chat", protectedRoute);

	const PORT = process.env.PORT || 3000;
	server.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
