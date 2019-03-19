import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

import { StoryMeta } from "./story-meta";
import { Vote } from "./vote_info";

export const StoryContent = new Mongo.Collection("story_content");

if (Meteor.isServer) {
	Meteor.publish("storyContent", function getStoryContent(storyId) {
		return StoryContent.find(
			{storyId: storyId},
			{sort: {time: 1}});
	});
}

Meteor.methods({
	"storyContent.insert"(content, storyId, endSentence) {
		if (Meteor.isServer) {
			if (content === endSentence) {
				StoryMeta.update({_id: storyId}, {$set: {finished: true}});
				Vote.insert({storyId: storyId, upvote: 0, downvote: 0});
			}
			StoryContent.insert({
				content: content,
				storyId: storyId,
				time: new Date(),
			});
		} else {
			StoryContent.insert({
				content: content,
				storyId: storyId,
				time: new Date(),
			});
		}
	},
	"storyContent.delete"(id) {

	},
});