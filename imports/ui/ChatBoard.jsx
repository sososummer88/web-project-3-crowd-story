import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { ChatInfo } from "../api/chat-info";
import PropTypes from "prop-types";
import { Col, Form, InputGroup, Button} from "react-bootstrap";

class ChatBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
		};
	}

	handleOnChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleKeyPress(event) {
		if (event.key === "Enter") {
			this.submit();
		}
	}

	submit() {
		Meteor.call("chatInfo.insert", this.props.storyId, this.state.message, (error) => {
			if (error !== undefined && error !== null) {
				// show some tips
			} else {
				this.setState({
					message: "",
				});
			}
		});
	}

	renderChatInfo() {
		return this.props.chatInfo.map((value) => {
			return (
				<div key={value._id}>
					{value.username}: {value.message}
				</div>
			);
		});
	}

	render() {
		return (
			<Col lg={"3"}>
				<h2 className={"board-title"}>Chat Room</h2>
				<div className={"chat-board"}>
					{this.renderChatInfo()}
				</div>
				<InputGroup className="my-3">
					<Form.Control
						type={"text"}
						name={"message"}
						value={this.state.message}
						onChange={(e) => {this.handleOnChange(e);}}
						onKeyPress={(e) => {this.handleKeyPress(e);}}
					/>
					<InputGroup.Append>
						<Button variant="success" onClick={() => this.submit()}>Submit</Button>
					</InputGroup.Append>
				</InputGroup>
			</Col>
		);
	}
}

ChatBoard.propTypes = {
	storyId: PropTypes.string,
	chatInfo: PropTypes.array,
	enterTime: PropTypes.number,
};

export default withTracker((props) => {
	Meteor.subscribe("chatInfo", props.storyId, props.enterTime);
	return {
		chatInfo: ChatInfo.find({}).fetch(),
	};
})(ChatBoard);