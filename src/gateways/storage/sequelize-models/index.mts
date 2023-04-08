import { Sequelize } from "sequelize";
import { initMessage } from "./message.mjs";

export const initModels = (sequelize: Sequelize) => {
  initMessage(sequelize);
};
