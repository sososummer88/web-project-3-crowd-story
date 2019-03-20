import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Corpus = new Mongo.Collection("corpus");

if (Meteor.isServer) {
	Meteor.publish("corpus", function() {
		return Corpus.find({}, {sort: {time: 1}});
	});
}

Meteor.methods({
	"corpus.getRandomStartAndEnd"() {
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		if (Meteor.isServer) {
			const sentence = Corpus.find({}, {fields: {content: 1}}).fetch();
			const index = Math.floor(Math.random() * sentence.length);
			const startSentence = sentence[index].content;
			let index2 = Math.floor(Math.random() * sentence.length);
			while (index === index2) {
				index2 = Math.floor(Math.random() * sentence.length);
			}
			const endSentence = sentence[index2].content;
			return {
				startSentence: startSentence,
				endSentence: endSentence,
			};
		} else {
			return {
				startSentence: "",
				endSentence: "",
			};
		}
	},
	"corpus.add"(sentence) {
		Corpus.insert({content: sentence, time: new Date()});
	},
	"corpus.delete"(id) {
		Corpus.remove({_id: id});
	},
});