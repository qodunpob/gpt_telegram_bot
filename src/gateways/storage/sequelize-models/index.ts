import { Sequelize } from "sequelize";
import { initMessage } from "./message";

export const initStorage = (dbUrl: string) => {
  const sequelize = new Sequelize(dbUrl);
  initMessage(sequelize);
  return sequelize;
};
