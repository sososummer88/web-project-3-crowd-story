import { Mongo, ObjectID } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Corpus = new Mongo.Collection("corpus");

if (Meteor.isServer) {
	Meteor.publish("corpus", function() {
		return Corpus.find({}, {sort: {time: 1}});
	});
}

Meteor.methods({
	"corpus.add"(sentence) {
		Corpus.insert({content: sentence, time: new Date()});
	},
	"corpus.delete"(id) {
		Corpus.remove({_id: id});
	},
});