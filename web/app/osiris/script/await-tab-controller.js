import TabPaneController from "../../../share/tab-pane-controller.js"; 
import { sleep } from "../../../share/threads.js"; 


class AwaitTabController extends TabPaneController {

	constructor () {
		super("button.await");

		// register event listeners
		this.addEventListener("activated", event => this.processActivated());
	}


	// accessors
	get awaitSectionTemplate () { return document.querySelector('head>template[name="await-tab.html"]'); };
	get awaitSection () { return this.center.querySelector("section.await"); };
	get calculateButton () { return this.awaitSection.querySelector("div.control>button.calculate"); };
	get queryButton () { return this.awaitSection.querySelector("div.control>button.query"); };
	get aInput () { return this.awaitSection.querySelector("div.a>input"); };
	get bInput () { return this.awaitSection.querySelector("div.b>input"); };
	get cInput () { return this.awaitSection.querySelector("div.c>input"); };
	get jsonArea () { return this.awaitSection.querySelector("div.json>textarea"); };


	async processActivated () {
		this.messageOutput.value = "";
		try {
			this.center.innerHTML = "";
			this.center.append(this.awaitSectionTemplate.content.firstElementChild.cloneNode(true));
			// console.log(this.awaitSection);
		
			this.calculateButton.addEventListener("click", event => this.processCalculate());
			this.queryButton.addEventListener("click", event => this.processQuery());
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	async processCalculate () {
		this.messageOutput.value = "";
		try {
			const a = window.parseFloat(this.aInput.value);
			const b = window.parseFloat(this.bInput.value);
			const c = window.parseFloat(this.cInput.value);
			this.calculateButton.disabled = true;

			this.messageOutput.value = "contacting super AI, brainstorming, be patient ...";
			console.log(await sleep(5000));
			const result = await this.calculate(a, b, c);

			this.messageOutput.value = result.toString();
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		} finally {
			this.calculateButton.disabled = false;
		}
	}


	async calculate (a, b, c) {
		// throw new Error("fehler!");
		return a + b * c;
	}


	async processQuery () {
		this.messageOutput.value = "";
		try {
			const resource = document.location.protocol + "//" + document.location.hostname + ":8010/services/documents/1";
			const response = await fetch(resource, { method: "GET", headers: { "Accept": "application/json" }, credentials: "include" });
			if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
			const avatarDocument = await response.json();
			console.log("avatarDocument", avatarDocument);

			this.jsonArea.value = JSON.stringify(avatarDocument);
			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}
}


window.addEventListener("load", event => {
	const controller = new AwaitTabController();
	console.log(controller);
});
