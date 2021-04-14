// DEBUG=app:* node scripts/mongo/seedUsers.js

const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const { create } = require('../../lib/store/mongoDB/queries');
const config = require('../../config');

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: config.user.admin_pass,
    isAdmin: true
  },
  {
    email: 'jose@undefined.sh',
    name: 'Jose Maria',
    password: config.user.user_pass
  },
  {
    email: 'maria@undefined.sh',
    name: 'Maria Jose',
    password: config.user.user_pass
  }
];

async function createUser(user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin)
  });

  return userId;
}

async function seedUsers() {
  try {
    const promises = users.map(async user => {
      const userId = await createUser(user);
      debug(chalk.green('User created with id:', userId));
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedUsers();