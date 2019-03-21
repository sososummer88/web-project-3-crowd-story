import React, { Component } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { StoryMeta } from "../api/story-meta";
import { Redirect, Link } from "react-router-dom";

import StoryBoard from "./StoryBoard";
import ChatBoard from "./ChatBoard";
import FooterPage from "./Footer.jsx";
import Barrage from "./Barrage";
import NavigationBar from "./NavigationBar";

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
		if (this.state.jump) {
			return (
				<Redirect to={"/archives-room"} />
			);
		} else {
			if (this.props.ready) {
				if (this.props.storyMeta !== null && this.props.storyMeta.length > 0) {
					this.waitForJump();
					return (
						<div>
							<NavigationBar />
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
										Congratulations!
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<p>
										You and your friends have finished this story.
									</p>
									<p>
										This page will jump to archives room in 4 seconds. If auto jump does not work,
										you can click the button below to jump to archives room.
									</p>
								</Modal.Body>
								<Modal.Footer>
									<Link to={"/archives-room"}><Button>Jump to archives room</Button></Link>
								</Modal.Footer>
							</Modal>
							<FooterPage />
						</div>
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
