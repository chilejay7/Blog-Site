const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// A new class is created that extends the included Model class from sequelize to create the user table.
// A new function using the bcrypt package is included within the extended Model class to verify the password used to login.
class User extends Model {
    checkPassword(userPassword) {
        return bcrypt.compareSync(userPassword, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [3],
            },
        },
    },
    {
        // A hook is needed to hash a new user's password using bcrypt before the new user data is written to the database.
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    },
);

module.exports = User;
