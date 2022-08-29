import fsPromises from 'fs/promises';
import fs from 'fs';
export async function createLayersIfNotExists({
	mainPath,
	defautlMainFolder,
	layers,
}) {
	const defautlPath = `${mainPath}/${defautlMainFolder}`;
	const foldersToCreate = layers.filter(layer => !fs.existsSync(layer));
	const results = foldersToCreate.map(folder =>
		fsPromises.mkdir(`${defautlPath}/${folder}`, { recursive: true })
	);

	return Promise.all(results);
}
