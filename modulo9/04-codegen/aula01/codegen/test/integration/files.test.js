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
import { createFiles } from './../../src/createFiles.js';
import Util from '../../src/util.js';

function getAllFuncitonsFromInstance(instance) {
	return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
		method => method !== 'constructor'
	);
}

function generateFilesPath({
	mainPath,
	defautlMainFolder,
	layers,
	componentName,
}) {
	return layers.map(layer => {
		const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;
		return join(mainPath, defautlMainFolder, layer, fileName);
	});
}

describe('#Integraion - Files - Files Structure', () => {
	const config = {
		defautlMainFolder: 'src',
		mainPath: '',
		// colocamos um sort, pq o sistema retorna em order alfabetica
		layers: ['service', 'factory', 'repository'].sort(),
		componentName: 'heroes',
	};

	const packageJSON = 'package.json';
	const packageJSONLocation = join('./test/integration/mocks', packageJSON);

	beforeAll(async () => {
		config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'));
		await fsPromises.copyFile(
			packageJSONLocation,
			join(config.mainPath, packageJSON)
		);
		await createLayersIfNotExists(config);
	});

	beforeEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	afterAll(async () => {
		await fsPromises.rm(config.mainPath, { recursive: true });
	});

	test('Repository class should have create, read, update and delete methods', async () => {
		const myConfig = {
			...config,
			layers: ['repository'],
		};

		await createFiles(myConfig);
		const [repositoryFile] = generateFilesPath(myConfig);
		const { default: Repository } = await import(repositoryFile);
		const instance = new Repository();
		const expectNotImplemented = fn =>
			expect(() => fn.call()).rejects.toEqual('method not implemented!');

		expectNotImplemented(instance.create);
		expectNotImplemented(instance.read);
		expectNotImplemented(instance.update);
		expectNotImplemented(instance.delete);
	});
	test('Service should have the same signature of repository and call all its methods', async () => {
		const myConfig = {
			...config,
			layers: ['repository', 'service'],
		};

		await createFiles(myConfig);
		const [repositoryFile, serviceFile] = generateFilesPath(myConfig);
		const { default: Repository } = await import(repositoryFile);
		const { default: Service } = await import(serviceFile);
		const repository = new Repository();
		const service = new Service({ repository });

		const allRepositoryMethods = getAllFuncitonsFromInstance(repository);
		allRepositoryMethods.forEach(method =>
			jest.spyOn(repository, method).mockResolvedValue()
		);

		// executa todos os metodos do serice
		getAllFuncitonsFromInstance(service).forEach(method =>
			service[method].call(service, [])
		);

		allRepositoryMethods.forEach(method =>
			expect(repository[method]).toHaveBeenCalled()
		);
	});
	test('Factory instance should match layers', async () => {
		const myConfig = {
			...config,
		};
		await createFiles(myConfig);

		const [factoryFile, repositoryFile, serviceFile] =
			generateFilesPath(myConfig);

		const { default: Repository } = await import(repositoryFile);
		const { default: Service } = await import(serviceFile);
		const { default: Factory } = await import(factoryFile);

		const expectedInstance = new Service({ repository: new Repository() });
		const instance = Factory.getInstance();

		expect(instance).toMatchObject(expectedInstance);
		expect(instance).toBeInstanceOf(Service);
	});
});
