const sequelize = require('./database/database');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});
