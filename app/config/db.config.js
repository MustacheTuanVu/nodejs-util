module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
  pool: {
    max: 100,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
};
