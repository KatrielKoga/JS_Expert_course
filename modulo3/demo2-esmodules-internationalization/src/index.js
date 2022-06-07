import database from './../database.json';
import Person from './person.js';
import TerminalController from './terminalController.js';
import { save } from './repository.js';
const DEFAULT_LANG = 'pt-BR';
// const DEFAULT_LANG = 'es';
// const DEFAULT_LANG = 'en';
// const DEFAULT_LANG = 'rus';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
	try {
		const answer = await terminalController.question('What??');
		if (answer === STOP_TERM) {
			terminalController.closeTerminal();
			console.log('process finished!');
			return;
		}
		const person = Person.generateInstanceFromString(answer);
		terminalController.updateTable(person.formatted(DEFAULT_LANG));
		await save(person);
		return mainLoop();
	} catch (error) {
		console.log('DEU RUIM**', error);
		return mainLoop();
	}
}

await mainLoop();
