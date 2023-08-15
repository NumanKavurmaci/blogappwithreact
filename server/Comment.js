// Comment.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const BlogPost = require("./BlogPost");

const Comment = sequelize.define("Comment", {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Define the association
Comment.belongsTo(BlogPost, { foreignKey: "post_id" });

module.exports = Comment;
