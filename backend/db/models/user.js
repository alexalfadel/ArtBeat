'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Show, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          hooks: true
        }
      ),
      User.hasMany(
        models.Comment, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          hooks: true
        }
      ),
      User.hasMany(
        models.Rsvp, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          len: [60, 60]
        }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 256]
      }
    },
    bio: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 256]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePic: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 300]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};