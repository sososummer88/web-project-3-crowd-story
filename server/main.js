import { Meteor } from "meteor/meteor";
import "../imports/api/stories";

Meteor.startup(() => {
	ServiceConfiguration.configurations.remove({
		service: "facebook"
	});

	ServiceConfiguration.configurations.insert({
		service: "facebook",
		appId: '718545585214421',
		secret: 'd91607cb955f3fbfd01277fe396d0ddf'
	});

	ServiceConfiguration.configurations.remove({
			service: "google"
		});
	ServiceConfiguration.configurations.insert({
			service: "google",
			clientId: "219148497315-egqa4lm3jd5lb0bb62587cg72h5fngiu.apps.googleusercontent.com",
			secret: "S0OjVAwaCpcPvgtJ3iBEDt0B"
		});

});
