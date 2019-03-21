import React, { Component } from "react";
import { Row, Col, Button, Modal, Form, InputGroup, Card, CardColumns } from "react-bootstrap";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import { StoryMeta } from "../api/story-meta";
import "./page.css";
import FooterPage from "./Footer.jsx";

class Hall extends Component {
	constructor(props) {
		super(props);
		this.state = {
			creatingNewStory: false,
			newStoryId: "",
			title: "",
			startSentence: "",
			endSentence: "",
		};
	}

	renderUncompletedStoryList() {
		return this.props.uncompletedStories.map((value) => {
			return (
				<Card className={"story-card"} key={value._id}>
					<Card.Header>
						<Card.Title className={"story-card-title"}>{value.title}</Card.Title>
					</Card.Header>
					<Card.Body>
						<Card.Text className={"story-card-text"}><strong>Start Sentence: </strong>{value.start_sentence}</Card.Text>
						<Card.Text className={"story-card-text"}>...</Card.Text>
						<Card.Text className={"story-card-text"}><strong>End Sentence: </strong>{value.end_sentence}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Link to={"/story-room/" + value._id}><Button variant={"primary"}>Join</Button></Link>
					</Card.Footer>
				</Card>
			);
		});
	}

	handleOnClick() {
		Meteor.call("corpus.getRandomStartAndEnd", (error, result) => {
			if (error !== undefined && error !== null) {
				// show some tips
			} else {
				this.setState({
					creatingNewStory: true,
					startSentence: result.startSentence,
					endSentence: result.endSentence,
				});
			}
		});
	}

	handleOnChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleStart() {
		Meteor.call("story.createNewStory", this.state.title, this.state.startSentence, this.state.endSentence, (error, result) => {
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
		} else if (this.state.creatingNewStory) {
			return (
				<Modal
					show={true}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					onHide={() => {}}
					centered
				>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">
							A new story is about to start...
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div>
							<strong>First sentence of the story: </strong>{this.state.startSentence}
						</div>
						<div>
							<strong>Last sentence of the story: </strong>{this.state.endSentence}
						</div>
						<div>
							<InputGroup>
								<Form.Label><strong>Title:</strong></Form.Label>
								<Form.Control
									type={"text"}
									name={"title"}
									value={this.state.title}
									placeholder={"Give this story a blasting title! "}
									onChange={(e) => this.handleOnChange(e)} />
							</InputGroup>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => {this.handleStart();}}>Start</Button>
					</Modal.Footer>
				</Modal>
			);
		} else {
			return (
				<div>
					<NavigationBar/>
					<Row>
						<Col lg={"10"}> </Col>
						<Col lg={"2"}>
							<Button className={"select-button"} variant={"primary"} onClick={() => this.handleOnClick()}>+New Story</Button>
						</Col>
					</Row>
					<hr/>
					<CardColumns>
						{this.renderUncompletedStoryList()}
					</CardColumns>
					<FooterPage />
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

