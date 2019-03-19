import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import AccountLogin from "./AccountLogin";
import { StoryMeta } from "../api/story-meta";

class Hall extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newStoryId: "",
		};
	}

	renderUncompletedStoryList() {
		return this.props.uncompletedStories.map((value) => {
			return (
				<Row key={value._id}>
					<Col lg={"12"}>
						<Link to={"/story-room/" + value._id}>{value._id}</Link>
					</Col>
				</Row>
			);
		});
	}

	handleOnClick() {
		Meteor.call("story.createNewStory", (error, result) => {
			if (error !== undefined && error !== null) {
				// show some tips
			} else {
				this.setState({
					newStoryId: result,
				});
			}
		});
	}

	render() {
		if (this.state.newStoryId !== undefined && this.state.newStoryId !== null && this.state.newStoryId !== "") {
			return (
				<Redirect to={"/story-room/" + this.state.newStoryId} />
			);
		} else {
			return (
				<div>
					<NavigationBar/>
					<h2>Welcome to Crowd Story!</h2>
					<h3>Please Sign in First!</h3>
					<AccountLogin/>
					<Row>
						<Col lg={"10"}> </Col>
						<Col lg={"2"}>
							<Button variant={"primary"} onClick={() => this.handleOnClick()}>+New Story</Button>
						</Col>
					</Row>
					<hr/>
					{this.renderUncompletedStoryList()}
				</div>
			);
		}
	}
}

Hall.propTypes = {
	uncompletedStories: PropTypes.array,
};

export default withTracker(() => {
	Meteor.subscribe("storyMetas");

	return {
		uncompletedStories: StoryMeta.find({}).fetch(),
	};
})(Hall);

