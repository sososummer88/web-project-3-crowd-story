import React, { Component} from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import $ from "jquery";
import "./page.css";


// CodeReview <Yan>: First of all, great work and a good learning example to follow with.
// It has many features and I like the way you did the barrage.
// Just a liitle advice for your considerations.
// If there are some more comments and well organizing the css and image/images folders, it will be more readable.
// Hope this can help. Good luck!

export default class Barrage extends Component {
	constructor(props) {
		super(props);
		this.fetchFunctionId = null;
		this.latestTime = new Date(this.props.enterTime);
		this.windowWidth = window.innerWidth;
		this.commentHeight = window.innerHeight - 100 - 152;
	}

	componentDidMount() {
		this.fetchChatInfo();
	}

	fetchChatInfo() {
		this.fetchFunctionId = setInterval(() => {
			Meteor.call("chatInfo.getLatestChats", this.props.storyId, this.latestTime, (error, result) => {
				if (result !== null && result.length > 0) {
					this.latestTime = result[0].time;
					result.forEach(value => {
						this.drawComment(value);
					});
				}
			});
		},1000);
	}

	drawComment(chatInfo) {
		const imgUrl = "https://api.adorable.io/avatars/25/" + chatInfo.username + ".png";
		const element = "<div id='" + chatInfo._id + "' class='barrage-comment'><img class='comment-avatars' src='" + imgUrl + "'/>: " + chatInfo.message + "</div>";
		$("#barrageDiv").append(element);
		const domElement = $("#" + chatInfo._id);
		const top = Math.floor(Math.random() * (this.commentHeight)) + 100;
		domElement.css({
			left: this.windowWidth,
			top: top,
		});
		domElement.animate({
			left: -1000,
		}, {
			duration: 9000,
			easing: "linear",
			complete: function() {
				domElement.remove();
			}
		});
	}

	componentWillUnmount() {
		if (this.fetchFunctionId !== null) {
			clearInterval(this.fetchFunctionId);
		}
	}

	render() {
		return (
			<div id={"barrageDiv"}>
			</div>
		);
	}
}

Barrage.propTypes = {
	storyId: PropTypes.string.isRequired,
	enterTime: PropTypes.number.isRequired,
};