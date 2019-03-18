import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import StoryBoard from "./StoryBoard";
import ChatBoard from "./ChatBoard";

export default class StoryRoom extends Component {
	render() {
		return (
			<Container>
				<Row></Row>
				<Row>
					<StoryBoard storyId={this.props.match.params.storyId}/>
					<ChatBoard storyId={this.props.match.params.storyId} enterTime={(new Date()).getTime()}/>
				</Row>
				<Row></Row>
			</Container>
		);
	}
}

StoryRoom.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			storyId: PropTypes.string.isRequired,
		}),
	}),
};
