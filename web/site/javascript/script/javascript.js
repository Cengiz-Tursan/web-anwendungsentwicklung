// print some literal values
console.log(true);
console.log(+42);
console.log("Aloha", 'World!', "'", '"', "\u17af", "ឯ", `abc`);

// type: object, runtime class: Object
console.log({ email: "a@b.de", forename: "Hans", surname: "von Glück", phones: [] });
// type: object, runtime class: Array
console.log([ false, 16, "Sascha", [], {} ]); 

console.log((a, b) => a + b);		// Java Lambda Operator: ->
console.log(((a, b) => a + b)(2, 3));
console.log(((a, b) => a + b)("2", "3"));

/*
class MyController {
	initialize () {
		...
		let output = "xyz";
		myButton.addEventListener("click", event => this.myControllerMethod(output));
		output = "stuff";
	}

	myControllerMethod (text) { ... }
}
*/

console.log("x", x);
var x = 42;
console.log("x", x);
console.log();

{
	let y = 16;
	console.log("y", y);	
}
{
	let y = "abc";
	console.log("y", y);	
}
// not allowed: console.log("y", y);
console.log();

const z = [ -16 ];
console.log("z", z);	
// not allowed: z = [ 42 ];
z[0] = +16;
console.log("z", z);	
z[0] = "abc";
console.log("z", z);	
z[0] = true;
console.log("z", z);	
z[0] = [];
console.log("z", z);	
z[0] = {};
console.log("z", z);	
z[0] = () => {};
console.log("z", z);	
console.log();

const array = [ false, 16, "Sascha", [], {} ];
console.log("array", array);
array.length = 3;
console.log("array", array);
console.log();

console.log(addNumbersOld(16, 42, 1));
console.log(addNumbersOld(16, 42));
console.log(addNumbersOld(16));
console.log(addNumbersOld());
console.log();
console.log(addNumbersNew(16, 42, 1));
console.log(addNumbersNew(16, 42));
console.log(addNumbersNew(16));
console.log(addNumbersNew());
console.log();

const resultContainer = {};
let result = null;
callByReference(resultContainer);
callByCopy(result);
console.log(resultContainer["value"]);
console.log(result);
console.log();


function addNumbersOld (a = 0, b = 0) {
	return a + b;
}

// Äquivalent in Java: public double addNumbersNew (final double... values)
function addNumbersNew (...values) {
	let result = 0;
	for (const value of values)
		result += value;
	return result;
}


function callByReference (object) {
	object["value"] = 42;
}

function callByCopy (object) {
	object = 42;
}

class Thing extends Object {
	static myPublicClassVariable = true;
	static #myPrivateClassVariable = false;

	myPublicInstanceVariable;
	#myPrivateInstanceVariable;

	constructor () {
		super();
		this.myPublicInstanceVariable = 42;
		this.#myPrivateInstanceVariable = 16;
	}

	myPublicInstanceMethod () {}
}

const thing = new Thing();
console.log("thing", thing);
console.log();


console.log("'' || null = ", "" || null);
console.log("0 || 'NaN' = ", 0 || NaN);
console.log("'' || 'NaN' = ", '' || 'NaN');
console.log("true | false = ", true | false);

// ~13.5:
// 13:  000...00001101
// -14: 111...11110010
// -14.0

const a1 = [ 16, 42 ];
const a2 = [ 16, 42 ];
const a3 = a1;
console.log("a1 === a2: " + (a1 === a2));
console.log("a1 === a3: " + (a1 === a3));
console.log();

console.log("thing.myPublicInstanceVariable:", thing.myPublicInstanceVariable);
console.log("thing.myPublicInstanceMethod:", thing.myPublicInstanceMethod);
// not allowed: console.log("thing.#myPrivateInstanceVariable:", thing.#myPrivateInstanceVariable);

thing[" a "] = "A-Z";
console.log("thing['myPublicInstanceVariable']:", thing["myPublicInstanceVariable"]);
console.log("thing['myPublic' + 'Instance' + 'Variable']:", thing["myPublic" + "Instance" + "Variable"]);
console.log("thing[' a ']:", thing[" a "]);
console.log("thing['myPublicInstanceMethod']:", thing["myPublicInstanceMethod"]);

console.log("thing.myPublicInstanceMethod():", thing.myPublicInstanceMethod());

console.log("(2 + 3).toString():", (2 + 3).toString());
console.log("typeof true:", typeof true);
console.log("typeof 42:", typeof 42);
console.log("typeof []:", typeof []);
console.log("typeof Thing:", typeof Thing);

const randomValue = Math.random();
console.log("randomValue:", randomValue);
console.log("randomValue > 0.5 ? 'groß' : 'klein':", randomValue > 0.5 ? "groß" : "klein");
console.log();

console.log("'myPublicInstanceVariable' in thing:", "myPublicInstanceVariable" in thing);
console.log("'mypublicInstanceVariable' in thing:", "mypublicInstanceVariable" in thing);
console.log("'#myPrivateInstanceVariable' in thing:", "#myPrivateInstanceVariable" in thing);
console.log();

console.log("array:", array);
console.log("delete array[1]:", delete array[1]);
console.log("delete array[1]:", delete array[1]);
console.log("array:", array);
console.log("array[1]:", array[1]);
array[1] = "i am new";
console.log("array:", array);
