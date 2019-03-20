import React, { Component} from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import "./page.css";

export default class Barrage extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.fetchFunctionId = null;
		this.barrageInterval = null;
		this.latestTime = new Date(this.props.enterTime);
		this.canvasWidth = 0;
		this.canvasHeight = 0;
		this.barrage = [];
	}

	componentDidMount() {
		const width = document.getElementById("barrageCanvasRow").offsetWidth;
		document.getElementById("barrageCanvas").width = width - 10;
		this.fetchChatInfo();
		this.drawBarrage();
	}

	fetchChatInfo() {
		const canvas = document.getElementById("barrageCanvas");
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
		this.fetchFunctionId = setInterval(() => {
			Meteor.call("chatInfo.getLatestChats", this.props.storyId, this.latestTime, (error, result) => {
				if (result !== null && result.length > 0) {
					this.latestTime = result[0].time;
					result.forEach(value => {
						this.barrage.push({
							m: value.message,
							x: this.canvasWidth,
							y: Math.floor(Math.random() * (this.canvasHeight) - 30) + 30,
						});
					});
				}
			});
		},1000);
	}

	drawBarrage() {
		const canvas = document.getElementById("barrageCanvas");
		const context = canvas.getContext("2d");
		context.font = "30px Arial";
		const width = canvas.width;
		const height = canvas.height;
		const end = -0.3 * width;
		const step = 5;
		this.barrageInterval = setInterval(() => {
			context.clearRect(0, 0, width, height);
			for (let i = 0; i < this.barrage.length; i++) {
				if (this.barrage[i] !== null) {
					const value = this.barrage[i];
					if (value.x <= end) {
						this.barrage[i] = null;
					} else {
						context.fillText(value.m, value.x, value.y);
						value.x -= step;
					}
				}
			}
		}, 100);
	}

	componentWillUnmount() {
		if (this.fetchFunctionId !== null) {
			console.log("Remove retrieve interval ");
			clearInterval(this.fetchFunctionId);
		}
		if (this.barrageInterval !== null) {
			console.log("Remove drawing interval ");
			clearInterval((this.barrageInterval));
		}
	}

	render() {
		return (
			<canvas id={"barrageCanvas"} />
		);
	}
}

Barrage.propTypes = {
	storyId: PropTypes.string.isRequired,
	enterTime: PropTypes.number.isRequired,
};