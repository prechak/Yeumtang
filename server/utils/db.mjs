import { configDotenv } from "dotenv";
import * as pg from "pg";

configDotenv();

const { Pool } = pg.default;
const { MY_USER, MY_PASSWORD, MY_HOSTNAME, MY_PORT, MY_DB } = process.env;

const connectionPool = new Pool({
  connectionString: `postgresql://${MY_USER}:${MY_PASSWORD}@${MY_HOSTNAME}:${MY_PORT}/${MY_DB}`,
});

export default connectionPool;
