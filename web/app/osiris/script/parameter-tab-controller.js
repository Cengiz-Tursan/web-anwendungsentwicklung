import TabPaneController from "../../../share/tab-pane-controller.js"; 


class ParameterTabController extends TabPaneController {

	constructor () {
		super("button.parameter");

		// register event listeners
		this.addEventListener("activated", event => this.processActivated());
	}


	// accessors
	get parameterSectionTemplate () { return document.querySelector('head>template[name="parameter-tab.html"]'); };
	get parameterSection () { return this.center.querySelector("section.parameter"); };
	get convertButton () { return this.parameterSection.querySelector("div.control>button.convert"); };
	get riddleInput () { return this.parameterSection.querySelector("div.riddle>input"); };
	get meaningInput1 () { return this.parameterSection.querySelector("div.meaning-1>input"); };
	get meaningInput2 () { return this.parameterSection.querySelector("div.meaning-2>input"); };
	get humanInput () { return this.parameterSection.querySelector("div.human>input"); };


	processActivated () {
		this.messageOutput.value = "";
		try {
			this.center.innerHTML = "";
			this.center.append(this.parameterSectionTemplate.content.firstElementChild.cloneNode(true));
			// console.log(this.parameterSection);
		
			this.convertButton.addEventListener("click", event => this.processConvertValues());
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	processConvertValues () {
		this.messageOutput.value = "";
		try {
			const riddle = this.riddleInput.value.trim() || null;
			const meanings = [
				window.parseInt(this.meaningInput1.value) || 0,
				window.parseInt(this.meaningInput2.value) || 0
			];
			const human = this.humanInput.checked;

			const queryFactory = new URLSearchParams();
			if (riddle) queryFactory.set("riddle", riddle);
			for (const meaning of meanings)
				if (meaning > 0) queryFactory.append("meaning", meaning);
			if (human) queryFactory.set("human", human);
			const queryText = queryFactory.toString();

			this.messageOutput.value = window.location + (queryFactory.size ? "?" + queryText : "");
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}
}


window.addEventListener("load", event => {
	const controller = new ParameterTabController();
	console.log(controller);
});
