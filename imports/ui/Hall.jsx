import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import AccountLogin from "./AccountLogin";
import { Story } from "../api/story";

class Hall extends Component {
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
				console.log(result);
			}
		});
	}

	render() {
		return (
			<div>
				<NavigationBar />
				<h2>Welcome to Crowd Story!</h2>
				<h3>Please Sign in First!</h3>
				<AccountLogin />
				<Row>
					<Col lg={"10"}> </Col>
					<Col lg={"2"}>
						<Button variant={"primary"} onClick={() => this.handleOnClick()}>+New Story</Button>
					</Col>
				</Row>
				<hr />
				{this.renderUncompletedStoryList()}
			</div>
		);
	}
}

Hall.propTypes = {
	uncompletedStories: PropTypes.array,
};

export default withTracker(() => {
	Meteor.subscribe("story");

	return {
		uncompletedStories: Story.find({}).fetch(),
	};
})(Hall);

