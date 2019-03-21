import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const StoryMeta = new Mongo.Collection("story");

if (Meteor.isServer) {
	Meteor.publish("storyMetas", function getStoryMetas() {
		return StoryMeta.find(
			{finished: false},
			{sort: {start_time: 1}});
	});
	Meteor.publish("storyMeta", function getStoryMeta(storyId) {
		return StoryMeta.find({_id: storyId});
	});
	Meteor.publish("Ranking", function rankingPublish() {
		return StoryMeta
			.find({finished: true}, {
				limit: 20,
				sort: {
					createdAt: -1
				}
			});
	});
}

// In order to use callback function for no-meteor libraries, we need to bind those callback functions to environment.
// const bound = Meteor.bindEnvironment((callback) => {callback();});

Meteor.methods({
	"story.createNewStory"(title, startSentence, endSentence) {
		check(title, String);
		check(startSentence, String);
		check(endSentence, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		if (Meteor.isServer) {
			return StoryMeta.insert({
				title: title,
				start_sentence: startSentence,
				end_sentence: endSentence,
				start_time: new Date(),
				finished: false,
				upvote: 0,
				downvote: 0,
			});
		} else {
			StoryMeta.insert({
				start_time: new Date(),
				finished: false,
			});
		}
	},

	// function to getMeta for users to find content of archived stories
	"story.getMeta"(id) {
		check(id, String);
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		return StoryMeta.find({_id: id}).fetch();
	},

	// In order to be able to upvote and downvote for archived stories
	"vote.upLikes"(_id){
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		StoryMeta.update({ _id: _id }, {$inc: {upvote: 1}});
	},
	"vote.downLikes"(_id){
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		StoryMeta.update({ _id: _id }, {$inc: {downvote: 1}});
	}
});