export const getMongoConfig = () => {
  return {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DB_NAME,
    useUnifiedTopology: true,
  };
};
