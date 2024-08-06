const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Message = require("./models/message");
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
const io = require("socket.io")(server);

io.on("connection", (socket) => {
	console.log("connected to websocket");

	socket.on("sendMessage", async (data) => {
		console.log("Received data:", data);
    const { text, senderId, recipientId } = data.data;

		
		console.log(
			`Text: ${text}, SenderId: ${senderId}, RecipientId: ${recipientId}`
		);

		if (!text || !senderId) {
			console.error("Invalid data received:", data);
			return;
		}

		try {
			const message = new Message({
				text: text,
				sender: senderId,
			});

			await message.save();
			console.log("Message saved:", message);

			io.to(recipientId).emit("receiveMessage", message);
		} catch (error) {
			console.error("Error saving message:", error);
		}
	});

	socket.on("message", (message) => {
		console.log(`Received: ${message}`);

		const response = `Data received: ${message}`;
		console.log(`Sending response: ${response}`);
		io.emit("data", response);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
