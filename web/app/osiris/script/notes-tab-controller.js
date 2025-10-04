import TabPaneController from "../../../share/tab-pane-controller.js"; 


class NotesTabController extends TabPaneController {
	#notesStorage;

	constructor () {
		super("button.notes");
		this.#notesStorage = "";

		// register event listeners
		this.addEventListener("activated", event => this.processActivated());
	}


	// accessors
	get notesSectionTemplate () { return document.querySelector('head>template[name="notes-tab.html"]'); };
	get notesSection () { return this.center.querySelector("section.notes"); };
	get notesArea () { return this.notesSection.querySelector("div.notes>textarea"); };
	get submitButton () { return this.notesSection.querySelector("div.control>button.submit"); };
	get toggleButton () { return this.notesSection.querySelector("div.control>button.toggle"); };


	processActivated () {
		this.messageOutput.value = "";
		try {
			this.center.innerHTML = "";
			this.center.append(this.notesSectionTemplate.content.firstElementChild.cloneNode(true));
			// console.log(this.notesSection);
		
			// this.notesArea.addEventListener("input", event => this.processSubmitNotes());
			this.submitButton.addEventListener("click", event => this.processSubmitNotes());
			this.toggleButton.addEventListener("click", event => this.processToggleNotes());

			this.notesArea.value = this.#notesStorage || "";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	processSubmitNotes () {
		this.messageOutput.value = "";
		try {
			this.#notesStorage = this.notesArea.value.trim() || null;

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	processToggleNotes () {
		this.messageOutput.value = "";
		try {
			if (this.notesArea.classList.contains("hidden")) {
				this.notesArea.classList.remove("hidden");
				this.toggleButton.innerText = "verbergen";
			} else {
				this.notesArea.classList.add("hidden");
				this.toggleButton.innerText = "anzeigen";
			}

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}
}


window.addEventListener("load", event => {
	const controller = new NotesTabController();
	console.log(controller);
});
