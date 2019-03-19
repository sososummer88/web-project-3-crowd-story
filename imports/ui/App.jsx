import React from "react";
import AccountLogin from "./AccountLogin.jsx";
import NavigationBar from "./NavigationBar";
import "./style.scss";
import ArchivesRoom from "./ArchivesRoom.jsx";

const App = () => (
	<div>
		<NavigationBar />
		<h2>Welcome to Crowd Story!</h2>
		<h3>Please Sign in First!</h3>
		<h4><AccountLogin /></h4>
		<ArchivesRoom />
	</div>

);

export default App;
