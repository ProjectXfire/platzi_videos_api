// DEBUG=app:* node scripts/mongo/seedMovies.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const { create } = require('../../lib/store/mongoDB/queries');
const { moviesMock } = require('../../lib/store/mockDB/movies');

async function seedMovies() {
  try {
    const promises = moviesMock.map(async movie => {
      await create('movies', movie);
    });
    await Promise.all(promises);
    debug(chalk.green(`${promises.length} movies have been created succesfully`));
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedMovies();