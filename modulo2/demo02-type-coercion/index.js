9999999999999999; //16
//10000000000000000
true + 2;
// 3
'21' + true;
// '21true'
'21' - true;
// 20
'21' - -1;
// 22
0.1 + 0.2 === 0.3;
// false

3 > 2 > 1;
// false
3 > 2 >= 1;
// true

'B' + 'a' + +'a' + 'a';
// 'BaNaNa'

'1' == 1; // true
'1' === 1; // false

// --------------------------

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert(123 + '' === '123', 'implicit convertion to string');

console.assert(
	('hello' || 123) === 'hello',
	'|| returns ther first element if both are true'
);
console.assert(
	('hello' && 123) === 123,
	'&& returns ther last element if both are true'
);

// --------------------------
const item = {
	name: 'ErickWendel',
	age: 25,
	// string: 1 se nao for primitivo, chama o valueOf
	toString() {
		return `Name: ${this.name}, Age: ${this.age}`;
	},
	// number: 1 se nao for primitivo, chama o toString
	valueOf() {
		return { hey: 'dude' };
		// return 007
	},
	// ele tem prioridade!
	[Symbol.toPrimitive](coertionType) {
		// console.log('trying to convert to ', coertionType);
		const types = {
			string: JSON.stringify(this),
			number: '007',
		};
		return types[coertionType] || types.string;
	},
};

// console.log('toString', String(item));
// //vai retornar NaN pq o toString retornou a string
// console.log('valueOf', Number(item));

// depois de adc o toPrimitive
// console.log('String', String(item));
// console.log('Number', Number(item));
// // chama a conversao default
// console.log('Date', Date(item));

console.assert(item + 0 === '{"name":"ErickWendel","age":25}0');
// console.log('!!item is true?', !!item)
console.assert(!!item);

// console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === 'Ae{"name":"ErickWendel","age":25}');

// console.log('implicit + explicit coertion ( using == )', item == String(item));
console.assert(item == String(item));

const item2 = { ...item, name: 'Zezin', age: 20 };
// console.log('new object', item2);
console.assert(item2.name === 'Zezin' && item2.age === 20);
