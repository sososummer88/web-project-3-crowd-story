import React, { Component } from "react";
import "./style.scss";


export default class NavigationBar extends Component {
	render() {
		return (
			<header>
				<h1>Let's Make Great Stories!</h1>
				<nav>
					<label htmlFor="toggle" className="toggle" data-open="Menu" data-close="Close" onClick></label>
					<ul className="menu">
						<li><a href="/">Home</a></li>
						<li><a href="/archives-room">Ranking</a></li>
					</ul>
				</nav>
			</header>
		);
	}
}