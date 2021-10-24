module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  extra: {
    ssl: true,
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