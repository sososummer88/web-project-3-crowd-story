import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Vote } from "../api/vote_info";
import AccountLogin from "./AccountLogin.jsx";
import NavigationBar from "./NavigationBar";

class ArchivesRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ranking: ""
		};
	}

	renderRanking() {
		return this.props.ranking.map(m =>
			<div className="card" key={m._id}>{m.storyId} : {m.upvote}</div>);
	}

	render() {
		return (
			<div>
				<NavigationBar />
				<h2>Welcome to Crowd Story!</h2>
				<h3>Please Sign in First!</h3>
				<h4><AccountLogin /></h4>
				<h2>Ranking</h2>
				<div className="ranking">{this.renderRanking()}</div>
			</div>
		);
	}


}

ArchivesRoom.propTypes = {
	ranking: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
	const handle = Meteor.subscribe("Ranking");
	return {
		ranking: Vote.find({},{
			sort:{
				upvote:-1
			}
		}).fetch(),
		user: Meteor.user(),
		ready: handle.ready()

	};
})(ArchivesRoom);