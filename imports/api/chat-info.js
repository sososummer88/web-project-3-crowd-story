import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const ChatInfo = new Mongo.Collection("chat_info");

// In order to build connected database Chat_info
if (Meteor.isServer) {
	Meteor.publish("chatInfo", function getChatInfo(storyId, enterTime) {
		const time = new Date(enterTime);
		return ChatInfo.find(
			{storyId: storyId, time: {$gte: time}},
			{sort: {time: 1}});
	});
}


// function to insert chat content into the chat_info table
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

	// function to return the latest chat content
	"chatInfo.getLatestChats"(storyId, date) {
		check(storyId, String);
		check(date, Date);

		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		return ChatInfo.find(
			{storyId: storyId, time: {$gt: date}},
			{sort: {time: -1}, fields: {_id: 1, message: 1, time: 1, username: 1}}).fetch();
	}
});