import React from "react";
import AccountLogin from "./AccountLogin.jsx";
import StoryRoom from "./StoryRoom";


const App = () => (
	<div>
		<AccountLogin></AccountLogin>
		<h1>Welcome to Meteor!</h1>
		<StoryRoom />
	</div>
);

export default App;
