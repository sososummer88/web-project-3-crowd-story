import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Vote } from "../api/vote_info";

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
		ranking: Vote.find({}).fetch(),
		user: Meteor.user(),
		ready: handle.ready()

	};
})(ArchivesRoom);