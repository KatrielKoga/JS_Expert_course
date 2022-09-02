import fsPromises from 'fs/promises';
import fs from 'fs';
import templates from './templates/index.js';
import Util from './util.js';

const defaultDependencies = (layer, componentName) => {
	const dependencies = {
		repository: [],
		service: [`${componentName}Repository`],
		factory: [`${componentName}Repository`, `${componentName}Service`],
	};

	return dependencies[layer].map(Util.lowerCaseFirstLetter);
};

async function executeWrites(pendingFilesToWrite) {
	return Promise.all(
		pendingFilesToWrite.map(({ fileName, txtFile }) =>
			fsPromises.writeFile(fileName, txtFile)
		)
	);
}

export async function createFiles({
	mainPath,
	defautlMainFolder,
	layers,
	componentName,
}) {
	const keys = Object.keys(templates);
	const pendingFilesToWrite = [];
	for (const layer of layers) {
		const chosenTemplate = keys.find(key => key.includes(layer));
		if (!chosenTemplate) {
			return { error: 'the chosen layer doesnt have a template' };
		}

		const template = templates[chosenTemplate];
		const targetFolder = `${mainPath}/${defautlMainFolder}/${layer}`;
		const dependencies = defaultDependencies(layer, componentName);
		const { fileName: className, template: txtFile } = template(
			componentName,
			...dependencies
		);

		const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(className)}`;
		pendingFilesToWrite.push({ fileName, txtFile });
	}

	await executeWrites(pendingFilesToWrite);
	return { success: true };
}
