const  { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// A new instance is created that extends the included Model class from sequelize.
class Post extends Model {};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // The data type of TEXT allows for storage of longer text data than the STRING data type.  It's a better choice than string for
        // the actual content of a blog post.
        post_content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'user_name',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;