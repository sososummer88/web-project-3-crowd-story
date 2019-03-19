import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { StoryMeta } from "../api/story-meta";
import { Redirect } from "react-router-dom";

import StoryBoard from "./StoryBoard";
import ChatBoard from "./ChatBoard";


class StoryRoom extends Component {
	render() {
		if (this.props.ready) {
			if (this.props.storyMeta !== null && this.props.storyMeta.length > 0) {
				return (
					<Container>
						<Row></Row>
						<Row>
							<StoryBoard storyId={this.props.match.params.storyId} storyMeta={this.props.storyMeta[0]}/>
							<ChatBoard storyId={this.props.match.params.storyId} enterTime={(new Date()).getTime()}/>
						</Row>
						<Row></Row>
					</Container>
				);
			} else {
				return (
					<Redirect to={"/"} />
				);
			}
		} else {
			return (
				<Row>
					<Col lg={"12"}>
						Loading...
					</Col>
				</Row>
			);
		}
	}
}

StoryRoom.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			storyId: PropTypes.string.isRequired,
		}),
	}),
	storyMeta: PropTypes.array,
	ready: PropTypes.bool,
};

export default withTracker((props) => {
	const handler = Meteor.subscribe("storyMeta", props.match.params.storyId);
	const ready = handler.ready();
	return {
		storyMeta: StoryMeta.find({}).fetch(),
		ready: ready,
	};
})(StoryRoom);
