const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// A new instance is created that extends the included Model class from sequelize.
class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        comment_content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'user_name',
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;