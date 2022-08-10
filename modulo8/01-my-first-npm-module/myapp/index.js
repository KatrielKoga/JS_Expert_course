// import FluentSQLBuilder from '../fluentsql-jest-tdd-yt';
import FluentSQLBuilder from '@katrielkoga/fluentsql';

import database from './database/data.json';

const result = FluentSQLBuilder.for(database)
	.where({ registered: /^(2020|2019)/ })
	.select(['category'])
	.limit(3)
	// .groupCount('category')
	.countBy('category')
	.build();

console.log({ result });
