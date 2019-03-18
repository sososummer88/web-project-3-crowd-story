import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Row, Col, Button, Form } from "react-bootstrap";

import { Corpus } from "../api/corpus";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newSentence: "",
		};
	}

	handleOnDeleteClick(id) {
		Meteor.call("corpus.delete", id);
	}

	handleOnAddClick() {
		this.submit();
	}

	handleOnChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	submit() {
		// TODO: add function of validation
		Meteor.call("corpus.add", this.state.newSentence, (error, result) => {
			if (error !== undefined && error !== null) {
				// show some tips
			} else {
				this.setState({
					newSentence: "",
				});
			}
		});
	}

	handleOnKeyPress(event) {
		if (event.key === "Enter") {
			this.submit();
		}
	}

	renderSentenceList() {
		return this.props.sentences.map((value) => {
			return (
				<Row className={"my-1"} key={value._id}>
					<Col lg={"10"}>{value.content}</Col>
					<Col lg={"2"}>
						<Button variant={"danger"} onClick={() => this.handleOnDeleteClick(value._id)}>Delete</Button>
					</Col>
				</Row>
			);
		});
	}

	render() {
		return (
			<div>
				<Row>
					<Col lg={"10"}>
						<Form.Group controlId={"formNewSentence"}>
							<Form.Label>New sentence: </Form.Label>
							<Form.Control
								type={"text"}
								name={"newSentence"}
								value={this.state.newSentence}
								onChange={(e) => this.handleOnChange(e)}
								onKeyPress={(e) => this.handleOnKeyPress(e)}/>
						</Form.Group>
					</Col>
					<Col className={"align-self-end"} lg={"2"}>
						<Button variant={"success"} onClick={() => {this.handleOnAddClick();}}>Add</Button>
					</Col>
				</Row>
				<hr />
				{this.renderSentenceList()}
			</div>

		);
	}
}

Admin.propTypes = {
	sentences: PropTypes.array,
};

export default withTracker(() => {
	Meteor.subscribe("corpus");
	return {
		sentences: Corpus.find({}).fetch(),
	};
})(Admin);