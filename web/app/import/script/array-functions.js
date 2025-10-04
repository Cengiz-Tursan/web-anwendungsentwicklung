/**
 * Returns the sum of all arguments.
 * @param values the values as variable arguments
 * @return the sum of the given values, or zero for none
 */
export function calculateSum (...values) {
	let result = 0;
	for (const value of values) {
		if (value == null) throw new ReferenceError();
		if (typeof value !== "number") throw new TypeError();
		result += value;
	}
	return result;
}


/**
 * Returns the average of all arguments.
 * @param values the values as variable arguments
 * @return the average of the given values, or NaN for none
 */
export function calculateAverage (...values) {
	return calculateSum(...values) / values.length;
}


/**
 * Returns the product of all arguments.
 * @param values the values as variable arguments
 * @return the product of the given values, or one for none
 */
export function calculateProduct (...values) {
	let result = 1;
	for (const value of values) {
		if (value == null) throw new ReferenceError();
		if (typeof value !== "number") throw new TypeError();
		result *= value;
	}
	return result;
}


/**
 * Returns the power of all arguments.
 * @param values the values as variable arguments
 * @return the power of the given values, or NaN for none
 */
export function calculatePower (...values) {
	if (values.length === 0) return NaN;

	let result = values[0];
	if (result == null) throw new ReferenceError();
	if (typeof result !== "number") throw new TypeError();

	for (let index = 1; index < values.length; ++index) {
		const value = values[index];
		if (value == null) throw new ReferenceError();
		if (typeof value !== "number") throw new TypeError();
		result **= value;
	}
	return result;
}


/**
 * Recursively calculates the factorial of the given limit and returns it.
 * @param limit the limit
 * @return the factorial of the given limit
 */
export function factorial (limit) {
	if (limit == null) throw new ReferenceError();
	if (typeof limit !== "number") throw new TypeError();
	if (limit % 1 !== 0 && limit > 0) throw new RangeError();

	return limit === 1 ? 1 : limit * factorial(limit - 1);
}


/**
 * Sorts the elements of the given array in ascending order
 * using the bubble sort algorithm.
 * @param values the values array
 * @return the values array sorted in ascending order
 */
export function bubbleSort (values) {
	if (values == null) throw new ReferenceError();
	if (!(values instanceof Array)) throw new TypeError();
	for (const value of values) {
		if (value == null) throw new ReferenceError();
		if (typeof value !== "number") throw new TypeError();
		if (Number.isNaN(value)) throw new RangeError();
	}

	for (let swapped = true, limit = values.length; swapped; --limit) {
		swapped = false;

		for (let index = 1; index < limit; ++index) {
			if (values[index - 1] > values[index]) {
				const value = values[index - 1];
				values[index - 1] = values[index];
				values[index] = value;
				swapped = true;
			}
		}
	}

	return values;
}
