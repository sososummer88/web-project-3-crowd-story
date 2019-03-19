import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Vote } from "../api/vote_info";
import AccountLogin from "./AccountLogin.jsx";
import NavigationBar from "./NavigationBar";
import { Row } from "react-bootstrap";
import { Button, Icon, Label } from "semantic-ui-react";

class ArchivesRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ranking: ""
		};
	}
	handleOnClick1(_id) {
		Meteor.call("vote.upLikes", _id, (error, result) => {
			if (error !== undefined && error !== null) {
				// show some tips
			} else {
				console.log(result);
			}
		});
	}

	handleOnClick2(_id) {
		Meteor.call("vote.downLikes", _id, (error, result) => {
			if (error !== undefined && error !== null) {
				// show some tips
			} else {
				console.log(result);
			}
		});
	}

	renderRanking() {
		return this.props.ranking.map(m => {
			console.log(m);
			return (
				<Row key={m._id}>
					<div className="card" key={m._id}>{m.storyId}</div>
					{/*<Button variant={"primary"} onClick={() => this.handleOnClick1(m._id)}> {m.upvote} 👍 </Button>*/}
					{/*<Button variant={"primary"} onClick={() => this.handleOnClick2(m._id)}> {m.downvote} 👎 </Button>*/}
				</Row>
			);
		});


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
				<Button as='div' labelPosition='right'>
					<Button color='red'>
						<Icon name='heart' />
						Like
					</Button>
					<Label as='a' basic color='red' pointing='left'>
						2,048
					</Label>
				</Button>
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