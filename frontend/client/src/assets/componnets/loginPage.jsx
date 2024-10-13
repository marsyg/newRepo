import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import axios from "axios";
import { useState } from "react";

function LoginPage({ setUserId }) {
	const [userName, setUserName] = useState();
	const [Password, setPassword] = useState();
	const [ErrorMessage, setErrorMessage] = useState(" ");
	const LogInHandleSubmit = async (e) => {
		e.preventDefault();
		const LogInData = {
			username: userName,
			password: Password,
		};
		console.log(LogInData);
		const LogIn = async () => {
			try {
				const response = await axios.post(
					"https://localhost:3000/login",
					LogInData,
					{
						withCredentials: true,
					}
				);
				console.log(response.data);
			} catch (error) {
				console.error(error.response.status);
				if (error.response.status === 401) {
					setErrorMessage("Incorrect username or password. Please try again.");
					setPassword(" ");
					setUserName(" ");
				}
			}
		};

		await LogIn();
	};

	return (
		<div className="h-screen flex w-screen self-center flex-col items-center justify-center">
			<div>ChatCentral</div>
			<form onSubmit={LogInHandleSubmit} className="flex w-80 flex-col gap-4">
				<div>
					<div className="mb-2  block">
						<Label htmlFor="email1" value="Your username" />
					</div>
					<TextInput
						onClick={() => {
							setErrorMessage(" ");
						}}
						id="username1"
						type="text"
						placeholder="username12#"
						required
						onChange={(e) => {
							setUserName(e.target.value);
						}}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Your password" />
					</div>
					<TextInput
						onClick={() => {
							setErrorMessage(" ");
						}}
						id="password1"
						type="password"
						required
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="remember" />
					<Label htmlFor="remember">Remember me</Label>
				</div>
				<Button type="submit">Submit</Button>
			</form>
			<div className={`${ErrorMessage === " " && "hidden"}`}>
				` ${ErrorMessage} `
			</div>
		</div>
	);
}

export default LoginPage;
