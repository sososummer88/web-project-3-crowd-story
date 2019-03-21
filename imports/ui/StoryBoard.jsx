import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { StoryContent } from "../api/story-content";
import PropTypes from "prop-types";
import { InputGroup, Col, Form, Button, Alert } from "react-bootstrap";

import "./page.css";

class StoryBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
		};
	}

	renderStoryContent() {
		return this.props.storyContent.map((value) => {
			return (
				<span className={"story-content m-1"} key={value._id}>{value.content}</span>
			);
		});
	}

	handleOnChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleKeyPress(event) {
		if (event.key === "Enter") {
			this.submitMessage();
		}
	}

	submitMessage() {
		if (!this.props.storyMeta.finished) {
			Meteor.call("storyContent.insert", this.state.content, this.props.storyId, this.props.storyMeta.end_sentence, (error) => {
				if (error !== undefined && error !== null) {
					// show some tips
				} else {
					this.setState({
						content: "",
					});
				}
			});
		}
	}

	render() {
		return (
			<Col lg={"9"}>
				<div className={"story-board"}>
					<Alert variant={"info"}>
						{this.props.storyMeta.start_sentence}
					</Alert>
					<p>{this.renderStoryContent()}</p>
					<Alert variant={"light"}>
						{this.props.storyMeta.end_sentence}
					</Alert>
				</div>
				<InputGroup className="my-3">
					<Form.Label>What happens next: </Form.Label>
					<Form.Control
						type={"text"}
						name={"content"}
						value={this.state.content}
						onChange={(e) => {this.handleOnChange(e);}}
						onKeyPress={(e) => {this.handleKeyPress(e);}}
					/>
					<InputGroup.Append>
						<Button variant="success" onClick={() => this.submitMessage()}>Submit</Button>
					</InputGroup.Append>
				</InputGroup>
			</Col>
		);
	}
}

StoryBoard.propTypes = {
	storyId: PropTypes.string,
	storyContent: PropTypes.array,
	storyMeta: PropTypes.object,
};

export default withTracker((props) => {
	Meteor.subscribe("storyContent", props.storyId);
	return {
		storyContent: StoryContent.find({}).fetch(),
	};
})(StoryBoard);