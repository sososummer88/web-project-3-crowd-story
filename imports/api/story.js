import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Corpus } from "./corpus";

export const Story = new Mongo.Collection("story");

if (Meteor.isServer) {
	Meteor.publish("story", function getStoryMeta() {
		return Story.find(
			{finished: false},
			{sort: {start_time: 1}});
	});
}

// In order to use callback function for no-meteor libraries, we need to bind those callback functions to environment.
const bound = Meteor.bindEnvironment((callback) => {callback();});

Meteor.methods({
	"story.createNewStory"() {
		if (Meteor.isServer) {
			Corpus.rawCollection().aggregate([{ $sample: { size: 2 } }]).toArray((error, result) => {
				bound(() => {
					Story.insert({
						start_time: new Date(),
						start_sentence: result[0].content,
						end_sentence: result[1].content,
						finished: false,
					});
				});
			});
		} else {
			Story.insert({
				start_time: new Date(),
				finished: false,
			});
		}
	}
});