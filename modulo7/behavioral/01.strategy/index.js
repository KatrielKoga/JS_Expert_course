import ContextStrategy from './src/base/contextStrategy.js';
import MongoDbStrategy from './src/strategies/mongoDbStrategy.js';
import PostgresStrategy from './src/strategies/postgresStrategy.js';

const postgresConnectionString =
	'postgres://katrielkoga:1234@localhost:5432/heroes';
const postgresContext = new ContextStrategy(
	new PostgresStrategy(postgresConnectionString)
);
await postgresContext.connect();

const mongoDBConnectionString =
	'mongodb://katrielkoga:senhaadmin@localhost:27017/heroes';
const mongoDbContext = new ContextStrategy(
	new MongoDbStrategy(mongoDBConnectionString)
);
await mongoDbContext.connect();

const data = [
	{
		name: 'katrielkoga',
		type: 'transaction',
	},
	{
		name: 'mariasilva',
		type: 'activityLog',
	},
];

const contextTypes = {
	transaction: postgresContext,
	activityLog: mongoDbContext,
};

for (const { type, name } of data) {
	const context = contextTypes[type];
	await context.create({ name: name + Date.now() });

	console.log(type, context.dbStrategy.constructor.name);
	console.log(await context.read());
}
