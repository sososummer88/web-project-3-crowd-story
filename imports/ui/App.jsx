import React from "react";
import AccountLogin from "./AccountLogin.jsx";
import "./style.scss";

const App = () => (
	<div>
		<header>
			<h1>Let's Make Great Stories!</h1>
			<nav>
				<label htmlFor="toggle" className="toggle" data-open="Menu" data-close="Close" onClick></label>
				<ul className="menu">

					<li><a href="#">Home</a></li>
					<li><a href="#">Ranking</a></li>

				</ul>
			</nav>
		</header>

		<h2>Welcome to Crowd Story!</h2>
		<h3>Please Sign in First!</h3>
		<AccountLogin/>


	</div>

);

export default App;
