import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Stories } from "../api/stories";
import PropTypes from "prop-types";
import { InputGroup, Col, Form, Button } from "react-bootstrap";

import "./story-room.css";

class StoryBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
		};
	}

	renderStoryContent() {
		return this.props.story.map((value) => {
			return (
				<span key={value._id}>{value.content}</span>
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
			Meteor.call("storyBoard.insert", this.state.content, this.props.storyId, (error, result) => {
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
					{this.renderStoryContent()}
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
						<Button variant="success">Submit</Button>
					</InputGroup.Append>
				</InputGroup>
			</Col>
		);
	}
}

StoryBoard.propTypes = {
	storyId: PropTypes.string,
	story: PropTypes.array,
};

export default withTracker((props) => {
	Meteor.subscribe("stories", props);
	return {
		story: Stories.find({}).fetch(),
	};
})(StoryBoard);