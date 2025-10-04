import TabPaneController from "../../../share/tab-pane-controller.js"; 
import OPERATORS from "../../../share/binary-operators.js"; 


class CalculatorTabController extends TabPaneController {

	constructor () {
		super("button.calculator"); 

		// register event listeners
		this.addEventListener("activated", event => this.processActivated());
	}


	// accessors
	get calculatorSectionTemplate () { return document.querySelector('head>template[name="calculator-tab.html"]'); };
	get calculatorSection () { return this.center.querySelector("section.calculator"); };
	get leftOperandInput () { return this.calculatorSection.querySelector("div.input>input.left"); };
	get rightOperandInput () { return this.calculatorSection.querySelector("div.input>input.right"); };
	get resultOutput () { return this.calculatorSection.querySelector("div.output>input"); };
	get controlDivision () { return this.calculatorSection.querySelector("div.control"); };
	get addButton () { return this.controlDivision.querySelector("button.add"); };
	get subtractButton () { return this.controlDivision.querySelector("button.subtract"); };
	get multiplyButton () { return this.controlDivision.querySelector("button.multiply"); };
	get divideButton () { return this.controlDivision.querySelector("button.divide"); };
	get moduloButton () { return this.controlDivision.querySelector("button.modulo"); };
	get expButton () { return this.controlDivision.querySelector("button.exp"); };
	get rootButton () { return this.controlDivision.querySelector("button.root"); };
	get logButton () { return this.controlDivision.querySelector("button.log"); };
	get shiftLeftButton () { return this.controlDivision.querySelector("button.shift.left"); };
	get shiftRightButton () { return this.controlDivision.querySelector("button.shift.right"); };


	processActivated () {
		this.messageOutput.value = "";
		try {
			this.center.innerHTML = "";
			this.center.append(this.calculatorSectionTemplate.content.firstElementChild.cloneNode(true));
			// console.log(this.calculatorSection);

			const buttons = [ this.addButton, this.subtractButton, this.multiplyButton, this.divideButton, this.moduloButton, this.expButton, this.rootButton, this.logButton, this.shiftLeftButton, this.shiftRightButton ];
			for (const button of buttons)
				button.addEventListener("click", event => this.processCalculation(event.currentTarget.innerText));
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	processCalculation (operatorSymbol) {
		this.messageOutput.value = "";
		try {
			const leftOperand = window.parseFloat(this.leftOperandInput.value);
			const rightOperand = window.parseFloat(this.rightOperandInput.value);
			const operator = OPERATORS[operatorSymbol];
			if (!operator) throw new RangeError("illegal operation");

			const result = operator(leftOperand, rightOperand);			// functional polymorphism!
			this.resultOutput.value = leftOperand + operatorSymbol + rightOperand + " = " + result;

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}
}


window.addEventListener("load", event => {
	const controller = new CalculatorTabController();
	controller.tabControl.click();
	console.log(controller);
});
