# Crowd-Story Website
## Description
This is project 3 for Web Development course (CS5610) in Northeastern University, Silicon Valley (Spring 2019 semester). Meteor is used for creating this website. In this website, users are able to create a new story or add more materials to an existing story together with other users. All users need to register an account and then login in order to view stories and upvote/downvote archived stories. In addition, users are able to send comments while writing the story and other users who are also writing the stories are able to communite via comments. As administrator, you can add materials in database for new stories.

# Demo
You can visit our website here.

# Feature
For users:
   * Register and login
   * Create new stories
   * Add materials to an existing stories before it finished
   * Upvote and downvote archived stories
   * Chat with other users while writing the stories.
   * Comments barrage
   * Rank archived story according to upvote
   * Visite all archived story & Upvote/Downvote archived story
   
For administrator:
   * Add materials for creating new stories
   
# Design of MongoDB
| column | data type | meaning |
|-------|-----|------|
| _id | string | identification of a story |
| title | string | title of a story |
| start_time | date | start time of a story |
| end_time | date | end time of a story |
| start_sentence | string | First sentence of a story |
| end_sentence | string | Last sentence of a story |
| finished | boolean | mark if the story has finished or not |
| upvote | number | number of upvote of this story |
| downvote | number | number of downvote of this story |


   
