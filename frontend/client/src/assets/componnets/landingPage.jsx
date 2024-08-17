import React from "react";

function LandingPage() {
	return (
		<div className="flex h-screen w-screen bg-gradient-to-r from-black to-green-800">
			<div className="flex flex-col">
				<div className="bg-black w-screen h-20"></div>
				<div className="flex flex-col mt-48 items-start">
					<div className="flex bg-gradient-to-r  from-emerald-900/60 to-green p-4 flex-col">
						<div className="flex font-arialBlack text-5xl shadow-black text-green-200">
							WELCOME TO
						</div>
						<div className="flex font-arialBlack text-9xl text-white">
							ChatCentral
						</div>
					</div>
					<div className="flex font-merriweather text-xl mt-4 text-white">
						Your ultimate chat application
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
