import BorderPaneController from "../../../share/border-pane-controller.js"; 
import { calculateSum, calculateAverage, calculateProduct, calculatePower, factorial, bubbleSort } from "./array-functions.js";


class ExtendsAppController extends BorderPaneController {

	constructor () {
		super();	// constuctor chaining

		// register event listeners
		this.sortButton.addEventListener("click", event => this.processSort());
		this.addButton.addEventListener("click", event => this.processAdd());
		this.multiplyButton.addEventListener("click", event => this.processMultiply());
	}


	// accessors
	get mainDivision () { return this.center.querySelector("section.data>div.main"); };
	get sortButton () { return this.mainDivision.querySelector("button.sort"); };
	get addButton () { return this.mainDivision.querySelector("button.add"); };
	get multiplyButton () { return this.mainDivision.querySelector("button.multiply"); };
	get valueInputs () { return Array.from(this.mainDivision.querySelectorAll("input.value")); };
	get output () { return this.mainDivision.querySelector("input.output"); };


	processSort () {
		this.messageOutput.value = "";
		try {
			// console.log("processSort()");
			// console.log(this.valueInputs);

			const values = [];
			for (const valueInput of this.valueInputs) {
				const value = window.parseFloat(valueInput.value);
				if (!Number.isNaN(value)) values.push(value);
			}
			// console.log(values);

			// this does not work: values.push("abc");
			bubbleSort(values);
			// console.log(values);

			// console.log(this.output);
			this.output.value = values.toString();

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	processAdd () {
		this.messageOutput.value = "";
		try {
			// console.log("processAdd()");
			// console.log(this.valueInputs);

			const values = [];
			for (const valueInput of this.valueInputs) {
				const value = window.parseFloat(valueInput.value);
				if (!Number.isNaN(value)) values.push(value);
			}
			// console.log(values);

			const sum = calculateSum(...values);
			// console.log(values);

			// console.log(this.output);
			this.output.value = sum.toString();

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	processMultiply () {
		this.messageOutput.value = "";
		try {
			// console.log("processMultiply()");
			// console.log(this.valueInputs);

			const values = [];
			for (const valueInput of this.valueInputs) {
				const value = window.parseFloat(valueInput.value);
				if (!Number.isNaN(value)) values.push(value);
			}
			// console.log(values);

			const product = calculateProduct(...values);
			// console.log(values);

			// console.log(this.output);
			this.output.value = product.toString();

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}

	calculateStuff () {
		this.messageOutput.value = "";
		try {
			// throw RangeError("my message for this error!");
			console.log(calculateSum(2,3,4,5), calculateSum());
			// console.log(calculateSum(2, 3, null, 5));

			console.log(calculateAverage(2,3,4,5), calculateAverage());
			console.log();
			console.log(calculateProduct(2,3,4,5), calculateProduct());
			// console.log(calculateProduct(2,undefined,4,5));
			console.log(calculatePower(2,3,4,5), calculatePower());
			console.log();
			console.log("fac", factorial(3), factorial(5));
			console.log();
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}
}


window.addEventListener("load", event => {
	const controller = new ExtendsAppController();
	console.log(controller);
	controller.calculateStuff();
});
