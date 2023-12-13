import { Dialect } from "sequelize/types";

export const config = {
  database: {
    dialect: "postgres" as Dialect,
    host: "51.159.104.4",
    port: 5432,
    username: "bairuhauser",
    password: "bairuhauser@123!",
    database: "rockana-dev",
    logging: false,
  },
  jwtPrivateKey: "jwtPrivateKey",
};
