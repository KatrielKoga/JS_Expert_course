import { pipeline } from 'stream/promises';
import { setTimeout } from 'timers/promises';

async function* myCustomReadable() {
	yield Buffer.from('This is my');
	await setTimeout(100);
	yield Buffer.from('custom readable');
}

async function* myCustomTransform(stream) {
	for await (const chunk of stream) {
		yield chunk.toString().replace(/\s/g, '_');
	}
}

async function* myCustomDuplex(stream) {
	let bytesRead = 0;
	const WholeString = [];
	for await (const chunk of stream) {
		console.log('[duplex writable]', chunk);
		bytesRead += chunk.length;
		WholeString.push(chunk);
	}

	yield `WholeString ${WholeString.join('_')}`;
	yield `bytesRead ${bytesRead}`;
}

async function* myCustomWritable(stream) {
	for await (const chunk of stream) {
		console.log('[writable]', chunk);
	}
}
try {
	const controller = new AbortController();
	//  caso precise canclear um fluxo
	setImmediate(() => controller.abort());
	await pipeline(
		myCustomReadable,
		myCustomTransform,
		myCustomDuplex,
		myCustomWritable,
		{ signal: controller.signal }
	);

	console.log('Precess has finished');
} catch (error) {
	console.error('\nabort', error.message);
}
