import { Dialect } from "sequelize/types";

export const config = {
  database: {
    dialect: "postgres" as Dialect,
    host: "46.28.44.14",
    port: 5432,
    username: "bairuhapgsqluser",
    password: "BAiruhamysqluser123_",
    database: "rockana-dev",
    logging: false,
  },
  jwtPrivateKey: "jwtPrivateKey",
};
