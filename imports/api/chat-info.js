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

		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		ChatInfo.insert({
			storyId: storyId,
			username: Meteor.user().username,
			message: message,
			time: new Date(),
		});
	},
	"chatInfo.getLatestChats"(storyId, date) {
		check(storyId, String);
		check(date, Date);

		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		return ChatInfo.find(
			{storyId: storyId, time: {$gt: date}},
			{sort: {time: -1}, fields: {message: 1, time: 1}}).fetch();
	}
});