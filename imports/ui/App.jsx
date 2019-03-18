import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Hall from "./Hall";
import Admin from "./Admin";
import StoryRoom from "./StoryRoom";

const App = () => (
	<div>
		<Router>
			<div>
				<Route exact path="/" component={Hall} />
				<Route exact path="/admin" component={Admin} />
				<Route path="/story-room/:storyId" component={StoryRoom} />
			</div>
		</Router>
	</div>
);

export default App;
