import Http from 'http';
async function InjectHttpInterceptor() {
	const Oldemit = Http.Server.prototype.emit;
	Http.Server.prototype.emit = function (...args) {
		const [type, req, response] = args;

		if (type === 'request') {
			response.setHeader('X-Instrumented-By', 'KatrielKoga');
		}
		return Oldemit.apply(this, args);
	};
}

export { InjectHttpInterceptor };
