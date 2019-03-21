import React, { Component } from "react";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";
import {Meteor} from "meteor/meteor";


export default class AccountsUIWrapper extends Component {
	componentDidMount() {
		// Use Meteor Blaze to render login buttons
		this.view = Blaze.render(Template.loginButtons, this.container);
	}
	componentWillUnmount() {
		// Clean up Blaze view
		Blaze.remove(this.view);
	}

	render() {
		// Just render a placeholder container that will be filled in
		return (
			<div>
				{Meteor.user() === undefined || Meteor.user() === null ? <h3>Please Sign in First!</h3> : ""}
				<span ref={container => (this.container = container)} />
			</div>
		);
	}
}