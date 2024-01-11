'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShowImage.belongsTo(models.Show, {
        foreignKey: 'showId'
      })
    }
  }
  ShowImage.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 300],
        validImage(url) {
          const splitUrl = url.split('.')
          const validEndings = ['png', 'jpg']
          if (!validEndings.includes(splitUrl[splitUrl.length - 1])) {
            throw new error ('Image must be png or jpg')
          } 
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 256]
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Shows' }
    },
  }, {
    sequelize,
    modelName: 'ShowImage',
  });
  return ShowImage;
};