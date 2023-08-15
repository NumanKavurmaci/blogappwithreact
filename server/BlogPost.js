const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const BlogPost = sequelize.define("BlogPost", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // You can use STRING for URLs
    allowNull: true, // If the image is optional
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = BlogPost;
