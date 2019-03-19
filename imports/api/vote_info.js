import { Meteor } from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";
import {Corpus} from "./corpus";
import {StoryMeta} from "./story-meta";

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
	"vote.insert"(upvote) {
		check(upvote, number);

		Ranking.update({
				upvote: upvote,
				createdAt: Date.now(),
			}
		);
	},
	"vote.upLikes"(_id){
		Vote.update({ _id: _id }, {$inc: {upvote: 1}});
	},
	"vote.downLikes"(_id){
		Vote.update({ _id: _id }, {$inc: {downvote: 1}});
	}

});
