import { Meteor } from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Vote = new Mongo.Collection("vote_info");

if (Meteor.isServer) {
	Meteor.publish("Ranking", function rankingPublish() {
		return Vote
			.find({}, {
				limit: 20,
				sort: {
					createdAt: -1
				}
			});
	});
}

Meteor.methods({
	"message.insert"(upvote) {
		check(upvote, number);

		Ranking.update({
				upvote: upvote,
				createdAt: Date.now(),
			}
		);
	}

});
