import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import NavigationBar from "./NavigationBar";
import { Button } from "react-bootstrap";
import { StoryMeta } from "../api/story-meta";
import FooterPage from "./Footer.jsx";
import {Redirect} from "react-router-dom";

class ArchivesRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ranking: ""
		};
	}
	handleOnClick1(_id) {
		Meteor.call("vote.upLikes", _id, (error) => {
			if (error !== undefined && error !== null) {
				// TODO: show some tips
			}
		});
	}

	handleOnClick2(_id) {
		Meteor.call("vote.downLikes", _id, (error) => {
			if (error !== undefined && error !== null) {
				// TODO: show some tips
			}
		});
	}

	// In order to be able to get archived story content (in the ranking page)
	collectStory(id) {
		Meteor.call("story.getMeta", id, (error, result) => {
			if (result !== null && result.length > 0) {
				const meta = result[0];
				Meteor.call("storyContent.get", id, (error, result) => {
					if (result !== null && result.length > 0) {
						let story = meta.start_sentence;
						for (let i = 0; i < result.length; i++) {
							story += result[i].content;
						}
						console.log(story);
					}
				});
			}
		});
	}

	// In the ranking page, add the button for users to upvote and downvote archived stories
	renderRanking() {
		return this.props.ranking.map(m => {
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
							<Button variant = {"primary"} onClick={()=> this.collectStory(m._id)}>Show Content</Button>
						</div>
					</div>
					<hr />
				</div>
			);
		});
	}

	render() {
		if (Meteor.user() === undefined || Meteor.user() === null) {
			return (
				<Redirect to={"/"}/>
			);
		}
		return (
			<div>
				<NavigationBar />
				<h2>Ranking</h2>
				<div className="ranking">{this.renderRanking()}</div>
				<FooterPage />
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