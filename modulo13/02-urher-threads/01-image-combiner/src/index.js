import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

import sharp from 'sharp';

import { dirname } from 'path';
const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js';

async function joinImages(images) {
	return new Promise((resolve, reject) => {
		const worker = new Worker(`${currentFolder}/${workerFileName}`);
		worker.postMessage(images);
		worker.once('message', resolve);
		worker.once('error', reject);
		worker.once('exit', code => {
			if (code !== 0) {
				return reject(
					new Error(`Thread ${worker.threadId} stoped with exit code ${code}`)
				);
			}
			console.log(`the thread ${worker.threadId} exited`);
		});
	});
}

async function handler(request, response) {
	if (request.url.includes('joinImages')) {
		const {
			query: { background, img },
		} = parse(request.url, true);
		const imageBase64 = await joinImages({
			image: img,
			background,
		});

		response.writeHead(200, {
			'Content-Type': 'text/html',
		});
		response.end(
			`<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`
		);
		return;
	}

	return response.end('ok');
}

createServer(handler).listen(3000, () => console.log('running at 3000'));

// https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png
// https://upload.wikimedia.org/wikipedia/en/5/5a/Predator_%28character%29.png

// backgrounds
// https://img.freepik.com/premium-photo/postapocalyptic-ruined-city-destroyed-buildings-burntout-vehicles-ruined-roads_158863-995.jpg
// https://wallpapercave.com/wp/wp1822724.jpg
