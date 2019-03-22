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
| 字段名 | 类型 | 说明 |
|-------|-----|------|
| _id | string | 故事的id，每个故事的唯一标识 |
| title | string | 故事的标题 |
| start_time | date | 故事的创建时间 |
| end_time | date | 故事的结束时间 |
| start_sentence | string | 故事的第一句话 |
| end_sentence | string | 故事的最后一句话 |
| finished | boolean | 标记当前故事是否结束。true已经结束，false尚未结束 |
| upvote | number | 支持这个故事的票数 |
| downvote | number | 反对这个故事的票数 |


   
