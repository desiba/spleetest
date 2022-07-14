const dotenv =  require('dotenv');
dotenv.config();

 exports.environment = {
    app: {
        nodeEnv: process.env.NODE_ENV,
        appName: process.env.APP_NAME,
        port: process.env.PORT
    },

    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        url: process.env.DB_URL || process.env.DATABASE_URL
    }
}