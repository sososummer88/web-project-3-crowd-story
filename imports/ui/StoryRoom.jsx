import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoryBoard from "./StoryBoard";
import ChatBoard from "./ChatBoard";

export default class StoryRoom extends Component {
	render() {
		return (
			<Container>
				<Row></Row>
				<Row>
					<StoryBoard storyId={"test-story"}/>
					<ChatBoard />
				</Row>
				<Row></Row>
			</Container>
		);
	}
}