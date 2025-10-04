/**
 * Generic semi-abstract controller class which cannot be instantiated,
 * and is intended solely as a superclass. Concrete instances of
 * subclasses can dispatch controller events, and share attributes
 * among all such controller instances.
 */
export default class Controller extends EventTarget {
	static #SHARED_ATTRIBUTES = {};


	/**
	 * Initializes a new instance.
	 * @throws {InternalError} if there is an attempt to instantiate this class
	 */
	constructor () {
		super();
		if (this.constructor === Controller) throw new InternalError("abstract classes cannot be instantiated!");
	}


	/**
	 * Returns the shared attributes.
	 * @return the shared controller attributes
	 */
	get sharedAttributes () {
		return Controller.#SHARED_ATTRIBUTES;
	}


	/**
	 * Queries the template element with the given name, creating it if
	 * neccessary using the corresponding HTML fragment file's content.
	 * @param name the name of both the template element, and the corresponding HTML fragment file
	 * @return the corresponding template
	 */
	async queryTemplate (name) {
		if (name == null) throw new ReferenceError();
		if (typeof name !== "string") throw new TypeError(name.toString());
		if ((name = name.trim()).length === 0) throw new RangeError(name);

		const head = document.querySelector("head");
		let template = head.querySelector('template[name="' + name + '"]');
		if (!template) {
			const response = await fetch("fragment/" + name, { headers: { "Accept": "text/html" }, credentials: "omit" });
			if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);

			template = document.createElement("template");
			template.setAttribute("name", name);
			template.innerHTML = await response.text();
			head.append(template);
		}

		return template;	
	}
}