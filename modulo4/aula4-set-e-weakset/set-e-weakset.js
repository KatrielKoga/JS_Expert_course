const assert = require('assert');

// usado na maioria das vezes para listas de itens unicos

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);
// console.log('arr3', arr3.sort());
assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));

// console.log('Set with add item per item', set);
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);
// rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
	'0',
	'1',
	'2',
	'3',
]);

// console.log('set.keys', set.keys());
// console.log('set.values', set.values()); // so existe por conta do map

// no array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has('3'));

// mesma teoria do map, mas voce sempre trabalha com a lista toda
// nao tem get, entao voce pode saber se o item esta ou nao no array e é isso
// na documentacao tem exemplos sobre como fazer um intercecao, saber o que tem em uma lista e nao
// tem na outra e assim por diante

// tem nos dois arrays
const users1 = new Set(['erick', 'mariazinha', 'xuxa da silva']);

const users2 = new Set(['joaozinho', 'erick', 'julio']);

const intersection = new Set([...users1].filter(user => users2.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['erick']);

const difference = new Set([...users1].filter(user => !users2.has(user)));
assert.deepStrictEqual(Array.from(difference), ['mariazinha', 'xuxa da silva']);

// weakSet

// mesma ideia do WeakMap
// nao é enumeravel (iteravel)
// so trabalha com chaves como referencia
// so tem metodos simples

const user = { id: 123 };
const user2 = { id: 321 };
const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);
