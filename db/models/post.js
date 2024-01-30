import { Model, DataTypes } from "sequelize";
import connection from "../connection";
// const {
//   Model
// } = require('sequelize');
const init_Post = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

export default init_Post(connection, DataTypes);
