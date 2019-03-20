import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
//import { Vote } from "../api/vote_info";
import AccountLogin from "./AccountLogin.jsx";
import NavigationBar from "./NavigationBar";
import { Button } from "react-bootstrap";
import { StoryMeta } from "../api/story-meta";
import FooterPage from "./Footer.jsx";

//import { Button, Icon, Label } from "semantic-ui-react";

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
				<div className ="ui middle aligned divided list" key = {m._id}>
					<div className = "item">
						<div className="right floated content">
							<div className="ui button">
								<Button variant={"primary"} onClick={() => this.handleOnClick1(m._id)}> {m.upvote} 👍 </Button>
								<Button variant={"primary"} onClick={() => this.handleOnClick2(m._id)}> {m.downvote} 👎 </Button>
							</div>
						</div>
						<img className="ui avatar image" src="images/storyLogo2.jpg" alt="Story Image" />
						<div className = "content">
							<div className="header" key={m._id}>{m.title}</div>
						</div>
					</div>
					<hr />
				</div>

				// <Row key={m._id}>
				// 	<div className="card" key={m._id}>{m.storyId}</div>
				// 	<Button variant={"primary"} onClick={() => this.handleOnClick1(m._id)}> {m.upvote} 👍 </Button>
				// 	<Button variant={"primary"} onClick={() => this.handleOnClick2(m._id)}> {m.downvote} 👎 </Button>
				// </Row>
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
				<FooterPage />
				{/*<Button as='div' labelPosition='right'>*/}
					{/*<Button color='red'>*/}
						{/*<Icon name='heart' />*/}
						{/*Like*/}
					{/*</Button>*/}
					{/*<Label as='a' basic color='red' pointing='left'>*/}
						{/*2,048*/}
					{/*</Label>*/}
				{/*</Button>*/}
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
		ranking: StoryMeta.find({},{
			sort:{
				upvote:-1
			}
		}).fetch(),
		user: Meteor.user(),
		ready: handle.ready()

	};
})(ArchivesRoom);