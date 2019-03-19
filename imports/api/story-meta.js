import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Corpus } from "./corpus";

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
}

// In order to use callback function for no-meteor libraries, we need to bind those callback functions to environment.
const bound = Meteor.bindEnvironment((callback) => {callback();});

Meteor.methods({
	"story.createNewStory"() {
		if (Meteor.isServer) {
			const id = StoryMeta.insert({
				start_time: new Date(),
				finished: false,
			});
			Corpus.rawCollection().aggregate([{ $sample: { size: 2 } }]).toArray((error, result) => {
				bound(() => {
					StoryMeta.update(
						{_id: id},
						{$set: {start_sentence: result[0].content, end_sentence: result[1].content}});
				});
			});
			return id;
		} else {
			StoryMeta.insert({
				start_time: new Date(),
				finished: false,
			});
		}
	}
});