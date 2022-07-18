import ContextStrategy from './src/base/contextStrategy.js';
import MongoDbStrategy from './src/strategies/mongoDbStrategy.js';
import PostgresStrategy from './src/strategies/postgresStrategy.js';

const postgresConnectionString =
	'postgres://katrielkoga:1234@localhost:5432/heroes';
const postgresContext = new ContextStrategy(
	new PostgresStrategy(postgresConnectionString)
);
const mongoDbStrategy = new ContextStrategy(new MongoDbStrategy());

await postgresContext.connect();

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

await postgresContext.create({ name: data[0].name });
console.log(await postgresContext.read());
