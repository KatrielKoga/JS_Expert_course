import {
	expect,
	describe,
	test,
	jest,
	beforeEach,
	beforeAll,
	afterAll,
} from '@jest/globals';

import { tmpdir } from 'os';
import fsPromises from 'fs/promises';
import { join } from 'path';
import { createLayersIfNotExists } from './../../src/createLayers.js';

async function getFolders({ mainPath, defautlMainFolder }) {
	return fsPromises.readdir(join(mainPath, defautlMainFolder));
}

describe('#Integraion - Layers - Folders Structure', () => {
	const config = {
		defautlMainFolder: 'src',
		mainPath: '',
		// colocamos um sort, pq o sistema retorna em order alfabetica
		layers: ['service', 'factory', 'repository'].sort(),
	};
	beforeAll(async () => {
		config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	test('should not create folders if it exists', async () => {
		const beforeRun = await fsPromises.readdir(config.mainPath);

		//  run
		await createLayersIfNotExists(config);

		const afterRun = await getFolders(config);

		expect(beforeRun).not.toStrictEqual(afterRun);
		expect(afterRun).toEqual(config.layers);
	});
	test('should create folders if it doesnt exists', async () => {
		const beforeRun = await getFolders(config);
		await createLayersIfNotExists(config);

		const afterRun = await getFolders(config);
		expect(afterRun).toEqual(beforeRun);
	});

	afterAll(async () => {
		await fsPromises.rm(config.mainPath, { recursive: true });
	});
});
