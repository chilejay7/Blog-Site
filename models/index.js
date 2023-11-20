// The models defined in the files referenced are imported to define the realtionships
// between the tables.
const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'user_id',    
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// A post can potentially have many comments.  All comments will reference the post they
// are associated with through the primary key of the post's id.
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

// Each comment will only belong to one specific post and references it through the post's
// primary key set on the id.
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// These models will be imported in the route files that will interact with the database.
module.exports = { User, Post, Comment };