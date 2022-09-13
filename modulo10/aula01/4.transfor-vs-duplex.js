import { Duplex, Transform } from 'stream';

let count = 0;
const server = new Duplex({
	objectMode: true, // faz nao precisar trabalhar com buffer => gasta mais memoria
	encoding: 'utf-8',
	read() {
		const everySecond = intervalContext => {
			if (count++ <= 5) {
				this.push(`My name is Katriel[${count}]`);
				return;
			}
			clearInterval(intervalContext);
			this.push(null);
		};

		setInterval(function () {
			everySecond(this);
		});
	},
	// é como se fosse um obj completamente diferente
	write(chunk, encoding, cb) {
		console.log('[writable] saving', chunk);
		cb();
	},
});

// provar que sao canais de comunicacao diferentes
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable!\n');

// on data -> loga o que rolou no .push do readable
// server.on('data', msg => console.log(`[readable]${msg}`));

// push deixa enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`);

// server.pipe(process.stdout);

const transformToUpperCase = Transform({
	objectMode: true,
	transform(chunk, enc, cb) {
		cb(null, chunk.toUpperCase());
	},
});

// transform é tambem um duplex mas nao possuem comunicacao independente
transformToUpperCase.write('[transform] hello from write');

// o push vai ignorar o que vc tem na funcao transform
transformToUpperCase.push('[transform] hello from push\n');

server
	.pipe(transformToUpperCase)
	// redireciona todos os dados de readable para writable da duplex
	.pipe(server);
