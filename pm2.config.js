const dotenv = require('dotenv');

dotenv.config({ path: '.env.production' });

const { APP_NAME, PORT } = process.env;

module.exports = {
  apps: [
    {
      name: `[${PORT}]${APP_NAME}`,
      script: 'build/main/index.js',
    },
  ],
};
