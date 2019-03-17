# Crowd Story开发文档

## 主要Component功能说明

| Component Name | 级别 | 功能说明 |
|----------------|------|---------|
| Login | 页面级（或组件级） | 提供给用户注册和登录使用。还不确定是否要将这个功能做成一个单独的页面或者做成一个组件集成到其他Component中 |
| Hall | 页面级 | 用户登录之后看到的主界面。在主界面中，每个尚未完成的故事会有一行记录。点击相应的记录，用户可以跳转到对应的StoryRoom中去编辑未完成的故事 |
| ArchivesRoom | 页面级 | 用于展示所有已完成的故事。用户可以在这里查看所有已经完成的故事，并对每个故事进行投票 |
| StoryRoom | 页面级 | 当用户创建一个新的故事或者加入一个正在完成中的故事时，会跳转到这个页面。页面主要由StoryBoard和ChatBoard两部分组成  |
| NavigationBar | 组件级 | 导航栏。用于在不同的页面之间进行跳转 |
| StoryBoard | 组件级 | 故事编辑版。用户可以在这里编辑故事 |
| ChatBoard | 组件级 | 聊天版。同一个StoryRoom中的用户聊天使用 |

还可以添加其他的Component的说明


## 数据库设计

表名：story

| 字段名 | 类型 | 说明 |
|-------|-----|------|
| _id | string | 故事的id，每个故事的唯一标识 |
| start_time | date | 故事的创建时间 |
| end_time | date | 故事的结束时间 |
| start_sentence | string | 故事的第一句话 |
| end_sentence | string | 故事的最后一句话 |
| finished | boolean | 标记当前故事是否结束。true已经结束，false尚未结束 |

表名：story-content

| 字段名 | 类型 | 说明 |
|-------|-----|------|
| _id | ObjectId | MongoDB生成的id |
| storyId | string | 用户输入的这行内容所里属于的故事的id，这个字段对应于story表中的id字段 |
| author | string | 这行内容的作者 |
| time | date | 这行内容的创建时间 |
| content | string | 内容 |

表名：users

| 字段名 | 类型 | 说明 |
|-------|-----|------|
| _id | ObjectId | MongoDB生成的id |
| email | string | 邮箱 |
| username | string | 用户名 |
| password | string | 密码 |
| time | date | 创建时间 |

表名：vote_info
| 字段名 | 类型 | 说明 |
|-------|-----|------|
| _id | ObjectId | MongoDB生成的id |
| storyId | string | 投票信息属于哪个故事。这个字段对应于story表中的id字段 |
| upvote | number | 支持这个故事的票数 |
| downvote | number | 反对这个故事的票数 |