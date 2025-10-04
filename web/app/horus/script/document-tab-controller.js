import TabPaneController from "../../../share/tab-pane-controller.js"; 
import { sleep } from "../../../share/threads.js"; 


class DocumentTabController extends TabPaneController {

	constructor () {
		super("button.document");

		// register event listeners
		this.addEventListener("activated", event => this.processActivated());
	}


	// accessors
	get documentSection () { return this.center.querySelector("section.document"); };
	get queryButton () { return this.documentSection.querySelector("div.control>button.query"); };
	get identityInput () { return this.documentSection.querySelector("div.identity>input"); };
	get descriptionOutput () { return this.documentSection.querySelector("div.description>input"); };
	get typeOutput () { return this.documentSection.querySelector("div.type>input"); };
	get hashOutput () { return this.documentSection.querySelector("div.hash>input"); };
	get imageViewer () { return this.documentSection.querySelector("div.image>img"); };
	get audioPlayer () { return this.documentSection.querySelector("div.audio>audio"); };
	get videoPlayer () { return this.documentSection.querySelector("div.video>video"); };
	get nonImageViewer () { return this.documentSection.querySelector("div.other>iframe"); };


	async processActivated () {
		this.messageOutput.value = "";
		try {
			const sectionTemplate = await this.queryTemplate("document-tab.html");

			this.center.innerHTML = "";
			this.center.append(sectionTemplate.content.firstElementChild.cloneNode(true));
			// console.log(this.documentSection);
		
			this.queryButton.addEventListener("click", event => this.processQuery());
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	async processQuery () {
		this.messageOutput.value = "";
		try {
			this.imageViewer.src = "";
			this.audioPlayer.src = "";
			this.videoPlayer.src = "";
			this.nonImageViewer.src = "";

			// falsy: undefined, null, "", 0, NaN
			const documentIdentity = window.parseInt(this.identityInput.value) || 1;
			const resource = document.location.protocol + "//" + document.location.hostname + ":8010/services/documents/" + documentIdentity;
			const response = await fetch(resource, { method: "GET", headers: { "Accept": "application/json" }, credentials: "include" });
			if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
			const documentMetadata = await response.json();
			console.log("documentMetadata", documentMetadata);

			this.hashOutput.value = documentMetadata.hash || "";
			this.typeOutput.value = documentMetadata.type || "";
			this.descriptionOutput.value = documentMetadata.description || "";
			// const jsonText = JSON.stringify(documentMetadata);	// marshaling
			// const object = JSON.parse(jsonText);					// unmarshaling

			if (documentMetadata.type.startsWith("image/")) {
				this.imageViewer.src = resource;
			} else if (documentMetadata.type.startsWith("audio/")) {
				this.audioPlayer.src = resource;
			} else if (documentMetadata.type.startsWith("audio/")) {
				this.videoPlayer.src = resource;
			} else {
				this.nonImageViewer.src = resource;
			}

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}
}


window.addEventListener("load", event => {
	const controller = new DocumentTabController();
	controller.tabControl.click();
	console.log(controller);
});
