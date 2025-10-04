import { calculateSum, calculateAverage, calculateProduct, calculatePower, factorial, bubbleSort } from "./array-functions.js";


try {
	console.log(calculateSum(2,3,4,5), calculateSum());
	// console.log(calculateSum(2, 3, null, 5));

	console.log(calculateAverage(2,3,4,5), calculateAverage());
	console.log();
	console.log(calculateProduct(2,3,4,5), calculateProduct());
	// console.log(calculateProduct(2,undefined,4,5));
	console.log(calculatePower(2,3,4,5), calculatePower());
	console.log();
	console.log(bubbleSort([ +42, -16, +16, 0, 0, -42 ]), bubbleSort([]));
	console.log(bubbleSort([ -16, 42, 0 ]));
	console.log();
	console.log("fac", factorial(3), factorial(5));
	console.log();
} catch (e) {
	console.error(e);
}