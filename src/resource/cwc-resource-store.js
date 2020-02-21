/**
 * @public @name CWCResourceStore
 * @description Class definition, common component, adds local storage resources
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @example
 * CWCResourceStore.setItem('foo', {bar: 'bar'});
 * let foo = CWCResourceStore.getItem('foo'); // foo = { bar: 'bar'}
 */
export default class CWCResourceStore {

	/**
     * @public @constructor @name constructor
	 * @param {String} basename The basename of any stored data in local storage
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor(baseName) {
		this.baseName = baseName ? baseName : 'cwc';
	}

	/**
	 * @public @name getItem
	 * @description Get an thing from local storage, data can be stored as objects with a key and have child objects, you can retrieve them as such too
	 * @param {String} key The key for the item to get, can be dot notated to get all children of parent
	 * @return {Object} The data object to get
	 */
	hasItem(key) {
		// blank key
		if (!key || localStorage.length < 1) return undefined;

		// full key exists
		return !!localStorage[this.baseName + '.store.' + key];
	}

	/**
	 * @public @name getItem
	 * @description Get an thing from local storage, data can be stored as objects with a key and have child objects, you can retrieve them as such too
	 * @param {String} key The key for the item to get, can be dot notated to get all children of parent
	 * @return {Object} The data object to get
	 */
	getItem(key) {
		// blank key
		if (!key || localStorage.length < 1) return undefined;

		// full key exists
		if (localStorage[this.baseName + '.store.' + key] !== undefined) return JSON.parse(localStorage[this.baseName + '.store.' + key]);

		return undefined;
	}

	/**
	 * @public @name setItem
	 * @description Set a value on local storage, you can save pretty much anything and you can save things as an object with child objects
	 * @param {String} key The key for the item to get, can be dot notated to get all children of parent
	 * @param {Mixed} value the value to store
	 * @return {Boolean} Was it successfull or not in sotring
	 */
	setItem(key, value) {
		// blank key or value
		if (!key || typeof key !== 'string' || key.charAt(key.length - 1) == '.' || value === undefined) return false;

		localStorage[this.baseName + '.store.' + key] = JSON.stringify(value);

		return;
	}

	/**
	 * @public @name deleteItem
	 * @description Delete a value from local storage, you can delete single items or item and children if they have any
	 * @param {String} key The key for the item to get, can be dot notated to get all children of parent
	 * @return Array Web component api onbservations
	 */
	deleteItem(key) {
		// blank key or value
		var result = false;
		if (!key || typeof key !== 'string' || key.charAt(key.length - 1) == '.') return result;

		// remove value
		if (localStorage[this.baseName + '.store.' + key]) return localStorage.removeItem(this.baseName + '.store.' + key);

		return false;
	}
}
