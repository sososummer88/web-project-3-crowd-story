import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { StoryMeta } from "../api/story-meta";
import { Redirect } from "react-router-dom";

import StoryBoard from "./StoryBoard";
import ChatBoard from "./ChatBoard";
import FooterPage from "./Footer.jsx";
import Barrage from "./Barrage";

class StoryRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jump: false,
		};
		this.enterTime = (new Date()).getTime();
	}

	waitForJump() {
		if (this.props.storyMeta[0].finished && !this.state.jump) {
			setTimeout(
				() => {
					this.setState({
						jump: true,
					});
				}, 4000);
		}
	}

	render() {
		if (Meteor.user() === undefined || Meteor.user() === null) {
			return (
				<Redirect to={"/"}/>
			);
		}
		console.log(Meteor.user());
		if (this.state.jump) {
			return (
				<Redirect to={"/archives-room"} />
			);
		} else {
			if (this.props.ready) {
				if (this.props.storyMeta !== null && this.props.storyMeta.length > 0) {
					this.waitForJump();
					return (
						<Container>
							<Row id={"barrageCanvasRow"}>
								<Barrage storyId={this.props.match.params.storyId} enterTime={this.enterTime} />
							</Row>
							<Row>
								<StoryBoard storyId={this.props.match.params.storyId} storyMeta={this.props.storyMeta[0]}/>
								<ChatBoard storyId={this.props.match.params.storyId} enterTime={this.enterTime}/>
							</Row>
							<Modal
								show={this.props.storyMeta[0].finished}
								size="lg"
								aria-labelledby="contained-modal-title-vcenter"
								onHide={() => {}}
								centered
							>
								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-vcenter">
										Modal heading
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<h4>Centered Modal</h4>
									<p>
										Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
										dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
										ac consectetur ac, vestibulum at eros.
									</p>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={() => {}}>Jump to archives room</Button>
								</Modal.Footer>
							</Modal>
							<FooterPage />
						</Container>

					);
				} else {
					return (
						<Redirect to={"/"}/>
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
