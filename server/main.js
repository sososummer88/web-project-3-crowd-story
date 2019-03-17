import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
	ServiceConfiguration.configurations.remove({
		service: "facebook"
	});

	ServiceConfiguration.configurations.insert({
		service: "facebook",
		appId: '718545585214421',
		secret: 'd91607cb955f3fbfd01277fe396d0ddf'
	});
});
