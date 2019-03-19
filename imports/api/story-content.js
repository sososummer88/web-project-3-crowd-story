import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const StoryContent = new Mongo.Collection("story_content");

if (Meteor.isServer) {
	Meteor.publish("storyContent", function getStory() {
		return StoryContent.find(
			{},
			{sort: {time: 1}});
	});
}

Meteor.methods({
	"storyContent.insert"(content, storyId) {
		StoryContent.insert({
			content: content,
			storyId: storyId,
			time: new Date(),
		});
	},
	"storyContent.delete"(id) {

	},
});