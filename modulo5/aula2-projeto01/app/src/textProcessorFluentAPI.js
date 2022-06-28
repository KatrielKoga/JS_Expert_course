// o objetivo deo Fluent API é executar tarefas
// como uma pipeline, step by step
// e no fim chamar o build. MUITO simialr ao padrao Builder
// a diferenca que aqui é sobre processos, o Builder sobre construcao de objetos
class TextProcessorFluentAPI {
	// propriedade privada
	#content;
	constructor(content) {
		this.#content = content;
	}
	extractPeopleData() {
		// ?<= fala que vai extrair os dados que virao depois desse grupo
		// [contratante|contratada] ou um ou outro, (flag i no final case insensitive)
		// :/s{1} vai procuara dois pontos seguido de 1 espaco
		// tudo acima fica dentro de parenteses para pegar o que vem afrente

		// (?!\s) ignora se tiver mais de um espco depois

		const matchPerson =
			/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;
		const onlyPerson = this.#content.match(matchPerson);
		console.log('onlyPerson', onlyPerson);
		this.#content = onlyPerson;
		return this;
	}
	build() {
		return this.#content;
	}
}

module.exports = TextProcessorFluentAPI;
