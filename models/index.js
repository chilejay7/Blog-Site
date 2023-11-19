const Post = require('./Post');
const Comment = require('./Comment');

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.hasOne(Post)