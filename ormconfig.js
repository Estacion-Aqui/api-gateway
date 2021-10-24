module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [
    "src/models/**/*.ts"
  ],
  migrations: [
    "src/config/database/migrations/**/*.ts"
  ],
  cli:{
    migrationsDir: [
      "src/config/database/migrations/"
    ],
    entitiesDir: "src/models"
  }
}