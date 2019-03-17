import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const ChatInfo = new Mongo.Collection("chat_info");

if (Meteor.isServer) {
	Meteor.publish("chatInfo", function getChatInfo(storyId, enterTime) {
		const time = new Date(enterTime);
		return ChatInfo.find(
			{storyId: storyId, time: {$gte: time}},
			{sort: {time: 1}});
	});
}

Meteor.methods({
	"chatInfo.insert"(storyId, message) {
		check(storyId, String);
		check(message, String);

		// if (! this.userId) {
		// 	throw new Meteor.Error("not-authorized");
		// }

		ChatInfo.insert({
			storyId: storyId,
			username: "test-user",
			message: message,
			time: new Date(),
		});
	}
});