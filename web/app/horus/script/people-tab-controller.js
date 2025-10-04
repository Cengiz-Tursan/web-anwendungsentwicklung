import TabPaneController from "../../../share/tab-pane-controller.js"; 
import basicFetch from "../../../share/basic-fetch.js"; 
import { sleep } from "../../../share/threads.js"; 


const ACCESS_KEY = "b7da27d58d2581894b7fbd9cbc76e73807c0fd5dab45a5a618fb9fb13de02be9";
const GROUP = { "USER": "Benutzer",	"ADMIN": "Administrator" };
const GENDER = { "DIVERSE": "Divers", "FEMALE": "Weiblich", "MALE": "Männlich" };


class PeopleTabController extends TabPaneController {
	#serviceOrigin;

	constructor () {
		super("button.people");
		this.#serviceOrigin = document.location.protocol + "//" + document.location.hostname + ":8010";

		// register event listeners
		this.addEventListener("activated", event => this.processActivated());
	}


	// accessors
	get peopleAuthenticationSection () { return this.center.querySelector("section.people-authentication"); };
	get peopleAuthenticationButton () { return this.peopleAuthenticationSection.querySelector("div.control>button.authentication"); };
	get peopleAuthenticationEmailInput () { return this.peopleAuthenticationSection.querySelector("div.email>input"); };
	get peopleAuthenticationPasswordInput () { return this.peopleAuthenticationSection.querySelector("div.password>input"); };

	get peopleQuerySection () { return this.center.querySelector("section.people-query"); };
	get peopleQueryButton () { return this.peopleQuerySection.querySelector("div.control>button.query"); };
	get peopleQueryForenameInput () { return this.peopleQuerySection.querySelector("div.forename>input"); };
	get peopleQuerySurnameInput () { return this.peopleQuerySection.querySelector("div.surname>input"); };

	get peopleViewerSection () { return this.center.querySelector("section.people-viewer"); };
	get peopleViewerTableBody () { return this.peopleViewerSection.querySelector("div.table>table>tbody"); };


//	get imageViewer () { return this.peopleQuerySection.querySelector("div.image>img"); };


	async processActivated () {
		this.messageOutput.value = "";
		try {
			const sectionTemplate = await this.queryTemplate("people-authentication.html");
			this.center.innerHTML = "";
			this.center.append(sectionTemplate.content.firstElementChild.cloneNode(true));
			// console.log(this.peopleAuthenticationSection);
		
			this.peopleAuthenticationButton.addEventListener("click", event => this.processAuthentication());
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	async processAuthentication () {
		this.messageOutput.value = "";
		try {
			const email = this.peopleAuthenticationEmailInput.value || "-";
			const password = this.peopleAuthenticationPasswordInput.value || "-";
			const resource = this.#serviceOrigin + "/services/people/requester";

			const response = await basicFetch(resource, { method: "GET", headers: { "X-Access-Key": ACCESS_KEY, "Accept": "application/json" }, credentials: "include" }, email, password);
			if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
			const sessionOwner = await response.json();
			// console.log(sessionOwner);

			// this.peopleAuthenticationSection.remove();
			// this.peopleAuthenticationSection.classList.add("hidden");
			this.peopleAuthenticationButton.disabled = true;

			const sectionTemplate = await this.queryTemplate("people-query.html");
			this.center.append(sectionTemplate.content.firstElementChild.cloneNode(true));
			this.peopleQueryButton.addEventListener("click", event => this.processQuery());

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}


	async processQuery () {
		this.messageOutput.value = "";
		try {
			const forename = this.peopleQueryForenameInput.value || null;
			const surname = this.peopleQuerySurnameInput.value || null;

			const queryFactory = new URLSearchParams();
			if (forename) queryFactory.set("forename", forename);
			if (surname) queryFactory.set("surname", surname);
			const resource = this.#serviceOrigin + "/services/people" + (queryFactory.size === 0 ? "" : "?" + queryFactory.toString());

			const response = await basicFetch(resource, { method: "GET", headers: { "X-Access-Key": ACCESS_KEY, "Accept": "application/json" }, credentials: "include" });
			if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
			const people = await response.json();
			console.log(people);

			if (this.peopleViewerSection) {
				this.peopleViewerTableBody.innerHTML = "";
			} else {
				const sectionTemplate = await this.queryTemplate("people-viewer.html");
				this.center.append(sectionTemplate.content.firstElementChild.cloneNode(true));
			}

			const rowTemplate = await this.queryTemplate("people-viewer-row.html");
			for (const person of people) {
				const tableRow = rowTemplate.content.firstElementChild.cloneNode(true);
				this.peopleViewerTableBody.append(tableRow);

				const avatarViewer = tableRow.querySelector("td.avatar>button>img");
				avatarViewer.src = this.#serviceOrigin + "/services/documents/" + person.attributes["avatar-reference"];

				const surnameItem = tableRow.querySelector("td.surname");
				surnameItem.innerText = person.name.family;

				const forenameItem = tableRow.querySelector("td.forename");
				forenameItem.innerText = person.name.given;

				const genderItem = tableRow.querySelector("td.gender");
				genderItem.innerText = GENDER[person.gender];

				const groupItem = tableRow.querySelector("td.group");
				groupItem.innerText = GROUP[person.group];
			}

			this.messageOutput.value = "ok.";
		} catch (e) {
			this.messageOutput.value = e.message || e.toString();
			console.error(e);
		}
	}
}


window.addEventListener("load", event => {
	const controller = new PeopleTabController();
	console.log(controller);
});
