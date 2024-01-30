import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init_medium_users = (sequelize, DataTypes) => {
  class medium_users extends Model {}
  medium_users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "medium_users",
    }
  );

  return medium_users;
};

export default init_medium_users(connection, DataTypes);
