// ls | grep package | xargs cat | jq .name

// process.stdin
// 	.pipe(process.stdout)
// 	.on('data', msg => console.log('data', msg.toString()))
// 	.on('error', msg => console.log('error', msg.toString()))
// 	.on('end', _ => console.log('end'))
// 	.on('close', _ => console.log('close'));

// terminal1
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// terminal2
// node -e "process.stdin.pipe(require('net').connect(1338))"

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http';
import { createReadStream, readFileSync } from 'fs';
http
	.createServer((req, res) => {
		//  má pratica
		// const file = readFileSync('big.file');
		// res.write(file);
		// res.end();

		createReadStream('big.file').pipe(res);
	})
	.listen(3000, () => console.log('running at 3000'));

// curl localhost:3000 -o output.txt
