import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import StoryBoard from "./StoryBoard";
import ChatBoard from "./ChatBoard";

export default class StoryRoom extends Component {
	render() {
		return (
			<Container>
				<Row></Row>
				<Row>
					<StoryBoard storyId={"test-story"}/>
					<ChatBoard storyId={"test-story"} enterTime={(new Date()).getTime()}/>
				</Row>
				<Row></Row>
			</Container>
		);
	}
}