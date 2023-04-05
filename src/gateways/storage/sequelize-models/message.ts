import { DataTypes, Model, Sequelize } from "sequelize";

interface MessageAttributes {
  id: number;
  repliedTo?: number;
  role: "user" | "assistant";
  content: string;
}

export class Message extends Model<MessageAttributes> {
  declare id: number;
  declare repliedTo?: number;
  declare role: "user" | "assistant";
  declare content: string;
}

export const initMessage = (sequelize: Sequelize) => {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM("user", "assistant"),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );

  Message.hasOne(Message, { foreignKey: "repliedTo" });
};
