import basicFetch from "./basic-fetch.js";


/**
 * The cookbook service proxy type.
 */
export default class CookbookServiceProxy extends Object {
	#protocol;
	#hostname;
	#port;
	#origin;
	#accessKey;


	/**
	 * Initializes a new instance by initializing the values of the web-service
	 * server's service protocol, service hostname, service port and service origin.
	 * For same origin policy (SOP) access, these must be set to the current DOM's
	 * location data, as the web-server must also host the web-services. For
	 * cross-origin resource sharing (CORS) access, these must be set to different
	 * values as the web-service server's location will differ from the web-server's
	 * location!
	 * @param hostname the host name
	 * @param port the port
	 * @param accessKey the access key
	 */
	constructor (hostname, port, accessKey) {
		super();
		if (hostname == null || port == null || accessKey == null) throw new ReferenceError();
		if (typeof hostname !== "string" || typeof port !== "number" || typeof accessKey !== "string") throw new TypeError();
		if (hostname.length === 0 || port < 0 || port > 65535 || accessKey.length !== 64) throw new RangeError();

		this.#protocol = "https:";
		this.#hostname = hostname;
		this.#port = port;
		this.#origin = this.#protocol + "//" + this.#hostname + ":" + this.#port;
		this.#accessKey = accessKey;
	}


	/**
	 * Returns the documents URI.
	 * @return the documents URI
	 */
	get documentsURI () {
		return this.#origin + "/services/documents";
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/documents - application/json, and returns a
	 * promise for the matching documents.
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the paging limit, or null for undefined
	 * @param minCreated the minimum creation timestamp in ms since 1/1/1970, or null for undefined
	 * @param maxCreated the maximum creation timestamp in ms since 1/1/1970, or null for undefined
	 * @param minModified the minimum modification timestamp in ms since 1/1/1970, or null for undefined
	 * @param maxModified the maximum modification timestamp in ms since 1/1/1970, or null for undefined
	 * @param hash the hash, or null for undefined
	 * @param type the type fragment, or null for undefined
	 * @param description the description fragment, or null for undefined
	 * @param minSize the minimum size, or nullnull for undefined
	 * @param maxSize the maximum size, or null for undefined
	 * @return a promise for the matching auctions
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryDocuments (pagingOffset, pagingLimit, minCreated, maxCreated, minModified, maxModified, hash, type, description, minSize, maxSize) {
		const queryFactory = new URLSearchParams();
		if (pagingOffset != null) queryFactory.set("paging-offset", pagingOffset);
		if (pagingLimit != null) queryFactory.set("paging-limit", pagingLimit);
		if (minCreated != null) queryFactory.set("min-created", minCreated);
		if (maxCreated != null) queryFactory.set("max-created", maxCreated);
		if (minModified != null) queryFactory.set("min-modified", minModified);
		if (maxModified != null) queryFactory.set("max-modified", maxModified);
		if (hash != null) queryFactory.set("hash", hash);
		if (type != null) queryFactory.set("type-fragment", type);
		if (description != null) queryFactory.set("description-fragment", description);
		if (minSize != null) queryFactory.set("min-size", minSize);
		if (maxSize != null) queryFactory.set("max-size", maxSize);

		const resource = this.documentsURI + (queryFactory.size === 0 ? "" : "?" + queryFactory.toString());
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "application/json" };

		const response = await basicFetch(resource, { method: "GET" , headers: headers, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return /* await */ response.json();
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/documents/{id} - * / *, and returns a promise
	 * for either the matching document or it's content.
	 * @param documentIdentity the document identity
	 * @param metadata true for document metadata, false for document content
	 * @return either the matching document, or it's binary content
	 */
	async findDocument (documentIdentity, metadata = true) {
		if (documentIdentity == null || metadata == null) throw new ReferenceError();
		if (typeof documentIdentity !== "number" || typeof metadata !== "boolean") throw new TypeError();

		const resource = this.documentsURI + "/" + documentIdentity;
		const headers = { "X-Access-Key": this.#accessKey, "Accept": metadata ? "application/json" : "*/*" };

		const response = await basicFetch(resource, { method: "GET" , headers: headers, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return await (metadata ? response.json() : response.arrayBuffer());
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * POST /services/documents * text/plain, and returns a
	 * promise for the resulting document's identity.
	 * @param file the file
	 * @return a promise for the resulting document's identity
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async insertOrUpdateDocument (file) {
		if (file == null) throw new ReferenceError();
		if (typeof file !== "object" || !(file instanceof File)) throw new TypeError();

		const resource = this.documentsURI;
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "text/plain", "Content-Type": file.type, "X-Content-Description": file.name };

		const response = await basicFetch(resource, { method: "POST" , headers: headers, body: file, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return window.parseInt(await response.text());
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * DELETE /services/documents/{id} - text/plain, and returns
	 * a promise for the identity of the deleted document.
	 * @param documentIdentity the document identity
	 * @return a promise for the identity of the deleted document
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async deleteDocument (documentIdentity) {
		if (documentIdentity == null) throw new ReferenceError();
		if (typeof documentIdentity !== "number") throw new TypeError();

		const resource = this.documentsURI + "/" + documentIdentity;
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "text/plain" };

		const response = await basicFetch(resource, { method: "DELETE" , headers: headers, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return window.parseInt(await response.text());
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/people - application/json, and returns a 
	 * promise for the resulting people.
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the maximum paging size, or null for undefined
	 * @param minCreated the minimum creation timestamp, or null for undefined
	 * @param maxCreated the maximum creation timestamp, or null for undefined
	 * @param minModified the minimum modification timestamp, or null for undefined
	 * @param maxModified the maximum modification timestamp, or null for undefined
	 * @param email the email, or null for undefined
	 * @param gender the gender, or null for undefined
	 * @param group the group, or null for undefined
	 * @param title the title, or null for undefined
	 * @param surname the surname, or null for undefined
	 * @param forename the forename, or null for undefined
	 * @param street the street, or null for undefined
	 * @param city the city, or null for undefined
	 * @param country the country, or null for undefined
	 * @param postcode the postcode, or null for undefined
	 * @return a promise for the resulting people
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryPeople (pagingOffset, pagingLimit, minCreated, maxCreated, minModified, maxModified, email, gender, group, title, surname, forename, street, city, country, postcode) {
		const queryFactory = new URLSearchParams();
		if (pagingOffset != null) queryFactory.set("paging-offset", pagingOffset);
		if (pagingLimit != null) queryFactory.set("paging-limit", pagingLimit);
		if (minCreated != null) queryFactory.set("min-created", minCreated);
		if (maxCreated != null) queryFactory.set("max-created", maxCreated);
		if (minModified != null) queryFactory.set("min-modified", minModified);
		if (maxModified != null) queryFactory.set("max-modified", maxModified);
		if (email != null) queryFactory.set("email", email);
		if (gender != null) queryFactory.set("gender", gender);
		if (group != null) queryFactory.set("group", group);
		if (title != null) queryFactory.set("title", title);
		if (forename != null) queryFactory.set("forename", forename);
		if (surname != null) queryFactory.set("surname", surname);
		if (street != null) queryFactory.set("street", street);
		if (city != null) queryFactory.set("city", city);
		if (country != null) queryFactory.set("country", country);
		if (postcode != null) queryFactory.set("postcode", postcode);

		const resource = this.#origin + "/services/people" + (queryFactory.size === 0 ? "" : "?" + queryFactory.toString());
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "application/json" };

		const response = await basicFetch(resource, { method: "GET" , headers: headers, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		const people = await response.json();

		people.forEach(person => person.phones.sort((leftPhone, rightPhone) => leftPhone.number.localeCompare(rightPhone.number)));
		return people;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/people/requester - application/json, and
	 * returns a promise for the resulting requester.
	 * @param email the requester email, or null for none
	 * @param password the requester password, or null for none
	 * @return a promise for the resulting requester
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async findRequester (email, password) {
		if (email == null || password == null) throw new ReferenceError();
		if (typeof email !== "string" || typeof password !== "string") throw new TypeError();

		const resource = this.#origin + "/services/people/requester";
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "application/json" };

		const response = await basicFetch(resource, { method: "GET" , headers: headers, credentials: "include" }, email, password);
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		const person = await response.json();

		person.phones.sort((leftPhone, rightPhone) => leftPhone.number.localeCompare(rightPhone.number));
		return person;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/people/{id} - application/json, and
	 * returns a promise for the matching person.
	 * @param personIdentity the person identity
	 * @return a promise for the matching person
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async findPerson (personIdentity) {
		if (personIdentity == null) throw new ReferenceError();
		if (typeof personIdentity !== "number") throw new TypeError();

		const resource = this.#origin + "/services/people/" + personIdentity;
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "application/json" };

		const response = await basicFetch(resource, { method: "GET" , headers: headers, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		const person = await response.json();

		person.phones.sort((leftPhone, rightPhone) => leftPhone.number.localeCompare(rightPhone.number));
		return person;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * POST /services/people application/json text/plain, and
	 * returns a promise for the resulting person's identity.
	 * @param person the person
	 * @param password the new password, or null for none
	 * @return a promise for the resulting person's identity
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async insertPerson (person, password = null) {
		if (person == null) throw new ReferenceError();
		if (typeof person !== "object" || (password != null && typeof password !== "string")) throw new TypeError();

		const resource = this.#origin + "/services/people";
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "text/plain", "Content-Type": "application/json" };
		if (password != null) headers["X-Set-Password"] = password;

		const response = await basicFetch(resource, { method: "POST" , headers: headers, body: JSON.stringify(person), credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return window.parseInt(await response.text());
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * PUT /services/people/{id} application/json text/plain, and
	 * returns a promise for the associated person's identity.
	 * @param person the person
	 * @param password the new password, or null for none
	 * @return a promise for the associated person's identity
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async updatePerson (person, password = null) {
		if (person == null || person.identity == null) throw new ReferenceError();
		if (typeof person !== "object" || typeof person.identity !== "number" || (password != null && typeof password !== "string")) throw new TypeError();

		const resource = this.#origin + "/services/people/" + person.identity;
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "text/plain", "Content-Type": "application/json" };
		if (password != null) headers["X-Set-Password"] = password;

		const response = await basicFetch(resource, { method: "PUT" , headers: headers, body: JSON.stringify(person), credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return window.parseInt(await response.text());
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * DELETE /services/people/{id} - text/plain, and returns a
	 * promise for the identity of the deleted person.
	 * @param personIdentity the person identity
	 * @return a promise for the identity of the deleted person
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async deletePerson (personIdentity) {
		if (personIdentity == null) throw new ReferenceError();
		if (typeof personIdentity !== "number") throw new TypeError();

		const resource = this.#origin + "/services/people/" + personIdentity;
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "text/plain" };

		const response = await basicFetch(resource, { method: "DELETE" , headers: headers, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return window.parseInt(await response.text());
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature GET
	 * /services/people/{id}/access-plans - application/json, and
	 * returns a promise for the access rented by the given person.
	 * @param personIdentity the person identity
	 * @return a promise for the access rented by the given person
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryAccessPlans (personIdentity) {
		if (personIdentity == null) throw new ReferenceError();
		if (typeof personIdentity !== "number") throw new TypeError();

		const resource = this.#origin + "/services/people/" + personIdentity + "/access-plans";
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "application/json" };

		const response = await basicFetch(resource, { method: "GET" , headers: headers, credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return /* await */ response.json();
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * POST /services/people/{id}/access-plans application/json text/plain,
	 * and returns a promise for the resulting access plan's identity.
	 * @param accessPlan the access plan
	 * @return a promise for the resulting access plan's identity
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async insertOrUpdateAccessPlan (accessPlan) {
		if (accessPlan == null || accessPlan.attributes == null || accessPlan.attributes["tenant-reference"] == null) throw new ReferenceError();
		if (typeof accessPlan !== "object" || typeof accessPlan.attributes !== "object" || typeof accessPlan.attributes["tenant-reference"] !== "number") throw new TypeError();

		const resource = this.#origin + "/services/people/" + accessPlan.attributes["tenant-reference"] + "/access-plans";
		const headers = { "X-Access-Key": this.#accessKey, "Accept": "text/plain", "Content-Type": "application/json" };

		const response = await basicFetch(resource, { method: "POST" , headers: headers, body: JSON.stringify(accessPlan), credentials: "include" });
		if (!response.ok) throw new Error("HTTP " + response.status + " " + response.statusText);
		return window.parseInt(await response.text());
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature GET
	 * /services/victuals (ADMIN) or /services/people/{id}/victuals (USER)
	 * - application/json, and returns a promise for the victuals
	 * that are editable by the given person
	 * @param person the person
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the maximum paging size, or null for undefined
	 * @return a promise for the victuals editable by the given person
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryEditableVictuals (person, pagingOffset, pagingLimit) {
		if (person == null || person.group == null) throw new ReferenceError();
		if (typeof person !== "object" || typeof person.group !== "string") throw new TypeError();

		console.log("TODO: queryEditableVictuals()");
		return [];
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature GET
	 * /services/victuals (ADMIN) or /services/people/{id}/victuals (USER)
	 * - application/json, and returns a promise for the recipes
	 * that are editable by the given person.
	 * @param person the person
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the maximum paging size, or null for undefined
	 * @return a promise for the recipes editable by the given person
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryEditableRecipes (person, pagingOffset, pagingLimit) {
		if (person == null || person.group == null) throw new ReferenceError();
		if (typeof person !== "object" || typeof person.group !== "string") throw new TypeError();

		console.log("TODO: queryEditableRecipes()");
		return [];
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/victuals - application/json, and returns a 
	 * promise for the resulting victuals.
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the paging limit, or null for undefined
	 * @param minCreated the minimum creation timestamp, or null for undefined
	 * @param maxCreated the maximum creation timestamp, or null for undefined
	 * @param minModified the minimum modification timestamp, or null for undefined
	 * @param maxModified the maximum modification timestamp, or null for undefined
	 * @param alias the alias, or null for undefined
	 * @param description the description, or null for undefined
	 * @param authored whether or not there is an author, or null for undefined
	 * @param diets the diets, or empty for undefined
	 * @return a promise for the resulting victuals
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	 async queryVictuals (pagingOffset, pagingLimit, minCreated, maxCreated, minModified, maxModified, alias, description, authored, diets = []) {
		console.log("TODO: queryVictuals()");
		return [];
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/victuals - application/json, and returns a
	 * promise for the matching victual.
	 * @param victualIdentity the victual identity
	 * @return a promise for the matching victual
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async findVictual (victualIdentity) {
		if (victualIdentity == null) throw new ReferenceError();
		if (typeof victualIdentity !== "number") throw new TypeError();

		console.log("TODO: findVictual()");
		return {};
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * POST /services/victuals application/json text/plain, and
	 * returns a promise for the identity of the modified victual.
	 * @param victual the victual
	 * @return a promise for the identity of the modified victual
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async insertOrUpdateVictual (victual) {
		if (victual == null) throw new ReferenceError();
		if (typeof victual !== "object") throw new TypeError();

		console.log("TODO: insertOrUpdateVictual()");
		return 0;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * DELETE /services/victuals/{id} - text/plain, and returns a
	 * promise for the identity of the deleted victual.
	 * @param victualIdentity the victual identity
	 * @return a promise for the identity of the deleted victual
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async deleteVictual (victualIdentity) {
		if (victualIdentity == null) throw new ReferenceError();
		if (typeof victualIdentity !== "number") throw new TypeError();

		console.log("TODO: deleteVictual()");
		return 0;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/recipes - application/json, and returns a
	 * promise for the resulting recipes.
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the paging limit, or null for undefined
	 * @param minCreated the minimum creation timestamp, or null for undefined
	 * @param maxCreated the maximum creation timestamp, or null for undefined
	 * @param minModified the minimum modification timestamp, or null for undefined
	 * @param maxModified the maximum modification timestamp, or null for undefined
	 * @param category the category, or null for undefined
	 * @param title the title, or null for undefined
	 * @param description the description, or null for undefined
	 * @param instruction the instruction, or null for undefined
	 * @param minIngredientCount the minimum ingredient count, or null for undefined
	 * @param maxIngredientCount the maximum ingredient count, or null for undefined
	 * @param minIllustrationCount the minimum illustration count, or null for undefined
	 * @param maxIllustrationCount the maximum illustration count, or null for undefined
	 * @param authored whether or not there is an author, or null for undefined
	 * @param diets the diets, or empty for undefined
	 * @return a promise for the resulting recipes
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryRecipes (pagingOffset, pagingLimit, minCreated, maxCreated, minModified, maxModified, category, title, description, instruction, minIngredientCount, maxIngredientCount, minIllustrationCount, maxIllustrationCount, authored, diets = []) {
		console.log("TODO: queryRecipes()");
		return [];
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/recipes - application/json, and returns a
	 * promise for the matching recipe.
	 * @param recipeIdentity the recipe identity
	 * @return a promise for the matching recipe
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async findRecipe (recipeIdentity) {
		if (recipeIdentity == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number") throw new TypeError();

		console.log("TODO: findRecipe()");
		return {};
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * POST /services/recipes application/json text/plain, and
	 * returns a promise for the identity of the modified recipe.
	 * @param recipe the recipe
	 * @return a promise for the identity of the modified recipe
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async insertOrUpdateRecipe (recipe) {
		if (recipe == null) throw new ReferenceError();
		if (typeof recipe !== "object") throw new TypeError();

		console.log("TODO: insertOrUpdateRecipe()");
		return 0;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * DELETE /services/recipes/{id} - text/plain, and returns a
	 * promise for the identity of the deleted recipe.
	 * @param recipeIdentity the recipe identity
	 * @return a promise for the identity of the deleted recipe
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async deleteRecipe (recipeIdentity) {
		if (recipeIdentity == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number") throw new TypeError();

		console.log("TODO: deleteRecipe()");
		return 0;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/recipes/{id}/ingredients - application/json,
	 * and returns a promise for the resulting recipe ingredients.
	 * @param recipeIdentity the recipe identity
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the maximum paging size, or null for undefined
	 * @return a promise for the resulting recipe ingredients
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryRecipeIngredients (recipeIdentity, pagingOffset, pagingLimit) {
		if (recipeIdentity == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number") throw new TypeError();

		console.log("TODO: queryRecipeIngredients()");
		return [];
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * POST /services/recipes/{id}/ingredients application/json text/plain,
	 * and returns a promise for the identity of the modified recipe.
	 * @param recipeIdentity the recipe identity
	 * @param ingredient the ingredient
	 * @return a promise for the identity of the modified recipe
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async insertOrUpdateIngredient (recipeIdentity, ingredient) {
		if (recipeIdentity == null || ingredient == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number" || typeof ingredient !== "object") throw new TypeError();

		console.log("TODO: insertOrUpdateIngredient()");
		return 0;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * DELETE /services/recipes/{id1}/ingredients/{id2} - text/plain,
	 * and returns a promise for the identity of the modified recipe.
	 * @param recipeIdentity the recipe identity
	 * @param ingredientIdentity the ingredient identity
	 * @return a promise for the identity of the modified recipe
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async deleteIngredient (recipeIdentity, ingredientIdentity) {
		if (recipeIdentity == null || ingredientIdentity == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number" || typeof ingredientIdentity !== "number") throw new TypeError();

		console.log("TODO: deleteIngredient()");
		return 0;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * GET /services/recipes/{id}/illustrations - application/json,
	 * and returns a promise for the resulting recipe illustrations.
	 * @param recipeIdentity the recipe identity
	 * @param pagingOffset the paging offset, or null for undefined
	 * @param pagingLimit the maximum paging size, or null for undefined
	 * @return a promise for the resulting recipe illustrations
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async queryRecipeIllustrations (recipeIdentity, pagingOffset, pagingLimit) {
		if (recipeIdentity == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number") throw new TypeError();

		console.log("TODO: queryRecipeIllustrations()");
		return [];
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * PATCH /services/recipes/{id1}/illustrations/{id2} - text/plain,
	 * and returns a promise for the identity of the affected document.
	 * @param recipeIdentity the recipe identity
	 * @param documentIdentity the document identity
	 * @return a promise for the identity of the affected document
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async addRecipeIllustration (recipeIdentity, documentIdentity) {
		if (recipeIdentity == null || documentIdentity == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number" || typeof documentIdentity !== "number") throw new TypeError();

		console.log("TODO: addRecipeIllustration()");
		return 0;
	}


	/**
	 * Remotely invokes the web-service method with HTTP signature
	 * DELETE /services/recipes/{id1}/illustrations/{id2} - text/plain,
	 * and returns a promise for the identity of the affected document.
	 * @param recipeIdentity the recipe identity
	 * @param documentIdentity the document identity
	 * @return a promise for the identity of the affected document
	 * @throws if the TCP connection to the web-service cannot be established, 
	 *			or if the HTTP response is not ok
	 */
	async removeRecipeIllustration (recipeIdentity, documentIdentity) {
		if (recipeIdentity == null || documentIdentity == null) throw new ReferenceError();
		if (typeof recipeIdentity !== "number" || typeof documentIdentity !== "number") throw new TypeError();

		console.log("TODO: removeRecipeIllustration()");
		return 0;
	}
}
