export default class MongoDbStrategy {
	constructor(dbStrategy) {
		this.dbStrategy = dbStrategy;
	}
	async connect() {
		console.log('conectando');
	}

	async create(item) {}

	async read(item) {}
}
