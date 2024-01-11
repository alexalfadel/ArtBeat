'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Show, {
        foreignKey: 'showId'
      }),
      Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Comment.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 256]
      }
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};