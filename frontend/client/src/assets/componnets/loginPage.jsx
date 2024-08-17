"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from 'react'
import axios from "axios";
import { useState } from "react";


function LoginPage({ setUserId }) {
  const [userName, setUserName] = useState();
  const [Password, setPassword] = useState();
  const LogInHandleSubmit = async () => {
		const LogInData = {
			username: userName,
			password: Password,
		};

		const LogIn = async () => {
			try {
				const response = await axios.post(
					"https://localhost:3000/login",
					LogInData
				);
        console.log(response.data);
        if (response.status === 401) {
          d 
        }
			} catch (error) {
				console.error(error.response.data);
			}
		};

		await LogIn();
	};


	return (
		<div className="h-screen flex w-screen self-center flex-col items-center justify-center">
			<div>ChatCentral</div>
			<form className="flex w-80 flex-col gap-4">
				<div>
					<div className="mb-2  block">
						<Label htmlFor="email1" value="Your username" />
					</div>
					<TextInput
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
		</div>
	);
}

export default LoginPage;