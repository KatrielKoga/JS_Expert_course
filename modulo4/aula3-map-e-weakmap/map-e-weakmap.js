const assert = require('assert');
const { keyword } = require('color-convert');
const myMap = new Map();

// pode ter qualquer coisa como chave
myMap
	.set(1, 'one')
	.set('Erick', { text: 'two' })
	.set(true, () => 'hello');

// usando constructor
const myMapWithConstructor = new Map([
	['1', 'str1'],
	[1, 'num1'],
	[true, 'bool1'],
]);

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));
assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// em Objects a chave só pode ser string ou symbol ( number é corrigido para string )
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' });

// console.log('get', myMap.get(onlyReferenceWorks));
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' });

// utilitarios
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existir = undefined
// if() = coercao implicita para boolean e retorna false
//  O jeito certo em Object é ({name: 'Erick'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// para remover um item do objeto
// delete item.id
// imperformatico para o JS
assert.ok(myMap.delete(onlyReferenceWorks));

// nao da pra iterar em Objects diretamente
//  tem que transformar com o Object.entries(item)
assert.deepStrictEqual(
	JSON.stringify([...myMap]),
	JSON.stringify([
		[1, 'one'],
		['Erick', { text: 'two' }],
		[true, () => {}],
	])
);

// for (const [key, value] of myMap) {
// 	console.log({ key, value });
// }

// Object é inseguro pq dependendo do nome da chave pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir, coma as propriedades herdadas do objeto, como
// constructor, toString, valueOf, etc.

const actor = {
	name: 'Xuxa da Silva',
	toString: 'Queen: Xuxa da Silva',
};

// nao tem restricao de chave
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// nao da para limpar um Obj sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// ----- WeakMap

//  pode ser coletado apos perder as referencias
// usado em casos bem especificos

// tem a maioris dos beneficios do Map
// mas: nao é iteravel
// só chaves de referencias e que vc ja conheca
// mais leve e preve leak de memoria, pq depois que as instancias saem da memoria toudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
