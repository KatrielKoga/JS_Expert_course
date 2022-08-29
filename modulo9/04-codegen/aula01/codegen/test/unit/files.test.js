import { expect, describe, test, jest, beforeEach } from '@jest/globals';

import fsPromises from 'fs/promises';
import { createFiles } from '../../src/createFiles';

describe('#Layers - Files Structure', () => {
	const defaultLayers = ['service', 'factory', 'repository'];
	const config = {
		mainPath: './',
		defautlMainFolder: 'src',
		layers: defaultLayers,
		componentName: 'heroes',
	};
	beforeEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	test('should not create file structore on inexistent templates', async () => {
		const myConfig = {
			...config,
			layers: ['inexistent'],
		};
		const expected = { error: 'the chosen layer doesnt have a template' };
	});
	test.todo('repository should not add any additional dependencies');
	test.todo('service should have repository as dependency');
	test.todo('factory should have repository and service as dependencies');
});
