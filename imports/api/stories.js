import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Stories = new Mongo.Collection("stories");

if (Meteor.isServer) {
	Meteor.publish("stories", function getStory(storyId) {
		Stories.find(
			{storyId: storyId},
			{sort: {time: 1}});
	});
}

Meteor.methods({
	"storyBoard.insert"(content, storyId) {
		Stories.insert({
			content: content,
			storyId: storyId,
			time: new Date(),
		});
	},
	"storyBoard.delete"(id) {

	},
});