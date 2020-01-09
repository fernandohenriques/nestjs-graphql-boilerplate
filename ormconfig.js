function TypeOrmConfig() {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE_NAME,
  } = process.env;

  const migrationsDir = '/db/migrations';

  return {
    type: 'mongodb',
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}`,
    entities: [__dirname + '/**/*.entity.ts'],
    migrations: [migrationsDir + '/*.js'],
    cli: { migrationsDir },
    synchronize: true,
  };
}

module.exports = TypeOrmConfig();
